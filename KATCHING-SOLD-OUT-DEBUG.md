# Katching "Sold Out" Troubleshooting Guide

## Quick Checks

### 1. Check Product Inventory in Shopify Admin
```
1. Go to: Products → [Your Product]
2. Scroll to: Inventory section
3. Check:
   ☐ Track quantity: ON/OFF
   ☐ Quantity: [number]
   ☐ Continue selling when out of stock: [checked/unchecked]
```

**Fix**: 
- If testing: Turn OFF "Track quantity"
- OR: Check "Continue selling when out of stock"
- OR: Set quantity > 0

### 2. Check All Variants
```
1. Products → [Your Product] → Variants
2. For EACH variant:
   ☐ Available quantity
   ☐ Inventory policy
```

**Common Issue**: One variant is out of stock, making whole product appear sold out

### 3. Katching App Settings
```
1. Apps → Katching
2. Check:
   ☐ Test is running
   ☐ Inventory sync enabled
   ☐ Product variant mapping correct
```

**Fix**: Temporarily pause Katching test to see if product becomes available

### 4. JavaScript Console Errors
```
1. Open your store product page
2. Press F12 (or Cmd+Option+I on Mac)
3. Click "Console" tab
4. Look for RED errors
```

**Common Errors**:
- `Cannot read property of null`
- `getElementById(...) is null`
- Variant selection errors

**Note**: We just fixed similar errors in your checkout page!

### 5. Theme Code Issues

Check your theme's product template:
```liquid
<!-- Look for inventory checks like: -->
{% if product.available %}
  <button>Add to Cart</button>
{% else %}
  <button disabled>Sold Out</button>
{% endif %}
```

**Issue**: Katching might be modifying product data but theme isn't updating

## Solutions by Scenario

### Scenario A: Testing Only (Not Real Sales)
**Best Solution**: Disable inventory tracking for test products
```
Products → Edit Product → Inventory
☐ Uncheck "Track quantity"
```

### Scenario B: Real Product, Using Katching for Copy Testing
**Solution**: 
1. Ensure base product has inventory > 0
2. In Katching, verify variant mapping
3. Check "Continue selling when out of stock" during test period

### Scenario C: JavaScript Conflicts
**Solution**: 
1. Check browser console for errors
2. Temporarily disable other apps one by one
3. Test with default theme to isolate theme issues

## Katching-Specific Checks

### Bundle Settings
If using Katching **Bundle** feature:
```
1. Katching → Bundles
2. Check:
   ☐ All products in bundle have inventory
   ☐ Bundle product itself exists in Shopify
   ☐ Variant combinations are valid
```

**Common Issue**: Bundle includes a sold-out product

### Copy Testing Settings
If using Katching for **Copy Testing**:
```
1. Verify you're testing COPY (text) not inventory
2. Ensure "Original" version shows as available
3. Check if test started correctly
```

## Quick Debug Commands

### Check Product via Shopify API:
```javascript
// In browser console on your store:
fetch('/products/[your-product-handle].js')
  .then(r => r.json())
  .then(p => {
    console.log('Available:', p.available);
    console.log('Variants:', p.variants.map(v => ({
      title: v.title,
      available: v.available,
      inventory: v.inventory_quantity
    })));
  });
```

### Check Current Cart:
```javascript
fetch('/cart.js')
  .then(r => r.json())
  .then(cart => console.log('Cart:', cart));
```

## Still Not Working?

### Contact Support With:
1. Product handle or URL
2. Screenshot of "Sold Out" message
3. Screenshot of inventory settings
4. Screenshot of browser console errors
5. Katching test ID/name
6. Whether issue appears in all browsers

### Emergency Workaround:
```javascript
// Add to theme.liquid temporarily to force availability:
// (NOT recommended for production!)
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Remove sold out badges
    document.querySelectorAll('.sold-out, .unavailable').forEach(el => {
      el.style.display = 'none';
    });
    
    // Enable all add to cart buttons
    document.querySelectorAll('button[disabled]').forEach(btn => {
      if (btn.textContent.includes('Sold Out')) {
        btn.disabled = false;
        btn.textContent = 'Add to Cart';
      }
    });
  });
</script>
```

## Next Steps

1. ☐ Run through Quick Checks 1-4
2. ☐ Identify which scenario matches your situation
3. ☐ Apply corresponding solution
4. ☐ Clear browser cache and test
5. ☐ If still broken, contact Katching support with debug info
