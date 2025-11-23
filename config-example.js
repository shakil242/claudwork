/**
 * Cart Upsell Configuration Examples
 * Copy this configuration and customize it for your store
 */

// Example 1: Manual product recommendations
window.cartUpsellConfig = {
  enabled: true,
  modalDelay: 500, // Delay in ms before showing modal
  autoCloseDelay: 0, // Auto-close after X ms (0 = disabled)
  maxUpsellProducts: 4,
  recommendations: 'manual',
  upsellProducts: [
    'product-handle-1',
    'product-handle-2',
    'product-handle-3',
    'product-handle-4'
  ],
  excludeCurrentProduct: true,
  animations: true
};

// Example 2: Collection-based recommendations
window.cartUpsellConfig = {
  enabled: true,
  modalDelay: 300,
  maxUpsellProducts: 4,
  recommendations: 'collection',
  collectionHandle: 'best-sellers', // Your collection handle
  excludeCurrentProduct: true
};

// Example 3: AI-powered related products (uses Shopify's API)
window.cartUpsellConfig = {
  enabled: true,
  modalDelay: 400,
  maxUpsellProducts: 4,
  recommendations: 'related', // Uses Shopify product recommendations
  excludeCurrentProduct: true
};

// Example 4: Product-specific upsells
// You can create different configs for different products
const productSpecificUpsells = {
  'leather-jacket': ['belt', 'wallet', 'boots'],
  'running-shoes': ['running-socks', 'sports-watch', 'water-bottle'],
  'camera': ['camera-lens', 'tripod', 'memory-card', 'camera-bag']
};

// Advanced: Dynamic configuration based on current product
function getUpsellConfig(productHandle) {
  const baseConfig = {
    enabled: true,
    modalDelay: 300,
    maxUpsellProducts: 4,
    recommendations: 'manual',
    excludeCurrentProduct: true
  };

  if (productSpecificUpsells[productHandle]) {
    return {
      ...baseConfig,
      upsellProducts: productSpecificUpsells[productHandle]
    };
  }

  // Fallback to related products
  return {
    ...baseConfig,
    recommendations: 'related'
  };
}

// Example 5: Conditional upsells based on cart value
window.cartUpsellConfig = {
  enabled: true,
  modalDelay: 300,
  maxUpsellProducts: 4,
  recommendations: 'collection',
  collectionHandle: 'add-ons',
  excludeCurrentProduct: true,
  // Add custom logic
  beforeShow: async function(cart) {
    // Only show for carts under $100
    if (cart.total_price > 10000) { // Price in cents
      return false; // Don't show upsell
    }
    return true; // Show upsell
  }
};

// Example 6: Full configuration with all options
window.cartUpsellConfig = {
  // Enable/disable the entire upsell system
  enabled: true,

  // Delay before showing modal (milliseconds)
  modalDelay: 300,

  // Auto-close delay (0 = disabled, value in milliseconds)
  autoCloseDelay: 0,

  // Maximum number of upsell products to show
  maxUpsellProducts: 4,

  // Recommendation type: 'manual', 'related', 'collection'
  recommendations: 'manual',

  // Manual product handles (used when recommendations = 'manual')
  upsellProducts: [
    'upsell-product-1',
    'upsell-product-2',
    'upsell-product-3'
  ],

  // Collection handle (used when recommendations = 'collection')
  collectionHandle: 'upsells',

  // Exclude the product just added to cart from upsells
  excludeCurrentProduct: true,

  // Enable animations
  animations: true
};
