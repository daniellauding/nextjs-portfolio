#!/bin/bash
# Extract Figma assets for Qasa & Vromm case studies
# Usage: ./scripts/extract-figma-assets.sh

set -e

FIGMA_FILE="ITcLm3ciPq4G5qkKP6q1d9"
FIGMA_SKILL_PATH="/Users/lume/.openclaw/workspace/skills/figma"
PROJECT_ROOT="$HOME/Work/internal/instinctly/daniellauding"
OUTPUT_DIR="$PROJECT_ROOT/public/work"

echo "🎨 Figma Asset Extraction for daniellauding.se Case Studies"
echo "============================================================"
echo ""

# Check for Figma token
if [ -z "$FIGMA_ACCESS_TOKEN" ]; then
    echo "❌ Error: FIGMA_ACCESS_TOKEN not set"
    echo ""
    echo "Get your token from: https://www.figma.com/developers/api#access-tokens"
    echo "Then run: export FIGMA_ACCESS_TOKEN='your-token-here'"
    exit 1
fi

echo "✅ Figma token found"
echo ""

# Activate Figma skill venv
cd "$FIGMA_SKILL_PATH"
source venv/bin/activate

echo "📥 Step 1: Fetching Figma file structure..."
python scripts/figma_client.py get-file "$FIGMA_FILE" --output /tmp/figma-structure.json
echo "✅ File structure saved to /tmp/figma-structure.json"
echo ""

echo "📋 Step 2: Analyzing file for Qasa & Vromm content..."
echo "(You'll need to identify the specific node IDs from the structure file)"
echo ""
echo "To find node IDs:"
echo "  1. Open /tmp/figma-structure.json"
echo "  2. Search for 'Qasa' and 'Vromm' sections"
echo "  3. Note the 'id' fields for frames you want to export"
echo ""
echo "Or use the Figma URL node-id: 624-458 (from your source URL)"
echo ""

# Create output directories
mkdir -p "$OUTPUT_DIR/qasa"
mkdir -p "$OUTPUT_DIR/vromm"
echo "✅ Created output directories"
echo ""

echo "📸 Step 3: Export images (requires manual node IDs)"
echo ""
echo "Example commands once you have node IDs:"
echo ""
echo "# Export Qasa images"
echo "python scripts/export_manager.py export-frames $FIGMA_FILE \\"
echo "  --node-ids '624:458,624:459,624:460' \\"
echo "  --formats png \\"
echo "  --scale 2 \\"
echo "  --output '$OUTPUT_DIR/qasa'"
echo ""
echo "# Export Vromm images"
echo "python scripts/export_manager.py export-frames $FIGMA_FILE \\"
echo "  --node-ids '625:100,625:101,625:102' \\"
echo "  --formats png \\"
echo "  --scale 2 \\"
echo "  --output '$OUTPUT_DIR/vromm'"
echo ""

echo "📖 Step 4: Manual extraction workflow"
echo ""
echo "Since node IDs need to be identified manually:"
echo ""
echo "Option A - Automated (preferred):"
echo "  1. Open /tmp/figma-structure.json"
echo "  2. Find node IDs for case study screens"
echo "  3. Run export commands above with actual IDs"
echo ""
echo "Option B - Manual (faster for now):"
echo "  1. Open Figma file in browser"
echo "  2. Select each frame/component you want"
echo "  3. Export as PNG (2x resolution)"
echo "  4. Save to $OUTPUT_DIR/qasa/ or /vromm/"
echo ""

echo "🎯 Target images to export:"
echo ""
echo "Qasa (/work/qasa):"
echo "  - hero-bg.png (optional)"
echo "  - research-findings.png"
echo "  - market-benchmarking.png"
echo "  - ai-design-process.png"
echo "  - lovable-tool-1.png"
echo "  - lovable-tool-2.png"
echo "  - prototype-demo.png"
echo ""
echo "Vromm (/work/vromm):"
echo "  - hero-bg.png (optional)"
echo "  - app-screen-home.png"
echo "  - app-screen-route.png"
echo "  - app-screen-progress.png"
echo "  - research-insights.png"
echo "  - tech-stack-diagram.png"
echo ""

echo "✨ Next steps after extraction:"
echo ""
echo "1. Verify images saved to $OUTPUT_DIR"
echo "2. Run: cd $PROJECT_ROOT && npm run dev"
echo "3. Update page components to use real images"
echo "4. Test on http://localhost:3000/work/qasa and /work/vromm"
echo "5. Commit: git add public/work && git commit -m 'Add case study images from Figma'"
echo ""

echo "📚 Documentation:"
echo "See CASE_STUDIES_STATUS.md for full implementation details"
echo ""

deactivate
