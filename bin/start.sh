#!/bin/bash

# Exit on error
set -e

# Go to script directory
cd "$(dirname "$0")/.."

echo "Starting blocks..."
cd blocks
npm run start

echo "Starting inspector sidebar panel..."
cd ../includes/inspector-sidebar-panel
npm run start

