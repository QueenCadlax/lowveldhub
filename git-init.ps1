# Git initialization and GitHub push script for LowveldHub
# This script will initialize Git, configure user info, and push to GitHub

param(
    [string]$GitUserName = "snchitonga",
    [string]$GitUserEmail = "your-email@example.com"
)

$projectPath = "c:\Users\CC CHITONGA\Desktop\s.lowveldhub - Copy - Copy (3) - Copy - Copy"
$repoUrl = "https://github.com/snchitonga/Lowveldhub.git"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Git Initialization Script for LowveldHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Navigate to project directory
Write-Host "Step 1: Navigating to project directory..." -ForegroundColor Yellow
Set-Location $projectPath
Write-Host "✓ Current location: $(Get-Location)" -ForegroundColor Green
Write-Host ""

# Step 2: Check if Git is already initialized
Write-Host "Step 2: Checking if Git is already initialized..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "✓ Git repository already exists" -ForegroundColor Green
} else {
    Write-Host "○ Initializing new Git repository..." -ForegroundColor Cyan
    git init
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
}
Write-Host ""

# Step 3: Configure Git user
Write-Host "Step 3: Configuring Git user..." -ForegroundColor Yellow
Write-Host "  User name: $GitUserName" -ForegroundColor Cyan
Write-Host "  User email: $GitUserEmail" -ForegroundColor Cyan
git config user.name $GitUserName
git config user.email $GitUserEmail
Write-Host "✓ Git user configured" -ForegroundColor Green
Write-Host ""

# Step 4: Show .gitignore status
Write-Host "Step 4: Checking .gitignore..." -ForegroundColor Yellow
if (Test-Path ".gitignore") {
    Write-Host "✓ .gitignore exists" -ForegroundColor Green
    Write-Host "  Files to be ignored:" -ForegroundColor Cyan
    Get-Content ".gitignore" | ForEach-Object { if ($_ -and !$_.StartsWith("#")) { Write-Host "    - $_" } }
} else {
    Write-Host "○ .gitignore not found" -ForegroundColor Yellow
}
Write-Host ""

# Step 5: Add all files
Write-Host "Step 5: Adding all files to staging area..." -ForegroundColor Yellow
git add .
$addedFiles = git diff --cached --name-only | Measure-Object -Line
Write-Host "✓ Files staged: $($addedFiles.Lines)" -ForegroundColor Green
Write-Host ""

# Step 6: Show git status
Write-Host "Step 6: Git Status:" -ForegroundColor Yellow
git status --short | Select-Object -First 20
Write-Host ""

# Step 7: Create initial commit
Write-Host "Step 7: Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: LowveldHub production-ready project - Vite, React 19, TypeScript" -m "Includes: 280+ listings, 28 categories, Google Gemini AI integration, Vercel deployment ready"
Write-Host "✓ Initial commit created" -ForegroundColor Green
Write-Host ""

# Step 8: Verify branch name
Write-Host "Step 8: Ensuring main branch..." -ForegroundColor Yellow
$currentBranch = git rev-parse --abbrev-ref HEAD
if ($currentBranch -eq "main") {
    Write-Host "✓ Branch is already 'main'" -ForegroundColor Green
} else {
    Write-Host "○ Renaming branch to 'main'..." -ForegroundColor Cyan
    git branch -M main
    Write-Host "✓ Branch renamed to 'main'" -ForegroundColor Green
}
Write-Host ""

# Step 9: Check if remote already exists
Write-Host "Step 9: Configuring remote repository..." -ForegroundColor Yellow
$remoteExists = git remote | Select-String -Pattern "origin"
if ($remoteExists) {
    Write-Host "○ Remote 'origin' already exists" -ForegroundColor Cyan
    Write-Host "  Current URL: $(git remote get-url origin)" -ForegroundColor Cyan
    Write-Host "○ Updating remote URL to: $repoUrl" -ForegroundColor Cyan
    git remote set-url origin $repoUrl
} else {
    Write-Host "○ Adding new remote 'origin'" -ForegroundColor Cyan
    git remote add origin $repoUrl
}
Write-Host "✓ Remote configured: $repoUrl" -ForegroundColor Green
Write-Host ""

# Step 10: Show remote info
Write-Host "Step 10: Remote repositories:" -ForegroundColor Yellow
git remote -v
Write-Host ""

# Step 11: Push to GitHub
Write-Host "Step 11: Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "  This may require GitHub authentication" -ForegroundColor Cyan
Write-Host "  (VS Code may open a login window)" -ForegroundColor Cyan
git push -u origin main
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Successfully pushed to GitHub!" -ForegroundColor Green
} else {
    Write-Host "✗ Push failed. See error message above." -ForegroundColor Red
    Write-Host "  If you see an authentication error:" -ForegroundColor Yellow
    Write-Host "  1. Set up GitHub CLI: winget install gh" -ForegroundColor Cyan
    Write-Host "  2. Authenticate: gh auth login" -ForegroundColor Cyan
    Write-Host "  3. Try pushing again: git push -u origin main" -ForegroundColor Cyan
}
Write-Host ""

# Step 12: Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
$commitCount = git rev-list --count HEAD
Write-Host "  Repository URL: $repoUrl" -ForegroundColor Green
Write-Host "  Branch: $(git rev-parse --abbrev-ref HEAD)" -ForegroundColor Green
Write-Host "  Commits: $commitCount" -ForegroundColor Green
Write-Host "  Files tracked: $(git ls-files | Measure-Object -Line | Select-Object -ExpandProperty Lines)" -ForegroundColor Green
Write-Host ""
Write-Host "✓ Git setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Visit: https://github.com/snchitonga/Lowveldhub" -ForegroundColor Cyan
Write-Host "2. Verify your code is there" -ForegroundColor Cyan
Write-Host "3. Set up deployment in Vercel" -ForegroundColor Cyan
Write-Host ""
