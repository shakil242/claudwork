# 🎯 Working Integration Script from Reference Page

This script is extracted from the WORKING checkout page and adapted for your use.

## ✅ What This Script Does

1. Handles color dropdown clicks
2. Updates `variantvalue` attribute on product checkboxes
3. Updates product images based on color selection
4. Manages multiple product checkboxes for combos

---

## 📝 Script to Add

Add this script **RIGHT BEFORE** your closing `</body>` tag:

```html
<!-- jQuery Required (if not already included) -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<script>
/**
 * COLOR SELECTION & VARIANT UPDATE SCRIPT
 * From working Raycon checkout page
 */

$(document).ready(function() {
  
  console.log('🚀 Color & Variant Integration Loading...');

  // ============================================
  // COLOR IMAGE MAPPING
  // ============================================
  
  const colorImageMap = {
    'gray': 'https://assets.checkoutchamp.com/d23897ef-f2f0-4f8a-9936-38b5b7014e42/1764251436061_gray.png',
    'blue': 'https://assets.checkoutchamp.com/d23897ef-f2f0-4f8a-9936-38b5b7014e42/1764250465115_royal_blue.png',
    'mint': 'https://assets.checkoutchamp.com/d23897ef-f2f0-4f8a-9936-38b5b7014e42/1764251450259_cool_mint.png',
    'violet': 'https://assets.checkoutchamp.com/d23897ef-f2f0-4f8a-9936-38b5b7014e42/1764250435119_blush_violet.png'
  };

  // ============================================
  // COLOR GROUPS (Map dropdowns to products)
  // ============================================
  
  const colorGroups = {
    group1: {
      drawer: document.querySelector('#colorGroup1Wrap .color-drower'),
      product: document.querySelector('input[name="product"][value="144"]') || 
               document.querySelector('input[name="product"][value="147"]'),
      imageNum: 1
    },
    group2: {
      drawer: document.querySelector('#colorGroup2Wrap .color-drower'),
      product: document.querySelector('input[name="product"][value="146"]') || 
               document.querySelector('input[name="product"][value="148"]'),
      imageNum: 2
    },
    group3: {
      drawer: document.querySelector('#colorGroup3Wrap .color-drower'),
      product: document.querySelector('input[name="product"][value="149"]'),
      imageNum: 3
    }
  };

  // ============================================
  // DROPDOWN TOGGLE (Prevent Flicker)
  // ============================================
  
  let suppressDocumentClose = false;
  
  function suppressFor(ms) {
    suppressDocumentClose = true;
    clearTimeout(suppressFor._t);
    suppressFor._t = setTimeout(() => { 
      suppressDocumentClose = false; 
    }, ms);
  }

  // Toggle dropdown
  $('.selct-colorbx .color-tog, .color-chooseHdng').on('click', function(e) {
    const $colorBox = $(this).closest('.selct-colorbx');
    if ($colorBox.attr('data-disabled') === 'true') return;

    e.stopImmediatePropagation();
    e.preventDefault();

    suppressFor(250);

    const $drawer = $(this).next('.color-drower');
    $('.color-drower').not($drawer).slideUp(150);
    $drawer.stop(true, true).slideToggle(200);
  });

  // Close dropdown when clicking outside
  $(document).on('click', function(e) {
    if (suppressDocumentClose) return;
    if (!$(e.target).closest('.selct-colorbx').length) {
      $('.color-drower').slideUp(150);
    }
  });

  // Prevent dropdown close when clicking inside
  $('.selct-colorbx .color-drower').on('click', function(e) {
    e.stopPropagation();
  });

  // ============================================
  // COLOR SELECTION (The Key Part!)
  // ============================================
  
  $('.selct-colorbx .color-drower li').on('click', function(e) {
    e.stopPropagation();

    const $li = $(this);
    const $box = $li.closest('.selct-colorbx');

    // Check if disabled
    if ($box.attr('data-disabled') === 'true') return;

    // Get color data
    const colorName = $li.text().trim();
    const variantValue = $li.attr('data-variant'); // 🔥 This is the key!
    const colorKey = $li.attr('data-color');
    const $drawer = $box.find('.color-drower');
    const $nameSpan = $box.find('.color-chooseHdng p');

    // Get color class (color1, color2, color3, color4)
    const colorClass = $li.find('p').attr('class') || 'color1';

    // Update UI
    $nameSpan.attr('class', colorClass);
    $nameSpan.html(`<span></span>${colorName}`);
    $drawer.slideUp(150);

    // Update product image
    if (colorImageMap[colorKey]) {
      const colorGroup = Object.values(colorGroups).find(grp => 
        grp.drawer === $drawer[0]
      );
      
      if (colorGroup) {
        const $prdOpt = $box.closest('.prd-opt, .bundle-option');
        const $checkProdBox = $prdOpt.find('.check_prod_box, .bundle-images');
        const $allImages = $checkProdBox.find('.check-prod, img');

        const $img = $allImages.eq(colorGroup.imageNum - 1);
        if ($img.length) {
          $img.attr('src', colorImageMap[colorKey]);
        }
      }
    }

    // 🔥 UPDATE VARIANT VALUE (This is the critical part!)
    const colorGroup = Object.values(colorGroups).find(grp => 
      grp.drawer === $drawer[0]
    );
    
    if (colorGroup && colorGroup.product) {
      const product = colorGroup.product;
      
      if (product.checked) {
        // If already checked, uncheck -> set variant -> re-check
        product.click();
        product.setAttribute('variantvalue', variantValue);
        setTimeout(() => product.click(), 100);
      } else {
        // If not checked, set variant -> check
        product.setAttribute('variantvalue', variantValue);
        product.click();
      }
      
      console.log(`✅ Variant updated: ${colorName} → ${variantValue}`);
    }
  });

  console.log('✅ Color & Variant Integration Ready');
});
</script>
```

---

## 🔧 How to Use

### Step 1: Update Your HTML

Make sure your color dropdowns have the correct structure:

```html
<ul class="colorname-list color-drower">
  <li data-color="gray" data-variant="336">
    <p class="color1"><span></span>Gray</p>
  </li>
  <li data-color="blue" data-variant="337">
    <p class="color2"><span></span>Royal Blue</p>
  </li>
  <li data-color="mint" data-variant="338">
    <p class="color3"><span></span>Cool Mint</p>
  </li>
  <li data-color="violet" data-variant="339">
    <p class="color4"><span></span>Blush Violet</p>
  </li>
</ul>
```

### Step 2: Update Product Checkboxes

Your product checkboxes should have initial `variantvalue`:

```html
<!-- Buy 1 -->
<input type="checkbox" name="product" value="144" variantvalue="336" />

<!-- Buy 2 -->
<input type="checkbox" name="product" value="145" variantvalue="336" />
<input type="checkbox" name="product" value="146" variantvalue="336" />

<!-- Buy 3 -->
<input type="checkbox" name="product" value="147" variantvalue="336" />
<input type="checkbox" name="product" value="148" variantvalue="336" />
<input type="checkbox" name="product" value="149" variantvalue="336" />
```

### Step 3: Wrap Color Dropdowns

Make sure each dropdown is inside an element with ID:

```html
<!-- For Item #1 -->
<div id="colorGroup1Wrap">
  <div class="selct-colorbx">
    <div class="color-tog">
      <p class="color-chooseHdng"><span></span>Gray</p>
    </div>
    <ul class="color-drower">
      <!-- color options here -->
    </ul>
  </div>
</div>

<!-- For Item #2 -->
<div id="colorGroup2Wrap">
  <!-- same structure -->
</div>

<!-- For Item #3 -->
<div id="colorGroup3Wrap">
  <!-- same structure -->
</div>
```

---

## ✅ Key Differences from Your Current Code

| Your Code | Working Code |
|-----------|--------------|
| Complex variant mapping (340-378) | Simple data-variant="336-339" |
| No `setAttribute` | Uses `product.setAttribute('variantvalue', variantValue)` |
| Static variant IDs | Dynamic update on color change |
| Manual checkbox checking | Auto-checks with variant update |

---

## 🧪 Testing

After adding the script:

1. Open browser console (F12)
2. Select different colors
3. You should see:
   ```
   ✅ Variant updated: Royal Blue → 337
   ✅ Variant updated: Cool Mint → 338
   ```

4. Inspect product checkboxes - `variantvalue` should update

---

## 🎯 The Critical Line

This is the line that makes it work:

```javascript
product.setAttribute('variantvalue', variantValue);
```

Where:
- `product` = the product checkbox element
- `variantValue` = comes from `data-variant` attribute on the color `<li>`

---

**Ready to use!** This is the exact logic from the working page.
