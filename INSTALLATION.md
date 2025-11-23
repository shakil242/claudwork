# Shopify Post-Cart Upsell Installation Guide

A lightweight, customizable solution for displaying upsell products after customers add items to their cart.

## Features

- 🎯 **Multiple Recommendation Types**: Manual, AI-powered, or collection-based
- 🎨 **Fully Customizable**: Easy to style and configure
- 📱 **Mobile Responsive**: Works beautifully on all devices
- ⚡ **Lightweight**: Pure JavaScript, no dependencies
- 🔧 **Flexible Integration**: Works with any Shopify theme
- 🎭 **Smart Detection**: Intercepts both form submissions and AJAX cart adds

## Quick Start

### Method 1: Using Shopify Theme Files (Recommended)

#### Step 1: Upload Files to Theme Assets

1. Go to **Shopify Admin** → **Online Store** → **Themes**
2. Click **Actions** → **Edit code** on your active theme
3. In the **Assets** folder, click **Add a new asset**
4. Upload the following files:
   - `cart-upsell.js`
   - `cart-upsell.css`

#### Step 2: Add Snippet (Optional but Recommended)

1. In the **Snippets** folder, click **Add a new snippet**
2. Name it `cart-upsell`
3. Paste the contents of `cart-upsell.liquid`
4. Customize the configuration in the snippet

#### Step 3: Include in Theme

Add this line to your `theme.liquid` file, just before the closing `</body>` tag:

```liquid
{% render 'cart-upsell' %}
```

### Method 2: Direct Integration

If you prefer not to create a snippet, add this code directly to `theme.liquid` before the closing `</body>` tag:

```liquid
<!-- Cart Upsell CSS -->
{{ 'cart-upsell.css' | asset_url | stylesheet_tag }}

<!-- Cart Upsell Configuration -->
<script>
  window.cartUpsellConfig = {
    enabled: true,
    modalDelay: 300,
    maxUpsellProducts: 4,
    recommendations: 'manual',
    upsellProducts: [
      'your-product-handle-1',
      'your-product-handle-2',
      'your-product-handle-3'
    ],
    excludeCurrentProduct: true
  };
</script>

<!-- Cart Upsell Script -->
{{ 'cart-upsell.js' | asset_url | script_tag }}
```

### Method 3: Inline Code (No File Upload Required)

1. Open your `theme.liquid` file
2. Before the closing `</body>` tag, add:

```liquid
<style>
  /* Paste contents of cart-upsell.css here */
</style>

<script>
  // Configuration
  window.cartUpsellConfig = {
    enabled: true,
    recommendations: 'manual',
    upsellProducts: ['product-1', 'product-2']
  };

  // Paste contents of cart-upsell.js here
</script>
```

## Configuration Options

### Basic Configuration

```javascript
window.cartUpsellConfig = {
  // Enable/disable the upsell system
  enabled: true,

  // Delay before showing modal (milliseconds)
  modalDelay: 300,

  // Auto-close after X milliseconds (0 = disabled)
  autoCloseDelay: 0,

  // Maximum products to show
  maxUpsellProducts: 4,

  // Recommendation strategy
  recommendations: 'manual',

  // Exclude the just-added product from upsells
  excludeCurrentProduct: true,

  // Enable animations
  animations: true
};
```

### Recommendation Types

#### 1. Manual Products

Specify exact products to upsell:

```javascript
window.cartUpsellConfig = {
  recommendations: 'manual',
  upsellProducts: [
    'leather-wallet',
    'leather-belt',
    'leather-bag',
    'leather-gloves'
  ]
};
```

**How to find product handles:**
- Go to your product page in Shopify admin
- Look at the URL: `/admin/products/your-product-handle`
- Or check the product URL on your store: `/products/your-product-handle`

#### 2. Related Products (AI-Powered)

Use Shopify's built-in product recommendations:

```javascript
window.cartUpsellConfig = {
  recommendations: 'related'
};
```

This uses Shopify's machine learning to suggest related products.

#### 3. Collection-Based

Show products from a specific collection:

```javascript
window.cartUpsellConfig = {
  recommendations: 'collection',
  collectionHandle: 'best-sellers'
};
```

## Advanced Customization

### Product-Specific Upsells

Show different upsells for different products:

```liquid
{% if template contains 'product' %}
<script>
  const productUpsells = {
    'running-shoes': ['running-socks', 'water-bottle', 'fitness-tracker'],
    'yoga-mat': ['yoga-block', 'yoga-strap', 'water-bottle'],
    'camera': ['camera-lens', 'tripod', 'memory-card']
  };

  {% if product %}
  const productHandle = '{{ product.handle }}';
  if (productUpsells[productHandle]) {
    window.cartUpsellConfig.recommendations = 'manual';
    window.cartUpsellConfig.upsellProducts = productUpsells[productHandle];
  }
  {% endif %}
</script>
{% endif %}
```

### Collection-Specific Upsells

Different upsells for different collections:

```liquid
{% if template contains 'collection' %}
<script>
  const collectionUpsells = {
    'mens-clothing': 'mens-accessories',
    'womens-clothing': 'womens-accessories',
    'electronics': 'electronics-accessories'
  };

  {% if collection %}
  const upsellCollection = collectionUpsells['{{ collection.handle }}'];
  if (upsellCollection) {
    window.cartUpsellConfig.recommendations = 'collection';
    window.cartUpsellConfig.collectionHandle = upsellCollection;
  }
  {% endif %}
</script>
{% endif %}
```

### Styling Customization

The CSS file uses CSS variables for easy theming. Add this to your configuration:

```css
:root {
  --upsell-primary-color: #000;
  --upsell-secondary-color: #666;
  --upsell-background: #fff;
  --upsell-border-radius: 12px;
}
```

Or directly modify the styles in `cart-upsell.css`.

### Custom Money Formatting

The default format is USD. To change currency formatting, modify the `formatMoney` method:

```javascript
// In cart-upsell.js, find and modify:
formatMoney(cents) {
  // For EUR
  return `€${(cents / 100).toFixed(2)}`;

  // For GBP
  return `£${(cents / 100).toFixed(2)}`;

  // For custom format
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(cents / 100);
}
```

## Testing

### 1. Test Manual Products

```javascript
window.cartUpsellConfig = {
  recommendations: 'manual',
  upsellProducts: ['test-product-1', 'test-product-2']
};
```

Add a product to cart and verify the modal appears.

### 2. Test Related Products

```javascript
window.cartUpsellConfig = {
  recommendations: 'related'
};
```

Add a product that has related products configured in Shopify.

### 3. Console Testing

Open browser console and run:

```javascript
// Check if loaded
console.log(window.cartUpsell);

// Manually trigger
window.cartUpsell.showUpsellModal();

// Check configuration
console.log(window.cartUpsellConfig);
```

## Troubleshooting

### Modal Not Appearing

1. **Check Console for Errors**: Open browser DevTools → Console
2. **Verify Files Loaded**: Check Network tab for `cart-upsell.js` and `cart-upsell.css`
3. **Check Configuration**: Ensure `window.cartUpsellConfig` exists and `enabled: true`
4. **Check Products**: Verify product handles are correct

### Products Not Loading

1. **Invalid Handles**: Check product handles are correct (lowercase, hyphenated)
2. **Collection Not Found**: Verify collection handle exists
3. **No Related Products**: Related products require Shopify to have recommendations data

### Styling Issues

1. **CSS Not Loading**: Verify `cart-upsell.css` is in Assets folder
2. **Conflicts**: Check for CSS conflicts with theme
3. **Z-Index Issues**: Modal uses `z-index: 9999`, may need adjustment

### Form Interception Not Working

Some themes use custom cart add methods. Add this debug code:

```javascript
document.addEventListener('cart:add', function(event) {
  console.log('Cart add detected:', event);
  window.cartUpsell.showUpsellModal();
});
```

## Performance Optimization

### Lazy Loading

Load the script only when needed:

```liquid
<script src="{{ 'cart-upsell.js' | asset_url }}" defer></script>
```

### Reduce Modal Delay

For faster display:

```javascript
window.cartUpsellConfig = {
  modalDelay: 100  // Faster response
};
```

### Limit Products

Fewer products load faster:

```javascript
window.cartUpsellConfig = {
  maxUpsellProducts: 3  // Instead of 4 or more
};
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Need Help?

Common issues:
- Product handles must be lowercase and hyphenated
- Collection handles must match exactly
- Related products require Shopify's recommendation data
- Some themes may need custom integration

## Uninstalling

1. Remove `{% render 'cart-upsell' %}` from `theme.liquid`
2. Delete `cart-upsell.liquid` from Snippets
3. Delete `cart-upsell.js` and `cart-upsell.css` from Assets

## License

Free to use and modify for your Shopify store.
