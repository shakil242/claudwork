/**
 * ============================================
 * AFINA CHECKOUT - CRM & CART MANAGEMENT
 * ============================================
 *
 * Features:
 * - Dynamic cart updates based on bundle selection
 * - Automatic variant ID assignment (340-378)
 * - Real-time pricing calculations
 * - Order summary with color variants
 * - CRM button integration
 *
 * Usage: Include this script at the end of your checkout page
 */

const AfinaCartManager = (function() {
  'use strict';

  // ============================================
  // CONFIGURATION
  // ============================================

  const CONFIG = {
    products: {
      // Subscription Products
      '126': { id: '126', name: 'Afina Showerhead', basePrice: 69.95, qty: 3, type: 'subscription', regularPrice: 199.85 },
      '125': { id: '125', name: 'Afina Showerhead', basePrice: 84.95, qty: 2, type: 'subscription', regularPrice: 159.85 },
      '102': { id: '102', name: 'Afina Showerhead', basePrice: 99.95, qty: 1, type: 'subscription', regularPrice: 129.85 },

      // One-Time Products
      '103': { id: '103', name: 'Afina Showerhead', basePrice: 99.58, qty: 3, type: 'onetime', regularPrice: 199.85 },
      '104': { id: '104', name: 'Afina Showerhead', basePrice: 107.40, qty: 2, type: 'onetime', regularPrice: 159.85 },
      '105': { id: '105', name: 'Afina Showerhead', basePrice: 129.85, qty: 1, type: 'onetime', regularPrice: 129.85 }
    },

    // Product images by color
    images: {
      'Chrome': 'https://image.qwenlm.ai/public_source/277601f3-da53-40da-8061-b30526ad8733/1918b3b61-1aa9-4236-bfe9-125bff3c2073.png',
      'Nickel': 'https://image.qwenlm.ai/public_source/277601f3-da53-40da-8061-b30526ad8733/10f24000b-03b9-4efa-bece-dfc9f40333ef.png',
      'Black': 'https://image.qwenlm.ai/public_source/277601f3-da53-40da-8061-b30526ad8733/1403d6deb-afa4-4e87-b5c6-e449c652340c.png'
    },

    // Variant ID mapping (340-378)
    variantMaps: {
      buy3: {
        'Chrome/Chrome/Chrome': 340, 'Chrome/Chrome/Nickel': 341, 'Chrome/Chrome/Black': 342,
        'Chrome/Nickel/Chrome': 343, 'Chrome/Nickel/Nickel': 344, 'Chrome/Nickel/Black': 345,
        'Chrome/Black/Chrome': 346, 'Chrome/Black/Nickel': 347, 'Chrome/Black/Black': 348,
        'Nickel/Chrome/Chrome': 349, 'Nickel/Chrome/Nickel': 350, 'Nickel/Chrome/Black': 351,
        'Nickel/Nickel/Chrome': 352, 'Nickel/Nickel/Nickel': 353, 'Nickel/Nickel/Black': 354,
        'Nickel/Black/Chrome': 355, 'Nickel/Black/Nickel': 356, 'Nickel/Black/Black': 357,
        'Black/Chrome/Chrome': 358, 'Black/Chrome/Nickel': 359, 'Black/Chrome/Black': 360,
        'Black/Nickel/Chrome': 361, 'Black/Nickel/Nickel': 362, 'Black/Nickel/Black': 363,
        'Black/Black/Chrome': 364, 'Black/Black/Nickel': 365, 'Black/Black/Black': 366
      },
      buy2: {
        'Chrome/Chrome': 367, 'Chrome/Nickel': 368, 'Chrome/Black': 369,
        'Nickel/Chrome': 370, 'Nickel/Nickel': 371, 'Nickel/Black': 372,
        'Black/Chrome': 373, 'Black/Nickel': 374, 'Black/Black': 375
      },
      buy1: {
        'Chrome': 376, 'Nickel': 377, 'Black': 378
      }
    },

    // Color dot colors for display
    colorDots: {
      'Chrome': '#bfc3c9',
      'Nickel': '#b8b8b8',
      'Black': '#333333'
    }
  };

  // ============================================
  // STATE MANAGEMENT
  // ============================================

  const state = {
    selectedProduct: '103', // Default: Buy 3 One-Time
    selectedColors: { 1: 'Chrome', 2: 'Nickel', 3: 'Black' },
    isSubscription: false
  };

  // ============================================
  // CORE FUNCTIONS
  // ============================================

  /**
   * Get currently selected product
   */
  function getSelectedProduct() {
    const checked = document.querySelector('input[name="product"]:checked');
    if (checked) {
      state.selectedProduct = checked.value;
    }
    return CONFIG.products[state.selectedProduct] || CONFIG.products['103'];
  }

  /**
   * Calculate variant ID based on quantity and color selections
   */
  function getVariantId() {
    const product = getSelectedProduct();
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

  /**
   * Calculate all pricing information
   */
  function calculatePricing() {
    const product = getSelectedProduct();
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

  /**
   * Build cart items HTML
   */
  function buildCartHTML() {
    const product = getSelectedProduct();
    const pricing = calculatePricing();
    const colors = state.selectedColors;

    let html = '<div class="cc-cart-container">';

    for (let i = 1; i <= product.qty; i++) {
      const color = colors[i] || 'Chrome';
      const image = CONFIG.images[color];
      const itemPrice = pricing.perItemPrice.toFixed(2);

      html += `
        <div class="cc-cart-row">
          <div class="row cc-cart-row-margin">
            <div class="col-sm-2 p-0 position-relative">
              <img class="cc-cart-row-img"
                   src="${image}"
                   alt="${product.name} - ${color}" />
              <div class="cc-cart-prod-qty-bubble">1</div>
            </div>
            <div class="col-sm-10 p-0">
              <div class="row cc-cart-row-margin">
                <div class="col-6 cc-cart-row-content p-0">
                  <div class="cc-cart-row-prod-title">${product.name} #${i}</div>
                  <div class="cc-cart-row-variant">
                    <span class="cc-cart-row-prod-variant-label font-weight-bold mr-1">Color:</span>
                    <span class="cc-cart-row-prod-variant cc-cart-row-frequency">${color}</span>
                  </div>
                  ${product.type === 'subscription' ? '<div class="cc-cart-row-variant" style="color:#22c55e;font-size:11px;">Auto-Refill Active</div>' : ''}
                </div>
                <div class="col-6 cc-cart-row-content p-0">
                  <div class="text-center">
                    <div class="cc-cart-row-prod-price">$${itemPrice}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    html += '</div>';
    return html;
  }

  /**
   * Build color summary HTML
   */
  function buildColorSummaryHTML() {
    const product = getSelectedProduct();
    const colors = state.selectedColors;

    let html = '<div id="variantSummaryBox" style="margin:8px 10px 4px;padding:8px 10px;background:#f9f9f9;border:1px solid #e5e7eb;border-radius:6px;font-size:12px;">';
    html += '<div style="font-weight:700;margin-bottom:5px;color:#333;">Selected Colors:</div>';

    for (let i = 1; i <= product.qty; i++) {
      const color = colors[i] || 'Chrome';
      const dotColor = CONFIG.colorDots[color];

      html += `
        <div style="display:flex;align-items:center;gap:6px;margin:3px 0;">
          <div style="width:10px;height:10px;border-radius:50%;background:${dotColor};border:1px solid #ccc;"></div>
          <span style="color:#555;">Showerhead #${i}: <strong>${color}</strong></span>
        </div>
      `;
    }

    html += '</div>';
    return html;
  }

  /**
   * Update cart display
   */
  function updateCartDisplay() {
    const container = document.querySelector('.cc-cart-toggle-target');
    if (container) {
      container.innerHTML = buildCartHTML();
    }

    console.log('🛒 Cart display updated');
  }

  /**
   * Update order totals
   */
  function updateOrderTotals() {
    const pricing = calculatePricing();

    const subtotalEl = document.getElementById('subtotal');
    const savingsEl = document.getElementById('totalSaving');
    const totalEl = document.getElementById('grandTotal');
    const savingsAmountEl = document.getElementById('savingsAmount');

    if (subtotalEl) subtotalEl.textContent = `$${pricing.subtotal.toFixed(2)}`;
    if (savingsEl) savingsEl.textContent = `$${pricing.savings.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `USD $${pricing.total.toFixed(2)}`;
    if (savingsAmountEl) savingsAmountEl.textContent = `$${pricing.savings.toFixed(2)}`;

    console.log('💰 Totals updated:', pricing);
  }

  /**
   * Update color summary
   */
  function updateColorSummary() {
    // Remove old summary
    const oldSummary = document.getElementById('variantSummaryBox');
    if (oldSummary) oldSummary.remove();

    // Add new summary
    const orderBod = document.getElementById('orderBod');
    if (orderBod) {
      orderBod.insertAdjacentHTML('afterbegin', buildColorSummaryHTML());
    }

    console.log('🎨 Color summary updated');
  }

  /**
   * Update CRM button variant values
   */
  function updateCRMButtons() {
    const variantId = getVariantId();

    // Update all buttons with variantvalue attribute
    const buttons = [
      document.getElementById('cc-id-gJjWQNeaMLxD'), // Complete Purchase
      document.getElementById('cc-id-mDAZlSkHpSUa'), // PayPal
      document.querySelector('.complete-btn'),
      document.querySelector('.paypal-btn')
    ];

    buttons.forEach(btn => {
      if (btn) {
        btn.setAttribute('variantvalue', variantId);
      }
    });

    console.log('✅ CRM Buttons updated - Variant ID:', variantId);
  }

  /**
   * Update color badges in UI
   */
  function updateColorBadges() {
    const product = getSelectedProduct();
    const colors = state.selectedColors;

    const badgeIds = [
      'cc-id-b9TCoyCraMPr',  // Showerhead #1
      'cc-id-k0B7LiIWVsHS',  // Showerhead #2
      'cc-id-JdAyjRn0GwQ5'   // Showerhead #3
    ];

    for (let i = 1; i <= product.qty; i++) {
      const badge = document.getElementById(badgeIds[i - 1]);
      if (badge) {
        badge.textContent = colors[i] || 'Chrome';
      }
    }
  }

  /**
   * Master update function
   */
  function updateAll() {
    updateCartDisplay();
    updateOrderTotals();
    updateColorSummary();
    updateCRMButtons();
    updateColorBadges();

    console.log('🔄 Complete update executed');
  }

  // ============================================
  // EVENT LISTENERS
  // ============================================

  function attachEventListeners() {
    // Product selection change
    document.addEventListener('change', function(e) {
      if (e.target && e.target.name === 'product') {
        setTimeout(updateAll, 100);
      }
    });

    // Override global selectColor function
    const originalSelectColor = window.selectColor;
    window.selectColor = function(group, color, el) {
      state.selectedColors[group] = color;

      if (originalSelectColor) {
        originalSelectColor(group, color, el);
      }

      // Update active class
      const groupEl = document.getElementById('colorGroup' + group);
      if (groupEl) {
        groupEl.querySelectorAll('.color-opt').forEach(opt => {
          opt.classList.remove('active');
        });
        if (el) el.classList.add('active');
      }

      updateAll();
    };

    // Override syncMobileColor function
    window.syncMobileColor = function(num) {
      const select = document.getElementById('mobileColor' + num);
      if (!select) return;

      const color = select.value;
      state.selectedColors[num] = color;

      // Update desktop color selection
      const groupEl = document.getElementById('colorGroup' + num);
      if (groupEl) {
        const colorOptions = ['Chrome', 'Nickel', 'Black'];
        groupEl.querySelectorAll('.color-opt').forEach((opt, idx) => {
          opt.classList.remove('active');
          if (colorOptions[idx] === color) {
            opt.classList.add('active');
          }
        });
      }

      // Update mobile select background
      const dotColor = CONFIG.colorDots[color];
      select.style.backgroundImage =
        `radial-gradient(circle, ${dotColor} 0%, ${dotColor} 60%, transparent 61%)`;

      updateAll();
    };

    console.log('👂 Event listeners attached');
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  function init() {
    attachEventListeners();

    // Initial update after short delay
    setTimeout(updateAll, 500);

    console.log('✅ AfinaCartManager initialized');
    console.log('📦 Default product:', state.selectedProduct);
    console.log('🎨 Default colors:', state.selectedColors);
  }

  // ============================================
  // PUBLIC API
  // ============================================

  return {
    init: init,
    updateAll: updateAll,
    getVariantId: getVariantId,
    getState: () => state,
    getProduct: getSelectedProduct,
    getPricing: calculatePricing
  };

})();

// ============================================
// AUTO-INITIALIZE
// ============================================

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => AfinaCartManager.init(), 800);
  });
} else {
  setTimeout(() => AfinaCartManager.init(), 800);
}

// Also initialize on window load (backup)
window.addEventListener('load', () => {
  setTimeout(() => AfinaCartManager.init(), 1000);
});

// Expose globally for debugging
window.AfinaCartManager = AfinaCartManager;

console.log('📦 Afina Cart Manager loaded successfully');
