# Shopify Post-Cart Upsell System

A lightweight, customizable JavaScript solution for displaying upsell products after customers add items to their Shopify cart. Increase average order value with strategic product recommendations.

## 🚀 Features

- **Multiple Recommendation Strategies**
  - Manual product selection
  - AI-powered related products (Shopify's recommendation engine)
  - Collection-based recommendations

- **Smart & Flexible**
  - Intercepts both form submissions and AJAX cart additions
  - Product-specific upsell configurations
  - Collection-specific upsells
  - Exclude already-added products

- **Beautiful UI**
  - Responsive modal design
  - Smooth animations
  - Mobile-optimized
  - Fully customizable styling

- **Developer Friendly**
  - Pure JavaScript (no dependencies)
  - Easy integration with any Shopify theme
  - Comprehensive configuration options
  - Well-documented code

## 📦 What's Included

- `cart-upsell.js` - Main JavaScript functionality
- `cart-upsell.css` - Responsive modal styles
- `cart-upsell.liquid` - Shopify theme integration snippet
- `config-example.js` - Configuration examples
- `INSTALLATION.md` - Complete installation guide

## ⚡ Quick Start

### 1. Upload Files to Shopify

1. Go to **Shopify Admin** → **Online Store** → **Themes** → **Edit code**
2. Upload to **Assets** folder:
   - `cart-upsell.js`
   - `cart-upsell.css`

### 2. Add to Theme

Add this code to `theme.liquid` before closing `</body>` tag:

```liquid
<!-- Cart Upsell CSS -->
{{ 'cart-upsell.css' | asset_url | stylesheet_tag }}

<!-- Configuration -->
<script>
  window.cartUpsellConfig = {
    enabled: true,
    recommendations: 'manual',
    upsellProducts: [
      'product-handle-1',
      'product-handle-2',
      'product-handle-3'
    ],
    maxUpsellProducts: 4
  };
</script>

<!-- Cart Upsell Script -->
{{ 'cart-upsell.js' | asset_url | script_tag }}
```

### 3. Configure Your Upsells

Replace `'product-handle-1'`, etc. with your actual product handles.

**That's it!** Test by adding a product to cart.

## 🎯 Configuration Examples

### Manual Products

```javascript
window.cartUpsellConfig = {
  recommendations: 'manual',
  upsellProducts: ['wallet', 'belt', 'sunglasses']
};
```

### AI-Powered Related Products

```javascript
window.cartUpsellConfig = {
  recommendations: 'related'
};
```

### Collection-Based

```javascript
window.cartUpsellConfig = {
  recommendations: 'collection',
  collectionHandle: 'best-sellers'
};
```

## 🎨 Customization

All options:

```javascript
window.cartUpsellConfig = {
  enabled: true,                    // Enable/disable system
  modalDelay: 300,                  // Delay before modal shows (ms)
  autoCloseDelay: 0,                // Auto-close timeout (0 = disabled)
  maxUpsellProducts: 4,             // Max products to display
  recommendations: 'manual',         // 'manual', 'related', or 'collection'
  upsellProducts: [],               // Product handles (for manual)
  collectionHandle: '',             // Collection handle (for collection)
  excludeCurrentProduct: true,      // Exclude just-added product
  animations: true                  // Enable animations
};
```

## 📖 Full Documentation

See [INSTALLATION.md](INSTALLATION.md) for:
- Detailed installation methods
- Advanced configurations
- Product-specific upsells
- Styling customization
- Troubleshooting guide
- Performance optimization

## 🔧 How It Works

1. Customer adds product to cart
2. Script intercepts the add-to-cart action
3. Cart is updated normally
4. Modal displays recommended products
5. Customer can add more items or proceed to cart

## 💡 Use Cases

- **Cross-selling**: Suggest complementary products
- **Upselling**: Recommend premium alternatives
- **Bundles**: Offer frequently bought together items
- **Clearance**: Promote specific products or collections
- **Seasonal**: Show seasonal or trending items

## 🎯 Best Practices

1. **Keep it relevant**: Show related products only
2. **Limit choices**: 3-4 products work best
3. **Test different strategies**: Try manual vs. AI recommendations
4. **Mobile-first**: Ensure good mobile experience
5. **Monitor performance**: Track which upsells convert

## 🌐 Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Works with all modern Shopify themes

## 📝 Example Scenarios

### Fashion Store

```javascript
// Show accessories after clothing purchase
const productUpsells = {
  'leather-jacket': ['belt', 'wallet', 'boots'],
  'dress': ['handbag', 'jewelry', 'heels']
};
```

### Electronics Store

```javascript
// Show related accessories
const productUpsells = {
  'camera': ['lens', 'tripod', 'memory-card', 'bag'],
  'laptop': ['mouse', 'laptop-bag', 'external-drive']
};
```

### Beauty Store

```javascript
// Use collection-based for skincare routines
window.cartUpsellConfig = {
  recommendations: 'collection',
  collectionHandle: 'skincare-essentials'
};
```

## 🚫 Troubleshooting

**Modal not showing?**
- Check browser console for errors
- Verify product handles are correct
- Ensure JavaScript file loaded

**Styling issues?**
- Check for CSS conflicts
- Adjust z-index if needed
- Customize CSS to match theme

See [INSTALLATION.md](INSTALLATION.md) for detailed troubleshooting.

## 📄 License

Free to use and modify for your Shopify store.

## 🤝 Contributing

Feel free to customize and extend this code for your specific needs.

---

**Ready to increase your average order value?** Install now and start showing smart upsells!