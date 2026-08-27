#!/bin/bash

set -e

echo "Building Memory..."

npm run build

echo "Deploying Memory..."

rsync -avz --delete dist/ moha@138.199.202.126:/var/www/memory/

echo "Memory deployed successfully."