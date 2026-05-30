/**
 * AFINA CHECKOUT - BACKEND INTEGRATION SCRIPT
 * Updated with correct Product IDs (144-149) and Variant IDs (336-339)
 *
 * INSTRUCTIONS:
 * 1. Keep ALL your original Afina HTML exactly as is
 * 2. Add this script at the BOTTOM of your page (before </body>)
 * 3. Make sure jQuery is loaded first
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  $(document).ready(function() {

    console.log('🚀 Afina Backend Integration Loading...');

    // ============================================
    // CONFIGURATION - YOUR ACTUAL CRM IDS
    // ============================================

    const CONFIG = {
      // Product IDs from your CRM
      products: {
        // Buy 1 (Single)
        '144': {
          id: '144',
          name: 'B42 Single (Buy 1)',
          basePrice: 79.99,
          qty: 1,
          regularPrice: 99.99,
          items: [144] // Single product
        },

        // Buy 2 (Combo)
        '145': {
          id: '145',
          name: 'B42 Combo (Buy 2)',
          basePrice: 74.99,
          qty: 2,
          regularPrice: 199.98,
          items: [145, 146] // Two products: item 1 and item 2
        },

        // Buy 3 (Triple)
        '147': {
          id: '147',
          name: 'B42 Triple (Buy 3)',
          basePrice: 69.99,
          qty: 3,
          regularPrice: 299.97,
          items: [147, 148, 149] // Three products: item 1, item 2, and item 3
        }
      },

      // Variant IDs (336-339) for colors
      variants: {
        'gray': 336,
        'blue': 337,
        'mint': 338,
        'violet': 339
      },

      // Color images (update these URLs to match your actual product images)
      colorImages: {
        'gray': 'https://assets.checkoutchamp.com/d23897ef-f2f0-4f8a-9936-38b5b7014e42/1764251436061_gray.png',
        'blue': 'https://assets.checkoutchamp.com/d23897ef-f2f0-4f8a-9936-38b5b7014e42/1764250465115_royal_blue.png',
        'mint': 'https://assets.checkoutchamp.com/d23897ef-f2f0-4f8a-9936-38b5b7014e42/1764251450259_cool_mint.png',
        'violet': 'https://assets.checkoutchamp.com/d23897ef-f2f0-4f8a-9936-38b5b7014e42/1764250435119_blush_violet.png'
      },

      // Color name mapping
      colorNames: {
        'gray': 'Gray',
        'blue': 'Royal Blue',
        'mint': 'Cool Mint',
        'violet': 'Blush Violet'
      }
    };

    // ============================================
    // STATE MANAGEMENT
    // ============================================

    const state = {
      selectedProduct: '144', // Default: Buy 1
      selectedColors: {
        1: 'gray',
        2: 'gray',
        3: 'gray'
      }
    };

    // ============================================
    // HELPER FUNCTIONS
    // ============================================

    function parsePrice(str) {
      return parseFloat(str.replace(/[^0-9.]/g, '')) || 0;
    }

    function formatPrice(num) {
      return '$' + num.toFixed(2);
    }

    function getActiveProduct() {
      const checked = $('input[name="product"]:checked').first();
      if (checked.length > 0) {
        const productId = checked.val();
        // Map to the main product ID (144, 145, or 147)
        if (productId == '144') return CONFIG.products['144'];
        if (productId == '145' || productId == '146') return CONFIG.products['145'];
        if (productId == '147' || productId == '148' || productId == '149') return CONFIG.products['147'];
      }
      return CONFIG.products['144'];
    }

    function getVariantForItem(itemNumber) {
      const color = state.selectedColors[itemNumber] || 'gray';
      return CONFIG.variants[color];
    }

    function calculatePricing() {
      const product = getActiveProduct();
      const perItemPrice = product.basePrice;
      const qty = product.qty;
      const subtotal = perItemPrice * qty;
      const regularTotal = product.regularPrice;
      const savings = regularTotal - subtotal;

      return {
        perItemPrice: perItemPrice,
        subtotal: subtotal,
        savings: savings > 0 ? savings : 0,
        total: subtotal,
        qty: qty,
        regularTotal: regularTotal
      };
    }

    // ============================================
    // PRODUCT CHECKBOX MANAGEMENT
    // ============================================

    function updateProductCheckboxes() {
      const product = getActiveProduct();
      const productItems = product.items;

      // First, uncheck all product checkboxes
      $('input[name="product"]').prop('checked', false);

      // Then check the ones we need
      productItems.forEach((productId, index) => {
        const checkbox = $(`input[name="product"][value="${productId}"]`);
        if (checkbox.length > 0) {
          checkbox.prop('checked', true);

          // Set variant for each item
          const itemNumber = index + 1;
          const variantId = getVariantForItem(itemNumber);
          checkbox.attr('variantvalue', variantId);

          console.log(`✅ Product ${productId} checked with variant ${variantId}`);
        }
      });
    }

    // ============================================
    // CART UPDATE
    // ============================================

    function updateCart() {
      const product = getActiveProduct();
      const pricing = calculatePricing();
      const colors = state.selectedColors;

      console.log('🛒 Updating cart...', {
        product: product.id,
        qty: product.qty,
        colors: colors
      });

      // Build cart rows
      let cartHTML = '';
      for (let i = 1; i <= product.qty; i++) {
        const color = colors[i] || 'gray';
        const colorName = CONFIG.colorNames[color];
        const image = CONFIG.colorImages[color];
        const itemPrice = pricing.perItemPrice.toFixed(2);

        cartHTML += `
          <tr id="fk-dynamic-cart-row">
            <td title="Image" class="table-cell text-center image-quantity">
              <div class="image-quantity-container">
                <img src="${image}" class="img-fluid img-thumbnail product-cart-image" alt="${product.name}" />
                <div class="quantity-circle">1</div>
              </div>
            </td>
            <td title="Item" class="table-cell table-text fk-shopping-cart-item">
              ${product.name} #${i}
              <br />Color: ${colorName}
            </td>
            <td title="Price" class="table-cell table-text">
              $${itemPrice}
            </td>
          </tr>
        `;
      }

      // Update cart table
      $('#fk-dynamic-cart-body').html(cartHTML);

      // Update totals
      updateTotals(pricing);

      // Update product checkboxes with correct variants
      updateProductCheckboxes();

      // Update CRM buttons
      updateCRMButtons();
    }

    function updateTotals(pricing) {
      $('.compareAtTotal').text(formatPrice(pricing.regularTotal));
      $('#subtotal, .dynamic-price-total').text(formatPrice(pricing.subtotal));
      $('#totalSaving, .total_savings, #total_savings').text(formatPrice(pricing.savings));
      $('#grandTotal, .grandTotal').text(formatPrice(pricing.total));

      console.log('💰 Totals updated:', pricing);
    }

    function updateCRMButtons() {
      const product = getActiveProduct();
      // For CRM buttons, use the first product ID as the main identifier
      const mainProductId = product.items[0];
      const variantId = getVariantForItem(1); // Use first item's variant

      // Update all submit buttons
      $('a[action="submit"], button[action="submit"]').attr('variantvalue', variantId);
      $('.complete-btn, .checkout-btn').attr('variantvalue', variantId);

      console.log('✅ CRM Buttons updated - Product:', mainProductId, 'Variant ID:', variantId);
    }

    // ============================================
    // PACKAGE SELECTION LOGIC
    // ============================================

    let updating = false;

    // Handle checkbox changes for package selection
    $('input[value="144"], input[value="145"], input[value="147"]').on('change', function(e) {
      if (updating) return;
      updating = true;

      const $this = $(this);
      const selectedValue = $this.val();

      if ($this.is(':checked')) {
        // Update state
        if (selectedValue == '144') state.selectedProduct = '144';
        else if (selectedValue == '145') state.selectedProduct = '145';
        else if (selectedValue == '147') state.selectedProduct = '147';

        console.log('📦 Package changed to:', state.selectedProduct);

        // Update cart after short delay
        setTimeout(() => {
          updateCart();
        }, 100);
      }

      updating = false;
    });

    // ============================================
    // COLOR SELECTION LOGIC
    // ============================================

    let suppressDocumentClose = false;

    // Toggle dropdown
    $('.selct-colorbx .color-tog, .color-chooseHdng').on('click', function(e) {
      const $colorBox = $(this).closest('.selct-colorbx');
      if ($colorBox.attr('data-disabled') === 'true') return;

      e.stopImmediatePropagation();
      e.preventDefault();

      suppressDocumentClose = true;
      setTimeout(() => { suppressDocumentClose = false; }, 250);

      const $drawer = $(this).next('.color-drower');
      $('.color-drower').not($drawer).slideUp(150);
      $drawer.stop(true, true).slideToggle(200);
    });

    // Close on document click
    $(document).on('click', function(e) {
      if (suppressDocumentClose) return;
      if (!$(e.target).closest('.selct-colorbx').length) {
        $('.color-drower').slideUp(150);
      }
    });

    // Color selection
    $('.selct-colorbx .color-drower li').on('click', function(e) {
      e.stopPropagation();

      const $li = $(this);
      const $box = $li.closest('.selct-colorbx');

      if ($box.attr('data-disabled') === 'true') return;

      const colorName = $li.text().trim();
      const colorKey = $li.attr('data-color'); // e.g., 'gray', 'blue', 'mint', 'violet'
      const variantValue = $li.attr('data-variant'); // e.g., '336', '337', '338', '339'
      const $drawer = $box.find('.color-drower');
      const $nameSpan = $box.find('.color-chooseHdng p');
      const colorClass = $li.find('p').attr('class') || 'color1';

      // Update UI
      $nameSpan.attr('class', colorClass);
      $nameSpan.html(`<span></span>${colorName}`);
      $drawer.slideUp(150);

      // Determine which item number this is (1, 2, or 3)
      const $prdOpt = $box.closest('.prd-opt, .bundle-option');
      const $allColorSelections = $prdOpt.find('.mat_color_row_select, .selct-colorbx').parent();
      const itemIndex = $allColorSelections.index($box.closest('.mat_color_row_select, .selct-colorbx').parent()) + 1;

      // Update state
      state.selectedColors[itemIndex] = colorKey;

      console.log(`🎨 Item ${itemIndex} color changed to: ${colorName} (${colorKey})`, state.selectedColors);

      // Update cart
      setTimeout(() => {
        updateCart();
      }, 100);
    });

    // ============================================
    // INITIALIZATION
    // ============================================

    // Initial load
    setTimeout(() => {
      console.log('🎯 Initial cart load...');
      updateCart();
    }, 800);

    console.log('✅ Afina Backend Integration Ready');
    console.log('📊 Product IDs: 144 (Buy 1), 145+146 (Buy 2), 147+148+149 (Buy 3)');
    console.log('🎨 Variant IDs: 336 (Gray), 337 (Royal Blue), 338 (Cool Mint), 339 (Blush Violet)');

  }); // End document.ready

})();
