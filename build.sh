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

# Function to copy post images to match URL structure
copy_post_images() {
    local content_dir="$1"
    local source_prefix="$2"

    # Find all post directories (those containing index.md)
    find "$content_dir" -name "index.md" -type f | while read -r index_file; do
        # Get the directory containing index.md
        post_dir=$(dirname "$index_file")

        # Extract the path: YYYY/MM/DD-slug
        rel_path=$(echo "$post_dir" | sed "s|$content_dir/||")

        # Parse into components: YYYY, MM, DD-slug
        if [[ "$rel_path" =~ ^([0-9]{4})/([0-9]{2})/(.+)$ ]]; then
            year="${BASH_REMATCH[1]}"
            month="${BASH_REMATCH[2]}"
            day_slug="${BASH_REMATCH[3]}"

            # Parse DD-slug into DD and slug
            if [[ "$day_slug" =~ ^([0-9]{2})-(.+)$ ]]; then
                day="${BASH_REMATCH[1]}"
                slug="${BASH_REMATCH[2]}"

                # Create target directory in source: YYYY/MM/DD/slug
                target_dir="source/$year/$month/$day/$slug"
                mkdir -p "$target_dir"

                # Copy all files except index.md (images, etc.)
                find "$post_dir" -maxdepth 1 -type f ! -name "index.md" -exec cp {} "$target_dir/" \;
            fi
        fi
    done
}

# Flatten posts-queen: Copy YYYY/MM/DD-slug/index.md to YYYY-MM-DD-slug.md
echo "Copying Queen Raae posts..."
find content/posts-queen -name "index.md" -type f | while read -r file; do
    # Extract path components: e.g., content/posts-queen/2025/12/18-framer-override/index.md
    rel_path=$(echo "$file" | sed 's|content/posts-queen/||')
    # Convert 2025/12/18-framer-override/index.md to 2025-12-18-framer-override.md
    flat_name=$(echo "$rel_path" | sed 's|/|-|g' | sed 's|-index\.md$|.md|')
    cp "$file" "source/_posts_queen/$flat_name"
done

# Copy images for Queen Raae posts
echo "Copying Queen Raae post images..."
copy_post_images "content/posts-queen" "posts-queen"

# Flatten posts-olavea
echo "Copying Cap'n Ola posts..."
find content/posts-olavea -name "index.md" -type f | while read -r file; do
    rel_path=$(echo "$file" | sed 's|content/posts-olavea/||')
    flat_name=$(echo "$rel_path" | sed 's|/|-|g' | sed 's|-index\.md$|.md|')
    cp "$file" "source/_posts_olavea/$flat_name"
done

# Copy images for Cap'n Ola posts
echo "Copying Cap'n Ola post images..."
copy_post_images "content/posts-olavea" "posts-olavea"

# Copy talks (assuming simpler structure)
if [ -d "content/talks" ]; then
    cp -r content/talks/* source/_talks/ 2>/dev/null || true
fi

echo "Building Vite assets..."
npm run build

echo "Building Jigsaw site..."
./vendor/bin/jigsaw build $@

echo "Build complete!"
