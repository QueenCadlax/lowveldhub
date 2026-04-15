# ⚡ Quick Git Setup — LowveldHub

**TL;DR Version for Git & GitHub**

---

## 🚀 Run This (Pick One Method)

### Method 1: PowerShell (Easiest)
```powershell
cd "c:\Users\CC CHITONGA\Desktop\s.lowveldhub - Copy - Copy (3) - Copy - Copy"
.\git-init.ps1
```
✅ Most user-friendly, shows all steps with checkmarks

### Method 2: Batch File
```bash
git-init.bat
```
✅ Double-click or run in cmd

### Method 3: Manual (Copy-Paste)
```bash
cd "c:\Users\CC CHITONGA\Desktop\s.lowveldhub - Copy - Copy (3) - Copy - Copy"
git init
git config user.name "snchitonga"
git config user.email "YOUR_EMAIL@example.com"
git add .
git commit -m "Initial commit: LowveldHub"
git branch -M main
git remote add origin https://github.com/snchitonga/Lowveldhub.git
git push -u origin main
```

---

## ⚠️ Important: Update Email First!

Before running any script:

1. **PowerShell:** Edit `git-init.ps1`, find line with `your-email@example.com`, replace with **your actual GitHub email**
2. **Batch:** Edit `git-init.bat`, find line with `your-email@example.com`, replace with **your actual GitHub email**
3. **Manual:** Replace `YOUR_EMAIL@example.com` with your GitHub email above

---

## 🔑 GitHub Authentication

**If asked for password:**
1. Don't use your GitHub password
2. Use GitHub CLI instead:
   ```bash
   winget install gh
   gh auth login
   ```
3. Or create Personal Access Token at: https://github.com/settings/tokens

---

## ✅ When It Works

You'll see:
```
✓ Repository URL: https://github.com/snchitonga/Lowveldhub.git
✓ Branch: main
✓ Files tracked: 250+
✓ Git setup complete!
```

Then visit: https://github.com/snchitonga/Lowveldhub

---

## 🎯 What Gets Uploaded

✅ All project files (App.tsx, components, data, etc.)  
✅ All documentation (*.md files)  
✅ Configuration files (vite.config.ts, tsconfig.json, etc.)  
✅ package.json and package-lock.json  

❌ node_modules (too large, auto-installed)  
❌ dist (build output, auto-generated)  
❌ .env.local (keep secret!)  

---

## 📊 Expected Result

**Your GitHub repo will have:**
- 250+ files
- 1 commit
- main branch
- Ready for Vercel deployment

**Size:** ~2-3 MB (excluding node_modules)

---

## 🆘 Common Issues

| Error | Fix |
|-------|-----|
| `git: command not found` | Install Git: https://git-scm.com/download/win |
| `fatal: Authentication failed` | Run `gh auth login` or use PAT |
| `fatal: remote origin already exists` | Run: `git remote set-url origin https://github.com/snchitonga/Lowveldhub.git` |
| `error: failed to push` | Run: `git pull origin main --allow-unrelated-histories` |

---

## 🚀 After Push: Vercel Deployment

1. Go to: https://vercel.com/new
2. Select your repository
3. Add `GEMINI_API_KEY` env var
4. Deploy!

**Total time: 5-10 minutes**

---

## 📚 Full Guides

- Detailed steps: `GIT_GITHUB_SETUP_GUIDE.md`
- Deployment: `DEPLOYMENT_FINAL_REPORT.md`
- Troubleshooting: `GIT_GITHUB_SETUP_GUIDE.md` → Troubleshooting section

---

**Status:** ✅ Ready to push!
