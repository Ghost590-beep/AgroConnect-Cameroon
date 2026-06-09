# ✅ AgroConnect CI/CD Setup - Implementation Checklist

## 📌 Overview

Your CI/CD pipeline is configured! Use this checklist to get up and running.

---

## Phase 1: Initial Setup (30 minutes)

- [ ] **Read CICD_QUICK_START.md** (5 min)
  - Overview of what's new
  - Quick 5-step workflow

- [ ] **Generate SSH Keys** (5 min)
  - Follow: docs/GITHUB_SECRETS.md
  - Run: `ssh-keygen -t rsa -b 4096 -f ~/.ssh/agroconnect_deploy`

- [ ] **Add Public Key to Server** (5 min)
  - SSH into: `ssh mc@173.249.53.17`
  - Add key to: `~/.ssh/authorized_keys`

- [ ] **Set GitHub Secrets** (10 min)
  - Go to: https://github.com/Ghost590-beep/AgroConnect-Cameroon/settings/secrets/actions
  - Add 6 secrets from GITHUB_SECRETS.md
  - Save each one

- [ ] **Run Verification Script** (5 min)
  ```bash
  bash verify-cicd-setup.sh
  ```
  - Should show all green checkmarks

---

## Phase 2: Test Pipeline (20 minutes)

- [ ] **Create Feature Branch**
  ```bash
  git checkout develop
  git pull origin develop
  git checkout -b test/ci-cd-test
  ```

- [ ] **Make Small Change**
  - Edit README.md
  - Add one line
  - Save

- [ ] **Commit & Push**
  ```bash
  git add README.md
  git commit -m "test: verify ci/cd pipeline"
  git push origin test/ci-cd-test
  ```

- [ ] **Create Pull Request**
  - Go to GitHub
  - Click "New Pull Request"
  - Base: `develop`, Compare: `test/ci-cd-test`
  - Submit

- [ ] **Watch Actions Run**
  - Go to: Actions tab
  - Watch workflow execute
  - Should see green checkmarks

- [ ] **Merge to Staging**
  - Approve and merge to `develop`
  - Watch auto-deployment
  - Visit: http://173.249.53.17

- [ ] **Verify Staging Works**
  - Frontend loads? ✅
  - API responds? ✅
  - Login works? ✅

---

## Phase 3: Production Deployment (15 minutes)

- [ ] **Create develop → main PR**
  - Create pull request: `develop` → `main`
  - All checks should pass
  - Approve and merge

- [ ] **Watch Production Deploy**
  - Go to: Actions tab
  - Watch workflow
  - Should see "Deploy to Production" job

- [ ] **Verify Production**
  - Visit: http://173.249.53.17
  - Same as staging but production version
  - All features working? ✅

---

## Phase 4: Backend Cleanup (Optional, 45 minutes)

- [ ] **Review Cleanup Plan**
  - Read: docs/BACKEND_CLEANUP_PLAN.md
  - Understand what's being removed

- [ ] **Create Cleanup Branch**
  ```bash
  git checkout develop
  git pull origin develop
  git checkout -b refactor/backend-cleanup
  ```

- [ ] **Remove Unused Files** (use bash commands in BACKEND_CLEANUP_PLAN.md)
  ```bash
  # Controllers
  rm -f server/src/controllers/auditLog.controller.js
  rm -f server/src/controllers/cart.controller.js
  # ... etc
  ```

- [ ] **Update Route Imports**
  - Already done in: `server/src/routes/index.js`
  - Verify it looks correct

- [ ] **Test Locally**
  ```bash
  cd server
  npm install
  npm test
  npm run dev
  ```

- [ ] **Test Frontend Still Works**
  ```bash
  cd client
  npm run dev
  ```

- [ ] **Commit & Push**
  ```bash
  git add -A
  git commit -m "refactor: remove unused backend components"
  git push origin refactor/backend-cleanup
  ```

- [ ] **Create PR & Merge**
  - Create PR to `develop`
  - Watch tests pass
  - Merge to `develop`

---

## Phase 5: Documentation & Training (30 minutes)

- [ ] **Team Training** (when team members join)
  - Share CICD_QUICK_START.md
  - Show them branching workflow
  - Demo creating feature branch

- [ ] **Update README.md**
  - Add CI/CD badge
  - Link to docs/CICD_QUICK_START.md
  - Example:
    ```markdown
    [![CI/CD](https://github.com/Ghost590-beep/AgroConnect-Cameroon/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Ghost590-beep/AgroConnect-Cameroon/actions)
    ```

- [ ] **Pin Documentation in GitHub**
  - Add link to docs in README
  - Team knows where to find guides

---

## Phase 6: Ongoing Maintenance (Monthly)

- [ ] **Monitor Deployments**
  - Check Actions tab regularly
  - Review failed workflows
  - Fix issues promptly

- [ ] **Review Secrets**
  - Every 3 months: verify secrets still valid
  - Every 6-12 months: rotate SSH keys

- [ ] **Update Dependencies**
  - Monthly: `npm audit`
  - Quarterly: `npm update`
  - Security patches immediately

- [ ] **Check Logs**
  - Weekly: review PM2 logs
  - Check for errors
  - Monitor performance

- [ ] **Backup Database**
  - Daily: automated backups
  - Test restore process monthly
  - Keep offsite backup

---

## 📊 Success Criteria

When everything is working:

- ✅ Create feature branch locally
- ✅ Make changes and commit
- ✅ Push to GitHub
- ✅ CI/CD tests run automatically
- ✅ Merge to `develop` → auto-deploy to staging
- ✅ Merge to `main` → auto-deploy to production
- ✅ No manual SSH commands needed for deployment
- ✅ Team can deploy safely
- ✅ Easy to rollback if needed
- ✅ Clear deployment history

---

## 🚨 If Something Goes Wrong

### Pipeline Not Running
- Check GitHub Actions page
- Verify secrets are set
- Review workflow files in .github/workflows/

### Tests Failing
- Run `npm test` locally
- Check error messages
- Fix code locally first
- Push fix to GitHub

### Deployment Failed
- Check Actions log for error
- SSH into server: `ssh mc@173.249.53.17`
- Run: `pm2 logs`
- Check /var/log/nginx/error.log

### No Changes Showing
- Confirm commit to develop or main
- Check Actions - did it deploy?
- Verify branch is correct
- Check git log: `git log --oneline`

---

## 📞 Quick Help

| Issue | Solution |
|-------|----------|
| "Permission denied" | Check SSH key setup in GITHUB_SECRETS.md |
| "Tests timeout" | Increase timeout in workflow or fix test |
| "Port 5000 in use" | Kill process: `sudo lsof -i :5000` |
| "DB connection failed" | Verify .env file and database is running |
| "Changes not live" | Check merge was to develop/main (not feature branch) |
| "Logs too long" | Run: `pm2 logs --lines 100` |

---

## 📚 Documentation Index

1. **CICD_QUICK_START.md** ← Start here
2. **CI-CD-PIPELINE.md** ← Complete guide
3. **GITHUB_SECRETS.md** ← Security setup
4. **DEPLOYMENT.md** ← Infrastructure
5. **BACKEND_CLEANUP_PLAN.md** ← Optional cleanup
6. **IMPLEMENTATION_SUMMARY.md** ← Overview

---

## ✨ You're Ready!

**Today:**
- [ ] Complete Phase 1 (Setup)
- [ ] Complete Phase 2 (Test)
- [ ] Complete Phase 3 (Production)

**This Week:**
- [ ] Complete Phase 4 (Cleanup - optional)
- [ ] Complete Phase 5 (Documentation)

**Going Forward:**
- [ ] Follow Phase 6 (Maintenance)
- [ ] Use checklist for next deployments

---

**Version:** 1.0  
**Status:** ✅ Ready to Deploy  
**Last Updated:** 2026-06-08

