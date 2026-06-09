#!/usr/bin/env bash
set -euo pipefail

# deploy-on-vps.sh
# Pull latest code, install dependencies, build frontend, restart backend, and verify service health.
# Assumes the repo is located at ~/AgroConnect-Cameroon on the VPS.

BRANCH="${1:-develop}"
REPO_DIR="${2:-$HOME/AgroConnect-Cameroon}"

echo "Deploy script started: repo=$REPO_DIR branch=$BRANCH"
cd "$REPO_DIR"

echo "Fetching origin..."
git fetch origin --prune

echo "Checking out branch $BRANCH..."
git checkout "$BRANCH" || git checkout -b "$BRANCH" origin/"$BRANCH"
git reset --hard origin/"$BRANCH"
git clean -fd

# Backend install
echo "Installing backend dependencies..."
cd "$REPO_DIR/server"
npm ci --silent

# Build backend if build script exists
if npm run | grep -q "build"; then
  echo "Building backend..."
  npm run build --if-present --silent || true
fi

# Frontend build
echo "Installing frontend dependencies..."
cd "$REPO_DIR/client"
npm ci --silent

echo "Building frontend..."
npm run build --silent

# Restart backend using PM2
cd "$REPO_DIR"
if command -v pm2 >/dev/null 2>&1; then
  echo "Restarting backend process with PM2..."
  pm2 restart agroconnect-backend 2>/dev/null || pm2 start server/index.js --name agroconnect-backend
  pm2 save
  echo "PM2 restart succeeded"
else
  echo "pm2 not installed; please install pm2 to manage the node process" >&2
  exit 1
fi

# Health check
echo "Verifying application health..."
for i in 1 2 3; do
  if curl -sSf http://127.0.0.1:5000/health >/dev/null 2>&1; then
    echo "Health check passed"
    exit 0
  fi
  echo "Health check failed, retrying... ($i)"
  sleep 3
done

echo "Health check did not succeed after retries" >&2
exit 1
