# Quick Integration Instructions

## ⚠️ IMPORTANT: Don't Change Your HTML!

Keep **ALL** your original Afina HTML exactly as it is. Only add the JavaScript.

## Step 1: Add jQuery (if not already present)

Add this **BEFORE** your closing `</body>` tag:

```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
```

## Step 2: Add the Backend Integration Script

Right after jQuery, add this:

```html
<script src="afina-backend-integration.js"></script>
```

## Complete Example

Your page should look like this at the bottom:

```html
    <!-- Your existing Afina HTML here -->
    <!-- Don't change anything above -->
    
    <!-- ADD THESE TWO LINES BEFORE </body> -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="afina-backend-integration.js"></script>
  </body>
</html>
```

## That's It!

- ✅ Keep all your CSS
- ✅ Keep all your HTML structure
- ✅ Keep all your class names
- ✅ Only add the 2 script tags

The JavaScript will automatically:
- Find your product checkboxes
- Update the cart dynamically
- Handle color selections
- Set variant IDs (340-378)
- Update CRM buttons

## Verify It's Working

1. Open browser console (F12)
2. Look for: `✅ Afina Backend Integration Ready`
3. Select different packages - cart should update
4. Check variant ID updates in console

## Troubleshooting

### CSS Not Working?
- **Don't change any HTML!**
- Only add the script tags
- Check if jQuery loads (no errors in console)

### Cart Not Updating?
- Check console for errors
- Make sure `<table id="fk-dynamic-cart-table">` exists
- Make sure `<tbody id="fk-dynamic-cart-body">` exists

### Variant ID Not Changing?
- Check console logs
- Make sure product checkboxes have `name="product"`
- Make sure color dropdowns exist

## Need Help?

Check console logs - they show:
```
🚀 Afina Backend Integration Loading...
✅ Afina Backend Integration Ready
📦 Package changed to: 103
🎨 Color 1 changed to: Chrome
🛒 Updating cart...
✅ CRM Buttons updated - Variant ID: 340
```
