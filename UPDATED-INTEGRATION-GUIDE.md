# Updated Integration Guide - Correct Product & Variant IDs

## ✅ Using Your Actual CRM IDs

This version uses your **actual CheckoutChamp product and variant IDs**.

### 📊 Your Product Structure

**Buy 1 (Single)**
- Product ID: **144**
- Variant IDs: 336 (Gray), 337 (Royal Blue), 338 (Cool Mint), 339 (Blush Violet)

**Buy 2 (Combo)**
- Product IDs: **145** (item 1) + **146** (item 2)
- Each item has variants: 336, 337, 338, 339

**Buy 3 (Triple)**
- Product IDs: **147** (item 1) + **148** (item 2) + **149** (item 3)
- Each item has variants: 336, 337, 338, 339

### 🎨 Color Variants

| Variant ID | Color Name | Image |
|-----------|-----------|-------|
| **336** | Gray | gray.png |
| **337** | Royal Blue | royal_blue.png |
| **338** | Cool Mint | cool_mint.png |
| **339** | Blush Violet | blush_violet.png |

## 🚀 Installation

### Step 1: Update Your HTML

Make sure your product checkboxes have these exact values:

```html
<!-- Buy 1 Package -->
<input type="checkbox" name="product" value="144" variantvalue="336" />

<!-- Buy 2 Package -->
<input type="checkbox" name="product" value="145" variantvalue="336" />
<input type="checkbox" name="product" value="146" variantvalue="336" />

<!-- Buy 3 Package -->
<input type="checkbox" name="product" value="147" variantvalue="336" />
<input type="checkbox" name="product" value="148" variantvalue="336" />
<input type="checkbox" name="product" value="149" variantvalue="336" />
```

### Step 2: Update Color Dropdowns

Make sure your color options have the correct data attributes:

```html
<ul class="colorname-list">
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

### Step 3: Add Scripts

Add these before `</body>`:

```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="afina-backend-integration-v2.js"></script>
```

## 🎯 How It Works

### Buy 1 Selected
```
User clicks Buy 1 package
→ Product 144 checked
→ User selects "Royal Blue" 
→ Product 144 gets variantvalue="337"
→ Cart shows: 1 × Royal Blue headphone
```

### Buy 2 Selected
```
User clicks Buy 2 package
→ Products 145 and 146 checked
→ User selects: Item #1 = Gray, Item #2 = Mint
→ Product 145 gets variantvalue="336"
→ Product 146 gets variantvalue="338"
→ Cart shows: 2 headphones (Gray + Cool Mint)
```

### Buy 3 Selected
```
User clicks Buy 3 package
→ Products 147, 148, 149 checked
→ User selects: #1 = Blue, #2 = Mint, #3 = Violet
→ Product 147 gets variantvalue="337"
→ Product 148 gets variantvalue="338"
→ Product 149 gets variantvalue="339"
→ Cart shows: 3 headphones (Blue + Mint + Violet)
```

## 🔧 Configuration

### Update Prices

Edit the `CONFIG.products` section:

```javascript
products: {
  '144': {
    basePrice: 79.99,  // Change this
    regularPrice: 99.99  // Change this
  },
  // ... etc
}
```

### Update Product Images

Edit the `CONFIG.colorImages` section:

```javascript
colorImages: {
  'gray': 'https://your-cdn.com/gray.png',
  'blue': 'https://your-cdn.com/blue.png',
  'mint': 'https://your-cdn.com/mint.png',
  'violet': 'https://your-cdn.com/violet.png'
}
```

## ✅ Verification

Open browser console and look for:

```
🚀 Afina Backend Integration Loading...
✅ Afina Backend Integration Ready
📊 Product IDs: 144 (Buy 1), 145+146 (Buy 2), 147+148+149 (Buy 3)
🎨 Variant IDs: 336 (Gray), 337 (Royal Blue), 338 (Cool Mint), 339 (Blush Violet)
```

### Test Checklist

- [ ] Buy 1: Product 144 with variants 336-339 ✓
- [ ] Buy 2: Products 145+146 with correct variants ✓
- [ ] Buy 3: Products 147+148+149 with correct variants ✓
- [ ] Color selection updates variant IDs ✓
- [ ] Cart shows correct items and images ✓
- [ ] Pricing calculates correctly ✓
- [ ] Multiple products checked for combo/triple ✓

## 🐛 Troubleshooting

### Issue: Wrong product IDs checked
**Check:** Make sure checkbox values are exactly 144, 145, 146, 147, 148, 149

### Issue: Variant IDs not updating
**Check:** Color dropdowns should have `data-variant="336"` etc.

### Issue: Cart not updating
**Check:** Table should have `id="fk-dynamic-cart-body"`

## 📝 Key Differences from Previous Version

| Previous | Updated |
|----------|---------|
| Products: 102, 125, 126 | Products: 144, 145, 146, 147, 148, 149 |
| Variants: 340-378 (27) | Variants: 336-339 (4) |
| Colors: Chrome/Nickel/Black | Colors: Gray/Blue/Mint/Violet |
| Single product per package | Multiple products for combo/triple |

## 🎉 Ready to Go!

Your integration now uses the **exact** product and variant IDs from your CheckoutChamp CRM.

---

**Last Updated**: May 21, 2026  
**Version**: 2.0.0  
**Status**: Production Ready with Correct IDs ✅
