@echo off
chcp 65001 >nul
echo =========================================
echo     AI Writer - Quick GitHub Upload
echo =========================================
echo.
echo This will automatically upload your project to GitHub
echo Make sure you have a GitHub account ready
echo.
pause

echo Checking GitHub CLI...
gh --version >nul 2>&1
if errorlevel 1 (
    echo Installing GitHub CLI...
    winget install GitHub.cli
    echo Please run this script again after installation
    pause
    exit
)

echo Logging into GitHub...
gh auth login

echo Creating repository and uploading...
gh repo create ai_writer --public --source=. --remote=origin --push

echo.
echo SUCCESS! Your AI Writer project is now on GitHub!
echo Check the repository URL displayed above
pause
