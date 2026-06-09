# 🔐 GitHub Secrets Configuration Guide

## Overview

GitHub Secrets store sensitive information securely for use in CI/CD workflows. Never commit credentials, API keys, or sensitive data to GitHub!

---

## 📋 Required Secrets

For the AgroConnect CI/CD pipeline, configure these secrets in your GitHub repository:

### Production Deployment Secrets

```
PROD_SERVER_HOST        = 173.249.53.17
PROD_SERVER_USER        = mc
PROD_SERVER_SSH_KEY     = (SSH private key for server access)
```

### Staging Deployment Secrets (Optional)

```
STAGING_SERVER_HOST     = 173.249.53.17
STAGING_SERVER_USER     = mc
STAGING_SERVER_SSH_KEY  = (SSH private key for server access)
```

---

## 🔑 How to Generate SSH Keys

### On Your Local Machine

```bash
# Generate SSH key pair (if you don't have one)
ssh-keygen -t rsa -b 4096 -f ~/.ssh/agroconnect_deploy -C "agroconnect-ci"

# This creates:
# ~/.ssh/agroconnect_deploy        (PRIVATE KEY - secret)
# ~/.ssh/agroconnect_deploy.pub    (PUBLIC KEY - shared)
```

### Copy Private Key for GitHub Secret

```bash
# Display the PRIVATE key (never share this with anyone except GitHub!)
cat ~/.ssh/agroconnect_deploy
```

Save this output for the `PROD_SERVER_SSH_KEY` secret.

### Add Public Key to Server

```bash
# SSH into your production server
ssh mc@173.249.53.17

# Create .ssh directory if it doesn't exist
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Add your public key to authorized_keys
cat >> ~/.ssh/authorized_keys << EOF
<paste your agroconnect_deploy.pub content here>
EOF

# Set proper permissions
chmod 600 ~/.ssh/authorized_keys
```

---

## 🛠️ Adding Secrets to GitHub

### Step 1: Go to Repository Settings

1. Navigate to: https://github.com/Ghost590-beep/AgroConnect-Cameroon
2. Click **Settings** (top navigation)
3. Left sidebar → **Secrets and variables** → **Actions**

### Step 2: Create Each Secret

Click **"New repository secret"** for each:

#### Secret 1: PROD_SERVER_HOST
- **Name:** `PROD_SERVER_HOST`
- **Value:** `173.249.53.17`
- Click **Add secret**

#### Secret 2: PROD_SERVER_USER
- **Name:** `PROD_SERVER_USER`
- **Value:** `mc`
- Click **Add secret**

#### Secret 3: PROD_SERVER_SSH_KEY
- **Name:** `PROD_SERVER_SSH_KEY`
- **Value:** (Paste the PRIVATE key from `~/.ssh/agroconnect_deploy`)
- Click **Add secret**

#### Secret 4: STAGING_SERVER_HOST (Optional)
- **Name:** `STAGING_SERVER_HOST`
- **Value:** `173.249.53.17`
- Click **Add secret**

#### Secret 5: STAGING_SERVER_USER (Optional)
- **Name:** `STAGING_SERVER_USER`
- **Value:** `mc`
- Click **Add secret**

#### Secret 6: STAGING_SERVER_SSH_KEY (Optional)
- **Name:** `STAGING_SERVER_SSH_KEY`
- **Value:** (Paste the same PRIVATE key or generate a different one)
- Click **Add secret**

---

## ✅ Verification

After adding secrets, verify they're set up:

```bash
# Run a test workflow dispatch
# Go to: https://github.com/Ghost590-beep/AgroConnect-Cameroon/actions

# Look for "CI/CD Pipeline" workflow
# Click "Run workflow" → Branch: "develop" → "Run workflow"

# Monitor the deployment in the workflow logs
```

---

## 🚨 Security Best Practices

### DO ✅
- [ ] Rotate SSH keys every 6-12 months
- [ ] Use strong SSH key passphrases
- [ ] Review which workflows access secrets
- [ ] Audit GitHub Actions audit logs regularly
- [ ] Use separate SSH keys for staging and production
- [ ] Document key rotation procedures

### DON'T ❌
- [ ] Never commit `.env` files or secrets to Git
- [ ] Never share SSH private keys via email or chat
- [ ] Never use secrets in workflow logs
- [ ] Never hardcode secrets in YAML files
- [ ] Never use the same SSH key across multiple servers

---

## 🔄 Key Rotation

Every 6-12 months, rotate your SSH keys:

### On Server

```bash
# Back up old key
cp ~/.ssh/authorized_keys ~/.ssh/authorized_keys.backup

# Remove old key from authorized_keys
# Edit file and remove the old key

# Add new key
echo "new_public_key_content" >> ~/.ssh/authorized_keys
```

### In GitHub

1. Go to Secrets settings
2. Delete old secret
3. Add new secret with new private key

---

## 🐛 Troubleshooting

### "Permission denied (publickey)"

**Problem:** SSH key is not authorized on server

**Solution:**
```bash
# Check if public key is in authorized_keys
ssh mc@173.249.53.17 'cat ~/.ssh/authorized_keys'

# Verify permissions
ssh mc@173.249.53.17 'ls -la ~/.ssh'
# Should show: 700 for .ssh, 600 for authorized_keys
```

### "Could not read SSH key"

**Problem:** Secret not properly formatted

**Solution:**
```bash
# Verify key format
cat ~/.ssh/agroconnect_deploy | wc -l
# Should be ~25-50 lines (RSA 4096-bit key)

# Verify it starts with
# -----BEGIN RSA PRIVATE KEY-----
```

### Workflow Still Using Old Secrets

**Problem:** GitHub caches secrets

**Solution:**
```bash
# Trigger a new workflow run
# Go to Actions → CI/CD Pipeline → "Run workflow"

# Or make a commit that triggers the workflow
git commit --allow-empty -m "trigger ci"
git push
```

---

## 📚 Additional Resources

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)
- [SSH Key Management](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [Actions Security Hardening](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)

---

**Last Updated:** 2026-06-08
