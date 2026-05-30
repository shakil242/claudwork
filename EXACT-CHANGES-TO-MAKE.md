# 🎯 Exact Changes to Make in Your HTML File

## Use Find & Replace (Ctrl+H) in Your Text Editor

---

## ✅ STEP 1: Update Product Values

### Find & Replace #1 - Buy 3 Subscription
**FIND:**
```html
<input
  name="product"
  value="126"
  type="checkbox"
  id="cc-id-JMMlUul94913"
```

**REPLACE WITH:**
```html
<input
  name="product"
  value="147"
  type="checkbox"
  id="cc-id-JMMlUul94913"
```

---

### Find & Replace #2 - Buy 2 Subscription
**FIND:**
```html
<input
  name="product"
  value="125"
  type="checkbox"
  id="cc-id-j8mkfSu2ShSw"
```

**REPLACE WITH:**
```html
<input
  name="product"
  value="145"
  type="checkbox"
  id="cc-id-j8mkfSu2ShSw"
```

---

### Find & Replace #3 - Buy 1 Subscription (ALREADY CORRECT - NO CHANGE)
```html
<input
  name="product"
  value="144"
  type="checkbox"
  id="cc-id-vasibA3S0CAA"
```
**✅ Leave this one as is - it's already correct!**

---

### Find & Replace #4 - Buy 3 One-Time
**FIND:**
```html
<input
  name="product"
  value="103"
  type="checkbox"
  id="cc-id-giLXM5U4Urcf"
```

**REPLACE WITH:**
```html
<input
  name="product"
  value="147"
  type="checkbox"
  id="cc-id-giLXM5U4Urcf"
```

---

### Find & Replace #5 - Buy 2 One-Time
**FIND:**
```html
<input
  name="product"
  value="104"
  type="checkbox"
  id="cc-id-BxXYr7iFa8Ev"
```

**REPLACE WITH:**
```html
<input
  name="product"
  value="145"
  type="checkbox"
  id="cc-id-BxXYr7iFa8Ev"
```

---

### Find & Replace #6 - Buy 1 One-Time
**FIND:**
```html
<input
  name="product"
  value="105"
  type="checkbox"
  id="cc-id-kkxb0IXytybR"
```

**REPLACE WITH:**
```html
<input
  name="product"
  value="144"
  type="checkbox"
  id="cc-id-kkxb0IXytybR"
```

---

## ✅ STEP 2: Update getSelectedQty Function

**FIND:**
```javascript
function getSelectedQty() {
  const checked = document.querySelector('input[name="product"]:checked');
  if (!checked) return 1;
  const val = checked.value;
  if (['96', '103'].includes(val)) return 3;
  if (['101', '104'].includes(val)) return 2;
  return 1;
}
```

**REPLACE WITH:**
```javascript
function getSelectedQty() {
  const checked = document.querySelector('input[name="product"]:checked');
  if (!checked) return 1;
  const val = checked.value;
  if (['147'].includes(val)) return 3;
  if (['145'].includes(val)) return 2;
  if (['144'].includes(val)) return 1;
  return 1;
}
```

---

## ✅ STEP 3: Delete Old Variant Mapping

**FIND and DELETE this entire section:**
```javascript
// ============================================
// FINAL VARIANT CODE - Buy 1, Buy 2, Buy 3
// ============================================

const selectedColors = { 1: 'Chrome', 2: 'Nickel', 3: 'Black' };

// ---- VARIANT ID MAPS ----

// Buy 3 (340-366)
const buy3Map = {
```

**Keep deleting until you reach this line (delete this too):**
```javascript
});
</script>
```

**(This is the last `</script>` tag before `</body>`)**

---

## ✅ STEP 4: Add New Integration Script

**Right before `</body>` tag, add this:**

```html
<!-- jQuery Required -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<script>
/**
 * CORRECTED INTEGRATION
 * Product IDs: 144 (Buy 1), 145+146 (Buy 2), 147+148+149 (Buy 3)  
 * Variant IDs: 336 (Gray), 337 (Royal Blue), 338 (Cool Mint), 339 (Blush Violet)
 */

(function() {
  'use strict';

  const CONFIG = {
    products: {
      '144': { id: '144', name: 'B42 Headphones', qty: 1, items: [144] },
      '145': { id: '145', name: 'B42 Headphones', qty: 2, items: [145, 146] },
      '147': { id: '147', name: 'B42 Headphones', qty: 3, items: [147, 148, 149] }
    },
    variants: {
      'Chrome': 336,
      'Nickel': 337,
      'Black': 338
    }
  };

  const state = {
    selectedProduct: '147',
    selectedColors: { 1: 'Chrome', 2: 'Nickel', 3: 'Black' }
  };

  function getActiveProduct() {
    const checked = document.querySelector('input[name="product"]:checked');
    if (!checked) return CONFIG.products['147'];
    
    const val = checked.value;
    if (val == '144') return CONFIG.products['144'];
    if (val == '145') return CONFIG.products['145'];
    if (val == '147') return CONFIG.products['147'];
    
    return CONFIG.products['147'];
  }

  function getVariantForItem(itemNumber) {
    const color = state.selectedColors[itemNumber] || 'Chrome';
    return CONFIG.variants[color] || 336;
  }

  function updateProductCheckboxes() {
    const product = getActiveProduct();
    
    // Uncheck all
    document.querySelectorAll('input[name="product"]').forEach(cb => {
      cb.checked = false;
    });
    
    // Check needed ones
    product.items.forEach((productId, index) => {
      const checkbox = document.querySelector(`input[name="product"][value="${productId}"]`);
      if (checkbox) {
        checkbox.checked = true;
        const itemNumber = index + 1;
        const variantId = getVariantForItem(itemNumber);
        checkbox.setAttribute('variantvalue', variantId);
        console.log(`✅ Product ${productId} → Variant ${variantId}`);
      }
    });
  }

  function updateCRMButtons() {
    const variantId = getVariantForItem(1);
    
    const completeBtn = document.getElementById('cc-id-gJjWQNeaMLxD');
    if (completeBtn) {
      completeBtn.setAttribute('variantvalue', variantId);
    }
    
    const paypalBtn = document.getElementById('cc-id-mDAZlSkHpSUa');
    if (paypalBtn) {
      paypalBtn.setAttribute('variantvalue', variantId);
    }
    
    console.log('✅ CRM Buttons updated - Variant:', variantId);
  }

  function updateAll() {
    updateProductCheckboxes();
    updateCRMButtons();
  }

  // Override selectColor
  const _origSelectColor = window.selectColor;
  window.selectColor = function(group, color, el) {
    state.selectedColors[group] = color;
    if (_origSelectColor) {
      _origSelectColor(group, color, el);
    }
    updateAll();
  };

  // Product change listener
  document.addEventListener('change', function(e) {
    if (e.target && e.target.name === 'product') {
      setTimeout(updateAll, 100);
    }
  });

  // Page load
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(updateAll, 800);
  });

  window.addEventListener('load', function() {
    setTimeout(updateAll, 1200);
  });

  // Expose for debugging
  window.B42Debug = { state, config: CONFIG, updateAll };

})();
</script>
</body>
</html>
```

---

## ✅ Summary

**Total Changes:**
1. ✅ 6 product value changes (126→147, 125→145, 103→147, 104→145, 105→144, 144 stays)
2. ✅ 1 function update (getSelectedQty)
3. ✅ Delete old variant script (340-378 system)
4. ✅ Add new integration script (336-339 system)

---

## 🧪 How to Test

1. Save your HTML file
2. Open in browser
3. Press F12 (Console)
4. Look for:
   ```
   ✅ Product 147 → Variant 336
   ✅ Product 148 → Variant 337
   ✅ Product 149 → Variant 338
   ✅ CRM Buttons updated - Variant: 336
   ```

5. Click different packages and colors - variant IDs should update

---

**Need Help?**  
If any Find/Replace doesn't work, let me know which one and I'll help locate it in your file.
