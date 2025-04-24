#!/bin/bash

# Exit on error
set -e

# Go to script directory
cd "$(dirname "$0")/.."

echo "Building blocks..."
cd blocks
npm run build

echo "Building inspector sidebar panel..."
cd ../includes/inspector-sidebar-panel
npm run build

echo "Build completed successfully!"
