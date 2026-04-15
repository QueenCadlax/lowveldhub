@echo off
REM Git initialization and push script
REM Navigate to project directory
cd /d "c:\Users\CC CHITONGA\Desktop\s.lowveldhub - Copy - Copy (3) - Copy - Copy"

REM Check if git is initialized
if exist .git (
    echo Git is already initialized
) else (
    echo Initializing Git repository...
    git init
)

REM Configure git user (use your GitHub username and email)
echo Configuring Git user...
git config user.name "snchitonga"
git config user.email "your-email@example.com"

REM Add all files
echo Adding all files to staging area...
git add .

REM Show status
echo Current Git status:
git status

REM Create initial commit
echo Creating initial commit...
git commit -m "Initial commit: LowveldHub production-ready project"

REM Rename branch to main if needed
echo Checking branch name...
git branch -M main

REM Add remote origin
echo Adding remote repository...
git remote add origin https://github.com/snchitonga/Lowveldhub.git

REM Show remotes
echo Remote repositories:
git remote -v

REM Push to GitHub
echo Pushing to GitHub...
git push -u origin main

echo.
echo ==================================================
echo Git initialization and push complete!
echo ==================================================
pause
