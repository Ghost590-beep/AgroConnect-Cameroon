# 🎯 AgroConnect CI/CD Setup - Quick Start Guide

## 📌 What's New

Your project now has a complete CI/CD pipeline set up! The main pipeline file is located at `.github/workflows/simple-ci.yml`.

### ✅ New Files Created

```
.github/workflows/
├── ci-cd.yml                 # Main CI/CD pipeline
└── code-quality.yml          # Code quality & security checks

docs/
├── CI-CD-PIPELINE.md         # Complete CI/CD guide
├── BACKEND_CLEANUP_PLAN.md   # Remove unused backend code
├── GITHUB_SECRETS.md         # GitHub secrets setup
└── DEPLOYMENT.md             # Server deployment guide (updated)

server/src/routes/
└── index.js                  # Updated - removed unused routes
```

---

## 🚀 Quick Start (5 Steps)

### Step 1: Set Up GitHub Secrets

Go to: https://github.com/Ghost590-beep/AgroConnect-Cameroon/settings/secrets/actions

Add these secrets:
```
PROD_SERVER_HOST = 173.249.53.17
PROD_SERVER_USER = mc
PROD_SERVER_SSH_KEY = (your SSH private key)
STAGING_SERVER_HOST = 173.249.53.17
STAGING_SERVER_USER = mc
STAGING_SERVER_SSH_KEY = (your SSH private key)
```

👉 **See:** [GITHUB_SECRETS.md](./GITHUB_SECRETS.md)

### Step 2: Create Feature Branch

```bash
git checkout develop
git pull origin develop
git checkout -b feat/your-feature-name
```

### Step 3: Make Changes & Test Locally

```bash
# Frontend
cd client
npm run dev

# Backend (in another terminal)
cd server
npm run dev

# Run tests
npm test
```

### Step 4: Commit & Push

```bash
git add .
git commit -m "feat: describe changes"
git push origin feat/your-feature-name
```

### Step 5: Create Pull Request

- Go to GitHub
- Click "New Pull Request"
- Base: `develop`, Compare: `feat/your-feature-name`
- CI/CD runs automatically ✅

---

## 📊 What Happens Next

### When You Push to Your Branch

✅ Tests run (backend & frontend)  
✅ Linting checks code style  
✅ Build step compiles everything  
✅ Security scans detect vulnerabilities  
✅ Comments appear on your PR

### When You Merge to `develop`

✅ All checks pass  
✅ **Deploys to STAGING** automatically  
✅ http://173.249.53.17 gets updated  
✅ Test there before production  

### When You Merge `develop` → `main`

✅ All checks pass  
✅ **Deploys to PRODUCTION** automatically  
✅ http://173.249.53.17 updated (production version)  

---

## 🧹 Backend Cleanup (Optional but Recommended)

Your backend has many unused features. To clean up:

👉 **See:** [BACKEND_CLEANUP_PLAN.md](./BACKEND_CLEANUP_PLAN.md)

This removes:
- 13 unused controllers
- 13 unused routes
- 14 unused services
- 13 unused validators

**Result:** Cleaner, faster, easier to maintain

---

## 📚 Documentation

Read these guides in order:

1. **[CI-CD-PIPELINE.md](./CI-CD-PIPELINE.md)** ← Start here!
   - How branching works
   - Workflow steps
   - Troubleshooting

2. **[DEPLOYMENT.md](./DEPLOYMENT.md)** ← For deployment
   - Server setup
   - PM2 configuration
   - Nginx setup
   - Monitoring

3. **[GITHUB_SECRETS.md](./GITHUB_SECRETS.md)** ← For security
   - SSH key generation
   - Adding secrets to GitHub
   - Key rotation

4. **[BACKEND_CLEANUP_PLAN.md](./BACKEND_CLEANUP_PLAN.md)** ← For cleanup
   - Which files to remove
   - Why to remove them
   - How to do it safely

---

## 🔄 Typical Workflow

```
1. Create feature branch
   git checkout -b feat/something

2. Make changes

3. Test locally
   npm test

4. Push branch
   git push origin feat/something

5. Create PR on GitHub
   (GitHub Actions runs tests)

6. Approve & merge to develop
   (Automatic deploy to staging)

7. Test on staging
   http://173.249.53.17

8. Create PR: develop → main
   (GitHub Actions runs tests)

9. Approve & merge to main
   (Automatic deploy to production!)

10. Check production
    http://173.249.53.17
```

---

## 🐛 Common Issues

### "Deployment failed" in GitHub Actions

→ Check your SSH keys in GitHub Secrets  
→ Verify server firewall allows SSH  
→ Run `pm2 status` on server

### "Tests failing but code looks good"

→ Run tests locally: `npm test`  
→ Make sure `.env` file exists  
→ Check Node.js version: `node -v` (should be 18+)

### "Changes not deploying"

→ Make sure you merged to `develop` (staging) or `main` (production)  
→ Check GitHub Actions logs: https://github.com/Ghost590-beep/AgroConnect-Cameroon/actions

---

## ✅ Deployment Checklist

Before merging to `main`:

- [ ] All tests pass locally
- [ ] All GitHub Actions checks pass ✅
- [ ] Code reviewed and approved
- [ ] Tested on staging (develop branch)
- [ ] No console errors
- [ ] Database migrations complete
- [ ] .env files configured on server

---

## 🎓 Learning Resources

- [Git Branching Workflow](https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [CI/CD Best Practices](https://en.wikipedia.org/wiki/Continuous_integration)

---

## 📞 Support

### Getting Help

1. Check GitHub Issues: https://github.com/Ghost590-beep/AgroConnect-Cameroon/issues
2. Search existing documentation
3. Read the detailed guides above
4. Ask team members in discussions

### Debugging

```bash
# View GitHub Actions logs
# Go to: Actions tab → Workflow run → Job logs

# View server deployment logs
ssh mc@173.249.53.17
pm2 logs

# Check if services are running
pm2 status

# View Nginx logs
sudo tail -f /var/log/nginx/error.log
```

---

## 🎉 You're All Set!

Your CI/CD pipeline is now configured. Next steps:

1. ✅ Read [CI-CD-PIPELINE.md](./CI-CD-PIPELINE.md)
2. ✅ Set up GitHub Secrets ([GITHUB_SECRETS.md](./GITHUB_SECRETS.md))
3. ✅ Create your first feature branch
4. ✅ Push and watch CI/CD work!

---

**Version:** 1.0  
**Last Updated:** 2026-06-08  
**Status:** Ready for Production ✅

