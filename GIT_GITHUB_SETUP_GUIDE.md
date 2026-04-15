# 🚀 Git & GitHub Setup Guide — LowveldHub

**Date:** April 15, 2026  
**Project:** LowveldHub Luxury B2B Directory  
**Repository:** https://github.com/snchitonga/Lowveldhub.git  
**Status:** Ready to Initialize

---

## 📋 What We're Doing

This guide will help you:
1. ✅ Initialize Git in your local project
2. ✅ Add all project files (excluding node_modules, dist, etc.)
3. ✅ Create initial commit
4. ✅ Connect to GitHub repository
5. ✅ Push code to main branch

---

## 🔧 Prerequisites

Before you start, ensure:
- [ ] Git is installed on your system
  - Check: `git --version` (should show version 2.30+)
  - If not installed: Download from https://git-scm.com/download/win
- [ ] You have a GitHub account
  - Visit: https://github.com
  - Create account if needed
- [ ] Repository exists on GitHub
  - URL: https://github.com/snchitonga/Lowveldhub.git
  - Should be **empty** (no README yet)
- [ ] GitHub authentication is set up
  - Recommended: GitHub CLI (`gh auth login`)
  - Alternative: Personal Access Token

---

## ⚙️ Option 1: PowerShell Script (Recommended)

This is the easiest method with detailed output.

### Step 1: Update Git Email
Edit the PowerShell script to use your actual GitHub email:

```powershell
# Open git-init.ps1 in your editor and find this line:
$GitUserEmail = "your-email@example.com"

# Replace with your GitHub email:
$GitUserEmail = "your.email@example.com"
```

### Step 2: Run the Script
In PowerShell, navigate to the project folder and run:

```powershell
cd "c:\Users\CC CHITONGA\Desktop\s.lowveldhub - Copy - Copy (3) - Copy - Copy"

# Allow execution of scripts (one-time)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process

# Run the script
.\git-init.ps1
```

### Step 3: Authenticate (if prompted)
If Git asks to authenticate:
- A browser window may open
- Log in to GitHub
- Authorize the connection
- Return to PowerShell

### Step 4: Verify
Script will show:
```
✓ Repository URL: https://github.com/snchitonga/Lowveldhub.git
✓ Branch: main
✓ Commits: 1
✓ Files tracked: 250+
```

---

## ⚙️ Option 2: Batch File

If PowerShell doesn't work, use the batch file:

### Step 1: Edit Email
Open `git-init.bat` and find:
```batch
git config user.email "your-email@example.com"
```
Replace with your email.

### Step 2: Run
Double-click `git-init.bat` or run in Command Prompt:
```bash
git-init.bat
```

### Step 3: Follow Prompts
The script will show all steps and pause at the end for you to verify.

---

## ⚙️ Option 3: Manual Commands (Step-by-Step)

If you prefer more control, run these commands in PowerShell:

### 1. Navigate to Project
```powershell
cd "c:\Users\CC CHITONGA\Desktop\s.lowveldhub - Copy - Copy (3) - Copy - Copy"
```

### 2. Initialize Git
```bash
git init
```
**Expected:** `Initialized empty Git repository in ...`

### 3. Configure User
```bash
git config user.name "snchitonga"
git config user.email "your-email@example.com"
```
Replace email with your GitHub email.

### 4. Verify .gitignore
```bash
cat .gitignore
```
**Expected:** Should show exclusions for node_modules, dist, .local, etc.

### 5. Add All Files
```bash
git add .
```

### 6. Check Status
```bash
git status
```
**Expected:** Shows all files staged for commit (250+)

### 7. Create Initial Commit
```bash
git commit -m "Initial commit: LowveldHub production-ready project"
```
**Expected:** Lists files added and create mode for files

### 8. Set Branch to Main
```bash
git branch -M main
```
**Expected:** No output (successful)

### 9. Add Remote
```bash
git remote add origin https://github.com/snchitonga/Lowveldhub.git
```
**Expected:** No output (successful)

### 10. Verify Remote
```bash
git remote -v
```
**Expected:** Shows:
```
origin  https://github.com/snchitonga/Lowveldhub.git (fetch)
origin  https://github.com/snchitonga/Lowveldhub.git (push)
```

### 11. Push to GitHub
```bash
git push -u origin main
```
**Expected:** Either success or prompt for authentication

---

## 🔐 GitHub Authentication

### If You Get: `fatal: Authentication failed`

**Solution 1: Use GitHub CLI (Recommended)**
```bash
# Install GitHub CLI
winget install gh

# Authenticate
gh auth login

# Follow prompts to select HTTPS and login via browser
# Then try pushing again
git push -u origin main
```

**Solution 2: Use Personal Access Token**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Select scopes: `repo` (full control of private repositories)
4. Click "Generate token"
5. Copy the token
6. When asked for password during `git push`, paste the token

**Solution 3: Use SSH Key (Advanced)**
1. Generate SSH key: `ssh-keygen -t ed25519 -C "your-email@example.com"`
2. Add to GitHub: https://github.com/settings/keys
3. Change remote: `git remote set-url origin git@github.com:snchitonga/Lowveldhub.git`
4. Try pushing again

---

## 📊 Expected Output

### After Successful Push:
```
========================================
Summary:
========================================

  Repository URL: https://github.com/snchitonga/Lowveldhub.git
  Branch: main
  Commits: 1
  Files tracked: 250+

✓ Git setup complete!

Next steps:
1. Visit: https://github.com/snchitonga/Lowveldhub.git
2. Verify your code is there
3. Set up deployment in Vercel
```

### Check GitHub
Visit: https://github.com/snchitonga/Lowveldhub
You should see:
- ✅ All project files
- ✅ `main` branch
- ✅ 1 commit "Initial commit: LowveldHub..."
- ✅ .gitignore configured

---

## ✅ Verification Checklist

After push completes:

- [ ] Visit GitHub repository
- [ ] Verify all files are present
- [ ] Check branch is `main`
- [ ] Verify no `node_modules/` folder
- [ ] Verify no `dist/` folder
- [ ] Verify `.env.local` not uploaded (only `.env.example`)
- [ ] See commit message with project description
- [ ] Can see file count (250+)

---

## 🆘 Troubleshooting

### Error: `fatal: destination path already exists and is not an empty directory`
**Cause:** Git already initialized  
**Solution:** Git is already set up! Just push:
```bash
git push -u origin main
```

### Error: `fatal: remote origin already exists`
**Cause:** Remote was already added  
**Solution:** Update it:
```bash
git remote set-url origin https://github.com/snchitonga/Lowveldhub.git
git push -u origin main
```

### Error: `error: failed to push some refs to`
**Cause:** Remote has commits that local doesn't  
**Solution:**
```bash
# Pull first
git pull origin main --allow-unrelated-histories

# Then push
git push -u origin main
```

### Error: `Authentication failed` or `403 Forbidden`
**Cause:** GitHub credentials not set up  
**Solution:** Use GitHub CLI:
```bash
winget install gh
gh auth login
# Login via browser, then try again
```

### Command Not Found: `git`
**Cause:** Git not installed  
**Solution:** Install from https://git-scm.com/download/win

---

## 🔄 Future Workflow

After initial setup, your workflow will be:

```bash
# Make changes to files
# Then commit and push:

git status                    # See what changed
git add .                     # Stage changes
git commit -m "Your message"  # Commit
git push                      # Push to GitHub
```

---

## 📝 Files Involved

**Created by setup:**
- ✅ `.git/` - Git internal folder (auto-created)
- ✅ `.gitignore` - Already exists (exclusions configured)
- ✅ `git-init.ps1` - PowerShell script
- ✅ `git-init.bat` - Batch script

**NOT uploaded to GitHub:**
- ❌ `node_modules/` - Excluded by .gitignore
- ❌ `dist/` - Excluded by .gitignore
- ❌ `.env.local` - Excluded by .gitignore (only `.env.example`)
- ❌ `.vscode/settings.json` - Excluded by .gitignore

---

## 🎯 Next Steps After Push

1. ✅ **Verify GitHub:** Visit https://github.com/snchitonga/Lowveldhub
2. 📦 **Set up Vercel:**
   - Visit https://vercel.com/new
   - Select repository
   - Follow deployment guide
3. 🔑 **Add Environment Variables in Vercel:**
   - `GEMINI_API_KEY` = your key
4. 🚀 **Deploy:** Click Deploy button
5. 🌐 **Go Live:** Visit your live site!

---

## ✨ Summary

| Step | Action | Status |
|------|--------|--------|
| 1 | Initialize Git | ✅ Ready |
| 2 | Configure User | ✅ Script ready |
| 3 | Add Files | ✅ .gitignore configured |
| 4 | Create Commit | ✅ Script ready |
| 5 | Set Branch | ✅ Script ready |
| 6 | Add Remote | ✅ Script ready |
| 7 | Push to GitHub | ✅ Script ready |

**Status:** All systems ready for Git initialization and push!

---

**Need Help?** Refer to troubleshooting section or contact GitHub support at https://support.github.com
