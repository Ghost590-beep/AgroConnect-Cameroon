# 🚀 AgroConnect CI/CD Pipeline Guide

## Overview

This guide explains the CI/CD pipeline setup for AgroConnect, enabling safe deployment of your application without conflicts between branches and GitHub.

> The main CI workflow is now located at `.github/workflows/simple-ci.yml`.
> It runs backend and frontend tests on every push and pull request, and can deploy to staging or production when the required SSH secrets are configured.

---

## 📋 Branching Strategy

### Git Flow Model

```
┌─ main (Production)
│  └─ Deployed to http://173.249.53.17
│
└─ develop (Staging)
   ├─ Pre-production testing
   └─ Merge PRs here first
```

### Branch Naming Conventions

```
feat/feature-name          # New features
fix/bug-description        # Bug fixes
refactor/code-cleanup      # Code refactoring
docs/update-docs           # Documentation
chore/maintenance-task     # Maintenance
ci/pipeline-changes        # CI/CD updates
```

---

## 🔧 Workflow Steps

### 1. Create a Feature Branch

```bash
git checkout develop
git pull origin develop
git checkout -b feat/your-feature-name
```

### 2. Make Changes Locally

```bash
# Frontend changes
cd client
npm run dev

# Backend changes  
cd ../server
npm run dev
```

### 3. Test Your Changes

```bash
# Backend tests
cd server
npm test

# Frontend tests
cd ../client
npm test
```

### 4. Commit and Push

```bash
git add .
git commit -m "feat: describe your changes"
git push origin feat/your-feature-name
```

### 5. Create Pull Request

- Go to GitHub: https://github.com/Ghost590-beep/AgroConnect-Cameroon
- Click **"New Pull Request"**
- Set:
  - **Base branch:** `develop`
  - **Compare branch:** `feat/your-feature-name`
- Add description
- Click **"Create Pull Request"**

### 6. CI/CD Runs Automatically

GitHub Actions will:
- ✅ Run tests on backend & frontend
- ✅ Lint code for style issues
- ✅ Build both applications
- ✅ Run security checks
- ✅ Deploy to **staging** (develop branch only)

### 7. Review & Merge

- Code review from team
- Approve if all checks pass
- Merge to `develop`

### 8. Final: Merge develop → main

Once staging is tested and ready:

```bash
git checkout main
git pull origin main
git merge develop
git push origin main
```

GitHub Actions will automatically deploy to production.

---

## 🔐 GitHub Secrets Configuration

The CI/CD pipeline needs SSH credentials to deploy. Set these in GitHub:

1. Go to your repo → **Settings → Secrets and variables → Actions**
2. Add these secrets:

```
STAGING_SERVER_HOST      = 173.249.53.17
STAGING_SERVER_USER      = mc
STAGING_SERVER_SSH_KEY   = (private SSH key)

PROD_SERVER_HOST         = 173.249.53.17
PROD_SERVER_USER         = mc
PROD_SERVER_SSH_KEY      = (private SSH key)
```

### How to Get SSH Key

```bash
# On your development machine
ssh-keygen -t rsa -b 4096 -f ~/.ssh/agroconnect_deploy
cat ~/.ssh/agroconnect_deploy  # Copy this (PRIVATE key)

# On the server
# Add PUBLIC key to ~/.ssh/authorized_keys
cat ~/.ssh/agroconnect_deploy.pub >> ~/.ssh/authorized_keys
```

---

## 📊 Pipeline Status

- **develop branch:** Runs tests + deploys to staging
- **main branch:** Runs tests + deploys to production
- **PR to develop/main:** Runs tests (no deploy)

### View Pipeline Status

- Go to **Actions** tab in GitHub
- Click on the workflow run
- See real-time build status

---

## 🧹 Backend Code Cleanup (Unused Components)

The following backend components are **NOT used by the frontend** and can be removed to reduce complexity:

### Unused Controllers/Services/Routes

```
✗ auditLog.* (REMOVE)
✗ cart.* (REMOVE)
✗ category.* (REMOVE)
✗ delivery.* (REMOVE)
✗ escrow.* (REMOVE)
✗ farmer.* (REMOVE)
✗ favorite.* (REMOVE)
✗ message.* (REMOVE)
✗ notification.* (REMOVE)
✗ order.* (REMOVE)  # Not called by frontend
✗ paymentMethod.* (REMOVE)
✗ paymentProvider.* (REMOVE)
✗ review.* (REMOVE)

✅ auth.* (KEEP - Frontend uses this)
✅ user.* (KEEP - Frontend uses this)
✅ product.* (KEEP - Frontend uses this)
```

### Keep

```
✅ server/src/routes/auth.routes.js
✅ server/src/routes/user.routes.js
✅ server/src/routes/product.routes.js
✅ server/src/controllers/auth.controller.js
✅ server/src/controllers/user.controller.js
✅ server/src/controllers/product.controller.js
```

### Step-by-step Cleanup

See `BACKEND_CLEANUP_PLAN.md` for detailed removal process.

---

## 🚨 Important Notes

### No Conflicts on GitHub

- Each developer works on their own branch
- Tests run automatically (catch issues early)
- Only tested code merges to main
- Production is protected

### Database

- Database migrations handled separately
- Never commit database credentials
- Use `.env` file for sensitive data

### Environment Variables

Create `.env` files:

**server/.env:**
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=agroconnect
JWT_SECRET=your_secret_key
NODE_ENV=development
```

**client/.env:**
```
VITE_API_BASE=http://localhost:5000
```

---

## 🔍 Troubleshooting

### Deployment Failed?

1. Check Actions tab for error logs
2. Verify SSH credentials are correct
3. Check server disk space and permissions
4. Review deployment script in `.github/workflows/ci-cd.yml`

### Tests Failing?

1. Run tests locally: `npm test`
2. Check node_modules are installed
3. Verify .env file is set up
4. Check database connection

### Branch Won't Merge?

1. Pull latest develop: `git pull origin develop`
2. Resolve conflicts locally
3. Push again
4. All checks must pass

---

## ✅ Deployment Checklist

Before merging to main:

- [ ] All tests pass locally
- [ ] All GitHub Actions checks pass
- [ ] Code reviewed and approved
- [ ] .env file configured on server
- [ ] Database is synced
- [ ] No console errors in browser
- [ ] No errors in server logs

---

## 📞 Support

- GitHub Issues: Report bugs
- Pull Requests: Suggest changes
- Discussions: Ask questions

---

**Last Updated:** 2026-06-08
