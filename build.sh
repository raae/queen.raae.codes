#!/bin/bash

# Build script for Jigsaw site
# Copies content from content/ directory to source/ before building
# Flattens nested YYYY/MM/DD-slug/index.md structure

set -e  # Exit on error

echo "Copying and flattening content to source directory..."

# Remove existing directories
rm -rf source/_posts_queen source/_posts_olavea source/_talks

# Create fresh directories
mkdir -p source/_posts_queen source/_posts_olavea source/_talks

# Flatten posts-queen: Copy YYYY/MM/DD-slug/index.md to YYYY-MM-DD-slug.md
find content/posts-queen -name "index.md" -type f | while read -r file; do
    # Extract path components: e.g., content/posts-queen/2025/12/18-framer-override/index.md
    rel_path=$(echo "$file" | sed 's|content/posts-queen/||')
    # Convert 2025/12/18-framer-override/index.md to 2025-12-18-framer-override.md
    flat_name=$(echo "$rel_path" | sed 's|/|-|g' | sed 's|-index\.md$|.md|')
    cp "$file" "source/_posts_queen/$flat_name"
    echo "  Copied: $flat_name"
done

# Flatten posts-olavea
find content/posts-olavea -name "index.md" -type f | while read -r file; do
    rel_path=$(echo "$file" | sed 's|content/posts-olavea/||')
    flat_name=$(echo "$rel_path" | sed 's|/|-|g' | sed 's|-index\.md$|.md|')
    cp "$file" "source/_posts_olavea/$flat_name"
done

# Copy talks (assuming simpler structure)
if [ -d "content/talks" ]; then
    cp -r content/talks/* source/_talks/ 2>/dev/null || true
fi

echo "Building Vite assets..."
npm run build

echo "Building Jigsaw site..."
./vendor/bin/jigsaw build $@

echo "Build complete!"
