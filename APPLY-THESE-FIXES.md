# 🔧 JavaScript Fixes to Apply

## Instructions
Use Find & Replace (Ctrl+H or Cmd+H) in your HTML editor to apply these fixes in order.

---

## Fix 1: Element ID Mismatch (First Occurrence)
**Find:**
```javascript
const input1 = document.getElementById("isa7ib1").value.trim();
```

**Replace with:**
```javascript
const input1Element = document.getElementById("isa7ib");
const input2Element = document.getElementById("i8skgo");

if (!input1Element || !input2Element) {
  console.warn('Required input elements not found for handleInputToggle');
  return;
}

const input1 = input1Element.value.trim();
```

---

## Fix 2: Element ID Mismatch (Second Occurrence)
**Find:**
```javascript
const a = document.getElementById("isa7ib1");
```

**Replace with:**
```javascript
const a = document.getElementById("isa7ib");
```

---

## Fix 3: Selector Typo
**Find:**
```javascript
$("#ittkxs1, #iqct91").text(formattedPrice);
```

**Replace with:**
```javascript
$("#ittkxs1, #iqct9").text(formattedPrice);
```

**Note:** This appears TWICE in the applyDiscount function - replace both occurrences.

---

## Fix 4: Add Null Check for Checkbox
**Find:**
```javascript
$('.remove-text1').click(function () {
  $('.shipping-insurance-container').hide();
  document.getElementById('iczym6').click();
});
```

**Replace with:**
```javascript
$('.remove-text1').click(function () {
  $('.shipping-insurance-container').hide();
  const checkbox = document.getElementById('iczym6');
  if (checkbox) {
    checkbox.click();
  } else {
    console.warn('Checkbox #iczym6 not found');
  }
});
```

---

## Fix 5: Improve handleInputToggle Function

**Find the ENTIRE handleInputToggle function:**
```javascript
function handleInputToggle() {
  const input1 = document.getElementById("isa7ib1").value.trim();
  const input2 = document.getElementById("i8skgo").value.trim();

  if (input1 === "" && input2 === "") {
    document.getElementById("id31p4").style.display = "block";
    document.getElementById("irl1r").style.display = "block";
    document.getElementById("ittkxs1").style.display = "block";
    document.getElementById("i91pw6").style.display = "block";
    document.getElementById("id31p4-2").style.display = "none";
    document.getElementById("io1dmo").style.display = "none";
    document.getElementById("i94rj").style.display = "none";
    document.getElementById("io76633").style.display = "none";
  } else {
    document.getElementById("id31p4").style.display = "none";
    document.getElementById("irl1r").style.display = "none";
    document.getElementById("ittkxs1").style.display = "none";
    document.getElementById("i91pw6").style.display = "none";
    document.getElementById("id31p4-2").style.display = "block";
    document.getElementById("io1dmo").style.display = "block";
    document.getElementById("i94rj").style.display = "block";
    document.getElementById("io76633").style.display = "block";
  }
}
```

**Replace with:**
```javascript
function handleInputToggle() {
  // Get elements with null checks
  const input1Element = document.getElementById("isa7ib");
  const input2Element = document.getElementById("i8skgo");

  if (!input1Element || !input2Element) {
    console.warn('Required input elements not found for handleInputToggle');
    return;
  }

  const input1 = input1Element.value.trim();
  const input2 = input2Element.value.trim();

  // Get all target elements
  const elements = {
    show: [
      document.getElementById("id31p4"),
      document.getElementById("irl1r"),
      document.getElementById("ittkxs1"),
      document.getElementById("i91pw6")
    ],
    hide: [
      document.getElementById("id31p4-2"),
      document.getElementById("io1dmo"),
      document.getElementById("i94rj"),
      document.getElementById("io76633")
    ]
  };

  // Check if all elements exist
  const allExist = [...elements.show, ...elements.hide].every(el => el !== null);
  if (!allExist) {
    console.warn('Some target elements not found in handleInputToggle');
    return;
  }

  if (input1 === "" && input2 === "") {
    elements.show.forEach(el => el.style.display = "block");
    elements.hide.forEach(el => el.style.display = "none");
  } else {
    elements.show.forEach(el => el.style.display = "none");
    elements.hide.forEach(el => el.style.display = "block");
  }
}
```

---

## Fix 6: Event Listener Setup

**Find:**
```javascript
document.addEventListener("DOMContentLoaded", function () {
  const a = document.getElementById("isa7ib1");
  const b = document.getElementById("i8skgo");

  if (a) a.oninput = handleInputToggle;
  if (b) b.oninput = handleInputToggle;
});
```

**Replace with:**
```javascript
document.addEventListener("DOMContentLoaded", function () {
  const a = document.getElementById("isa7ib");
  const b = document.getElementById("i8skgo");

  if (a) {
    a.oninput = handleInputToggle;
  } else {
    console.warn('Input element #isa7ib not found');
  }

  if (b) {
    b.oninput = handleInputToggle;
  } else {
    console.warn('Input element #i8skgo not found');
  }
});
```

---

## Summary of Changes
- ✅ Fixed `isa7ib1` → `isa7ib` (2 locations)
- ✅ Fixed `iqct91` → `iqct9` (2 locations)
- ✅ Added null check for checkbox click
- ✅ Added error handling to handleInputToggle
- ✅ Added console warnings for missing elements

## Testing After Fixes
1. Open browser console (F12)
2. Check for any errors
3. Test discount code input on both desktop and mobile views
4. Test shipping insurance remove functionality
5. Verify price updates correctly

## Estimated Time
5-10 minutes to apply all fixes
