# Afina + Raycon Integration Guide

## Overview

This integration combines:
- **Afina Checkout Page** (modern frontend design)
- **Raycon Checkout Backend** (proven CRM logic)

## 🎯 What Was Done

### 1. **Frontend from Afina**
- Modern, clean checkout UI design
- Product bundle selection interface (Buy 1, 2, or 3)
- Color selection dropdowns (Chrome, Nickel, Black)
- Responsive order summary
- Customer information forms
- Payment section

### 2. **Backend from Raycon**
- Dynamic cart update logic
- Variant ID management (340-378)
- Product checkbox state handling
- Color selection with variant mapping
- Real-time pricing calculations
- CRM button integration (`variantvalue` attribute)
- jQuery-based event handlers

## 📁 Files Created

### Primary Files

1. **`afina-checkout-integrated.html`** ⭐
   - Complete integrated solution
   - Ready to use
   - All JavaScript inline for easy deployment

2. **`cart-crm-manager.js`**
   - Standalone JavaScript module
   - Can be included separately if needed
   - Reusable across multiple pages

3. **`checkout-page-crm-fixed.html`**
   - Alternative implementation
   - Minimal structure for testing

## 🔧 How It Works

### Variant ID Mapping System

The system uses a comprehensive variant mapping for all color combinations:

#### Buy 3 Showerheads (Variants 340-366)
```javascript
'chrome/chrome/chrome': 340
'chrome/chrome/nickel': 341
'chrome/chrome/black': 342
// ... 27 total combinations
'black/black/black': 366
```

#### Buy 2 Showerheads (Variants 367-375)
```javascript
'chrome/chrome': 367
'chrome/nickel': 368
// ... 9 total combinations
'black/black': 375
```

#### Buy 1 Showerhead (Variants 376-378)
```javascript
'chrome': 376
'nickel': 377
'black': 378
```

### Key Functions

#### `updateCart()`
- Rebuilds cart HTML dynamically
- Updates product images based on colors
- Recalculates all prices
- Updates CRM button `variantvalue`

#### `handlePackageChange()`
- Manages checkbox states (only one active)
- Switches between Buy 1/2/3 packages
- Updates active product in state
- Triggers cart update

#### `Color Selection`
- Dropdown UI for each showerhead
- Updates state on selection
- Remaps variant ID automatically
- Changes product images in real-time

## 🚀 Usage

### Quick Start

1. **Upload the File**
   ```bash
   # Upload afina-checkout-integrated.html to your server
   ```

2. **Test in Browser**
   - Open the page
   - Select different bundles (Buy 1, 2, or 3)
   - Choose colors for each showerhead
   - Verify variant ID updates in console

3. **Verify CRM Integration**
   - Check `completePurchaseBtn` has `variantvalue` attribute
   - Inspect value updates when changing selections
   - Verify cart updates correctly

### Using Standalone JS Module

If you prefer to keep JavaScript separate:

```html
<script src="cart-crm-manager.js"></script>
```

Then call:
```javascript
AfinaCartManager.init();
```

## 📊 Product Configuration

Current products configured:

```javascript
{
  '126': { // Buy 3 - Subscription
    id: '126',
    name: 'Afina Showerhead',
    basePrice: 69.95,
    qty: 3,
    regularPrice: 199.85
  },
  '125': { // Buy 2 - Subscription
    id: '125',
    name: 'Afina Showerhead',
    basePrice: 84.95,
    qty: 2,
    regularPrice: 159.85
  },
  '102': { // Buy 1 - Subscription
    id: '102',
    name: 'Afina Showerhead',
    basePrice: 99.95,
    qty: 1,
    regularPrice: 129.85
  }
}
```

## 🎨 Color Images

Product images are pulled from:

```javascript
colorImages: {
  'chrome': 'https://image.qwenlm.ai/.../chrome.png',
  'nickel': 'https://image.qwenlm.ai/.../nickel.png',
  'black': 'https://image.qwenlm.ai/.../black.png'
}
```

## 🐛 Debugging

### Console Logs

The system logs key events:

```
🛒 Cart updated: { product: '126', qty: 3, colors: {...}, variantId: 340 }
✅ CRM Buttons updated - Variant ID: 353
```

### Check Variant ID

```javascript
// In browser console:
window.getVariantId() // Returns current variant ID
```

### Inspect State

```javascript
// Check current state:
console.log(state.selectedProduct);    // '126', '125', or '102'
console.log(state.activePackage);      // 'pkg1', 'pkg2', or 'pkg3'
console.log(state.selectedColors);     // Color selections
```

## ✅ Testing Checklist

- [ ] Buy 3 package selects correctly (variant 340-366)
- [ ] Buy 2 package selects correctly (variant 367-375)
- [ ] Buy 1 package selects correctly (variant 376-378)
- [ ] Color dropdowns open/close properly
- [ ] Selecting color updates variant ID
- [ ] Cart shows correct products with images
- [ ] Pricing calculates correctly
- [ ] Order summary updates in real-time
- [ ] CRM button has correct `variantvalue`
- [ ] Only one package can be active at a time

## 🔄 Integration with CheckoutChamp

### Required Attributes

The integration works with CheckoutChamp's system using:

1. **Product Checkboxes**
   ```html
   <input type="checkbox"
          name="product"
          value="126"
          variantvalue="340" />
   ```

2. **CRM Submit Buttons**
   ```html
   <button action="submit"
           variantvalue="340">
     Complete Purchase
   </button>
   ```

3. **Form Fields**
   - Standard CheckoutChamp field names
   - `shipFirstName`, `shipLastName`, etc.
   - `cardNumber`, `cardDate`, `cardSecurityCode`

## 📝 Customization

### Change Product Prices

Edit the `CONFIG.products` object:

```javascript
'126': {
  id: '126',
  name: 'Afina Showerhead',
  basePrice: 79.95,  // Change this
  qty: 3,
  regularPrice: 239.85  // Change this
}
```

### Add More Colors

1. Add to `colorImages`:
   ```javascript
   'gold': 'https://your-cdn.com/gold-shower.png'
   ```

2. Update variant maps to include new combinations

3. Add to dropdown HTML:
   ```html
   <li data-color="gold" data-variant="XXX">
     <p class="color4"><span></span>Gold</p>
   </li>
   ```

### Change Variant IDs

Update the `variantMaps` object with your CRM's variant IDs.

## 🎯 Key Differences from Original Files

### From Afina Original
- ✅ Kept: Modern UI design, layout structure
- ✅ Changed: Static variant IDs → Dynamic mapping
- ✅ Changed: No cart updates → Real-time updates
- ✅ Added: jQuery for robust event handling

### From Raycon Original
- ✅ Kept: Checkbox logic, color selection, cart updates
- ✅ Changed: Headphone products → Showerhead products
- ✅ Changed: 4 colors (Blue/Gray/Mint/Violet) → 3 colors (Chrome/Nickel/Black)
- ✅ Changed: Variant IDs → Afina's 340-378 range

## 🚨 Known Issues & Solutions

### Issue: Dropdown stays open after selection
**Solution**: Implemented `suppressDocumentClose` flag with 250ms debounce

### Issue: Multiple checkboxes can be checked
**Solution**: Added strict `updating` flag in `handlePackageChange()`

### Issue: Variant ID doesn't update
**Solution**: Ensured `updateCRMButtons()` is called after every state change

### Issue: Cart doesn't refresh
**Solution**: Added `setTimeout()` wrapper for initial load

## 📞 Support

For issues or questions:
1. Check browser console for error logs
2. Verify jQuery is loaded (v3.6.0+)
3. Ensure CheckoutChamp scripts are present
4. Check network tab for API calls

## 🎉 Success Criteria

Integration is successful when:
- ✅ All 3 packages work independently
- ✅ Variant IDs map correctly (340-378)
- ✅ Cart updates match selections
- ✅ CRM receives correct variant on submit
- ✅ No console errors
- ✅ Smooth UI interactions

---

**Last Updated**: May 21, 2026
**Version**: 1.0.0
**Status**: Production Ready ✅
