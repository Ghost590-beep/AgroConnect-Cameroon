#!/bin/bash

# AgroConnect CI/CD Setup Verification Script
# Run this to verify everything is set up correctly

echo "🔍 AgroConnect CI/CD Setup Verification"
echo "========================================"
echo ""

# Check 1: GitHub workflow files exist
echo "✓ Checking GitHub Actions workflows..."
if [ -f ".github/workflows/ci-cd.yml" ]; then
    echo "  ✅ ci-cd.yml found"
else
    echo "  ❌ ci-cd.yml NOT found"
fi

if [ -f ".github/workflows/code-quality.yml" ]; then
    echo "  ✅ code-quality.yml found"
else
    echo "  ❌ code-quality.yml NOT found"
fi

# Check 2: Documentation files exist
echo ""
echo "✓ Checking documentation..."
docs_files=(
    "docs/CI-CD-PIPELINE.md"
    "docs/BACKEND_CLEANUP_PLAN.md"
    "docs/GITHUB_SECRETS.md"
    "docs/DEPLOYMENT.md"
    "docs/CICD_QUICK_START.md"
)

for doc in "${docs_files[@]}"; do
    if [ -f "$doc" ]; then
        echo "  ✅ $doc found"
    else
        echo "  ❌ $doc NOT found"
    fi
done

# Check 3: Backend dependencies
echo ""
echo "✓ Checking backend setup..."
if [ -f "server/package.json" ]; then
    echo "  ✅ Backend package.json exists"
else
    echo "  ❌ Backend package.json NOT found"
fi

# Check 4: Frontend dependencies
echo ""
echo "✓ Checking frontend setup..."
if [ -f "client/package.json" ]; then
    echo "  ✅ Frontend package.json exists"
else
    echo "  ❌ Frontend package.json NOT found"
fi

# Check 5: Routes cleanup
echo ""
echo "✓ Checking backend routes cleanup..."
if grep -q "import authRoutes" server/src/routes/index.js && \
   grep -q "import userRoutes" server/src/routes/index.js && \
   grep -q "import productRoutes" server/src/routes/index.js; then
    echo "  ✅ Routes index.js has been cleaned up"
else
    echo "  ⚠️  Routes index.js may not be fully cleaned"
fi

if grep -q "import cartRoutes" server/src/routes/index.js; then
    echo "  ⚠️  WARNING: Unused routes still registered"
fi

# Check 6: Git setup
echo ""
echo "✓ Checking Git setup..."
if git remote -v | grep -q "Ghost590-beep/AgroConnect-Cameroon"; then
    echo "  ✅ Git remote is set to correct repository"
else
    echo "  ⚠️  Git remote may not be set correctly"
fi

# Check 7: Node version
echo ""
echo "✓ Checking Node.js version..."
node_version=$(node -v)
echo "  Node version: $node_version"
if [[ "$node_version" =~ v1[89] ]] || [[ "$node_version" =~ v2 ]]; then
    echo "  ✅ Node version is compatible (18+)"
else
    echo "  ⚠️  Node version should be 18 or higher"
fi

# Check 8: Environment files
echo ""
echo "✓ Checking environment files..."
if [ -f "server/.env" ]; then
    echo "  ✅ server/.env exists"
else
    echo "  ⚠️  server/.env NOT found (required for local development)"
fi

if [ -f "client/.env" ]; then
    echo "  ✅ client/.env exists"
else
    echo "  ⚠️  client/.env NOT found (required for local development)"
fi

# Summary
echo ""
echo "========================================"
echo "✅ Verification Complete!"
echo ""
echo "📝 Next Steps:"
echo "1. Read docs/CICD_QUICK_START.md"
echo "2. Set up GitHub Secrets (see docs/GITHUB_SECRETS.md)"
echo "3. Create your first feature branch"
echo "4. Push and watch CI/CD run!"
echo ""
