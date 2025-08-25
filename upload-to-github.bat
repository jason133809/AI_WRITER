@echo off
chcp 65001 >nul
echo ==========================================
echo        AI Writer - GitHub Upload Helper
echo ==========================================
echo.

echo Please select upload method:
echo 1. Use GitHub CLI (Recommended - Automated)
echo 2. Manual remote repository setup
echo 3. Show complete guide
echo.
set /p choice="Please enter your choice (1-3): "

if "%choice%"=="1" goto github_cli
if "%choice%"=="2" goto manual_setup  
if "%choice%"=="3" goto show_guide
goto invalid_choice

:github_cli
echo.
echo Checking if GitHub CLI is installed...
gh --version >nul 2>&1
if errorlevel 1 (
    echo GitHub CLI not installed, installing...
    winget install GitHub.cli
    echo Please run this script again
    pause
    exit /b
)

echo GitHub CLI is installed
echo Please login to your GitHub account first...
gh auth login

echo.
echo Creating GitHub repository and uploading...
gh repo create ai_writer --public --source=. --remote=origin --push

echo.
echo Success! Upload completed!
echo Repository URL will be displayed above
goto end

:manual_setup
echo.
echo Please complete the following steps manually:
echo.
echo 1. Visit https://github.com/new
echo 2. Repository name: ai_writer
echo 3. Select Public or Private
echo 4. Do not check any initialization options
echo 5. Click "Create repository"
echo.
echo 6. After creation, copy the repository URL and enter below:
set /p repo_url="Please enter GitHub repository URL: "

echo.
echo Adding remote repository and pushing...
git remote add origin %repo_url%
git branch -M main  
git push -u origin main

echo.
echo Success! Upload completed!
goto end

:show_guide
echo.
echo Opening detailed guide file...
start GIT_UPLOAD_GUIDE.md
goto end

:invalid_choice
echo Invalid choice, please run the script again
pause
exit /b

:end
echo.
echo Project successfully uploaded to GitHub!
echo You can now access your AI Writer project through GitHub
pause
