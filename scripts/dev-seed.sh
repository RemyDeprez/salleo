#!/usr/bin/env bash
# Simple wrapper to run the Node seeder on systems with bash
node "$(dirname "$0")/dev-seed.js"
echo "Dev seed complete."
