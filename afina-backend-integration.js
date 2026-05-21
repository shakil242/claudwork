/**
 * AFINA CHECKOUT - BACKEND INTEGRATION SCRIPT
 *
 * INSTRUCTIONS:
 * 1. Keep ALL your original Afina HTML exactly as is
 * 2. Add this script at the BOTTOM of your page (before </body>)
 * 3. Make sure jQuery is loaded first
 *
 * This script adds:
 * - Dynamic cart updates
 * - Variant ID management (340-378)
 * - Color selection logic
 * - CRM button integration
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  $(document).ready(function() {

    console.log('🚀 Afina Backend Integration Loading...');

    // ============================================
    // CONFIGURATION
    // ============================================

    const CONFIG = {
      // Your Afina Products
      products: {
        '126': { id: '126', name: 'Afina Showerhead', basePrice: 69.95, qty: 3, regularPrice: 199.85, type: 'subscription' },
        '125': { id: '125', name: 'Afina Showerhead', basePrice: 84.95, qty: 2, regularPrice: 159.85, type: 'subscription' },
        '102': { id: '102', name: 'Afina Showerhead', basePrice: 99.95, qty: 1, regularPrice: 129.85, type: 'subscription' },
        '103': { id: '103', name: 'Afina Showerhead', basePrice: 99.58, qty: 3, regularPrice: 199.85, type: 'onetime' },
        '104': { id: '104', name: 'Afina Showerhead', basePrice: 107.40, qty: 2, regularPrice: 159.85, type: 'onetime' },
        '105': { id: '105', name: 'Afina Showerhead', basePrice: 129.85, qty: 1, regularPrice: 129.85, type: 'onetime' }
      },

      // Color images
      colorImages: {
        'chrome': 'https://image.qwenlm.ai/public_source/277601f3-da53-40da-8061-b30526ad8733/1918b3b61-1aa9-4236-bfe9-125bff3c2073.png',
        'nickel': 'https://image.qwenlm.ai/public_source/277601f3-da53-40da-8061-b30526ad8733/10f24000b-03b9-4efa-bece-dfc9f40333ef.png',
        'black': 'https://image.qwenlm.ai/public_source/277601f3-da53-40da-8061-b30526ad8733/1403d6deb-afa4-4e87-b5c6-e449c652340c.png'
      },

      // Variant mapping (340-378)
      variantMaps: {
        buy3: {
          'chrome/chrome/chrome': 340, 'chrome/chrome/nickel': 341, 'chrome/chrome/black': 342,
          'chrome/nickel/chrome': 343, 'chrome/nickel/nickel': 344, 'chrome/nickel/black': 345,
          'chrome/black/chrome': 346, 'chrome/black/nickel': 347, 'chrome/black/black': 348,
          'nickel/chrome/chrome': 349, 'nickel/chrome/nickel': 350, 'nickel/chrome/black': 351,
          'nickel/nickel/chrome': 352, 'nickel/nickel/nickel': 353, 'nickel/nickel/black': 354,
          'nickel/black/chrome': 355, 'nickel/black/nickel': 356, 'nickel/black/black': 357,
          'black/chrome/chrome': 358, 'black/chrome/nickel': 359, 'black/chrome/black': 360,
          'black/nickel/chrome': 361, 'black/nickel/nickel': 362, 'black/nickel/black': 363,
          'black/black/chrome': 364, 'black/black/nickel': 365, 'black/black/black': 366
        },
        buy2: {
          'chrome/chrome': 367, 'chrome/nickel': 368, 'chrome/black': 369,
          'nickel/chrome': 370, 'nickel/nickel': 371, 'nickel/black': 372,
          'black/chrome': 373, 'black/nickel': 374, 'black/black': 375
        },
        buy1: {
          'chrome': 376, 'nickel': 377, 'black': 378
        }
      }
    };

    // ============================================
    // STATE
    // ============================================

    const state = {
      selectedProduct: '103', // Default Buy 3 One-Time
      selectedColors: {
        1: 'chrome',
        2: 'nickel',
        3: 'black'
      },
      isSubscription: false
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
      const checked = $('input[name="product"]:checked');
      if (checked.length > 0) {
        state.selectedProduct = checked.val();
      }
      return CONFIG.products[state.selectedProduct] || CONFIG.products['103'];
    }

    function getVariantId() {
      const product = getActiveProduct();
      const qty = product.qty;
      const colors = state.selectedColors;

      if (qty === 3) {
        const key = `${colors[1]}/${colors[2]}/${colors[3]}`;
        return CONFIG.variantMaps.buy3[key] || 340;
      } else if (qty === 2) {
        const key = `${colors[1]}/${colors[2]}`;
        return CONFIG.variantMaps.buy2[key] || 367;
      } else {
        return CONFIG.variantMaps.buy1[colors[1]] || 376;
      }
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
        const color = colors[i] || 'chrome';
        const colorName = color.charAt(0).toUpperCase() + color.slice(1);
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
      const variantId = getVariantId();

      // Update all submit buttons
      $('a[action="submit"], button[action="submit"]').attr('variantvalue', variantId);
      $('.complete-btn, .checkout-btn').attr('variantvalue', variantId);

      console.log('✅ CRM Buttons updated - Variant ID:', variantId);
    }

    // ============================================
    // PRODUCT CHECKBOX LOGIC
    // ============================================

    let updating = false;

    $('input[name="product"]').on('change', function(e) {
      if (updating) return;
      updating = true;

      const $this = $(this);

      if ($this.is(':checked')) {
        // Uncheck all others
        $('input[name="product"]').not($this).prop('checked', false);
        state.selectedProduct = $this.val();

        console.log('📦 Package changed to:', state.selectedProduct);

        // Update cart after short delay
        setTimeout(() => {
          updateCart();
        }, 100);
      } else {
        // Don't allow unchecking - recheck it
        $this.prop('checked', true);
      }

      updating = false;
    });

    // ============================================
    // COLOR SELECTION LOGIC (from Raycon)
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
      const colorKey = $li.attr('data-color');
      const variantValue = $li.attr('data-variant');
      const $drawer = $box.find('.color-drower');
      const $nameSpan = $box.find('.color-chooseHdng p');
      const colorClass = $li.find('p').attr('class') || 'color1';

      // Update UI
      $nameSpan.attr('class', colorClass);
      $nameSpan.html(`<span></span>${colorName}`);
      $drawer.slideUp(150);

      // Determine which color number this is
      const $colorRows = $box.closest('.select_color_option, .prd-opt').find('.mat_color_row_select, .selct-colorbx');
      const colorIndex = $colorRows.index($box.closest('.mat_color_row_select, .selct-colorbx').parent()) + 1;

      // Update state
      state.selectedColors[colorIndex] = colorKey;

      console.log(`🎨 Color ${colorIndex} changed to: ${colorName}`, state.selectedColors);

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
    console.log('📊 Default: Product', state.selectedProduct);
    console.log('🎨 Default Colors:', state.selectedColors);

  }); // End document.ready

})();
