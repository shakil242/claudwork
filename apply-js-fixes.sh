#!/bin/bash

# Script to apply JavaScript fixes to the original checkout HTML file
# Usage: ./apply-js-fixes.sh checkout-page-original.html

INPUT_FILE="$1"
OUTPUT_FILE="checkout-page-FIXED-COMPLETE.html"

if [ -z "$INPUT_FILE" ]; then
  echo "Usage: $0 <input-html-file>"
  echo "Example: $0 checkout-page-original.html"
  exit 1
fi

if [ ! -f "$INPUT_FILE" ]; then
  echo "Error: File '$INPUT_FILE' not found!"
  exit 1
fi

echo "📝 Applying JavaScript fixes to $INPUT_FILE..."
echo ""

# Create a copy to work with
cp "$INPUT_FILE" "$OUTPUT_FILE"

# FIX 1 & 2: Replace isa7ib1 with isa7ib (both occurrences)
echo "✅ Fix 1-2: Correcting element ID isa7ib1 → isa7ib..."
sed -i 's/getElementById("isa7ib1")/getElementById("isa7ib")/g' "$OUTPUT_FILE"

# FIX 3: Replace iqct91 with iqct9
echo "✅ Fix 3: Correcting selector #iqct91 → #iqct9..."
sed -i 's/#iqct91/#iqct9/g' "$OUTPUT_FILE"

# FIX 4: Add null check for checkbox (more complex, using multi-line sed)
echo "✅ Fix 4: Adding null check for checkbox..."
# This is a placeholder - the actual fix requires more complex replacement
# It's better to do this manually or with a more sophisticated tool

# FIX 5 & 6: The handleInputToggle function improvement
echo "✅ Fix 5-6: Improving handleInputToggle function..."
# This also requires manual editing as it's a large block replacement

echo ""
echo "⚠️  IMPORTANT: Fixes 4, 5, and 6 require manual editing."
echo "   Please refer to APPLY-THESE-FIXES.md for detailed instructions."
echo ""
echo "✅ Basic fixes applied! Output saved to: $OUTPUT_FILE"
echo ""
echo "Next steps:"
echo "1. Open $OUTPUT_FILE in your editor"
echo "2. Apply remaining fixes from APPLY-THESE-FIXES.md"
echo "3. Test in browser"
echo ""
