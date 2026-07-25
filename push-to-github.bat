@echo off
echo ========================================
echo  Sign Flow - Push to GitHub
echo ========================================
echo.

cd /d "%~dp0"

echo Step 1: Checking git status...
git status
echo.

echo Step 2: You need to authenticate with GitHub first
echo.
echo Please choose an authentication method:
echo.
echo 1. GitHub CLI (Recommended) - Run: gh auth login
echo 2. Personal Access Token - Get from: https://github.com/settings/tokens
echo.

set /p auth="Have you authenticated with GitHub? (y/n): "

if /i "%auth%"=="n" (
    echo.
    echo Please authenticate first:
    echo   Option 1: Run "gh auth login" in a new terminal
    echo   Option 2: Get a token from https://github.com/settings/tokens
    echo.
    pause
    exit
)

echo.
echo Step 3: Pushing to GitHub...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo  SUCCESS! Code pushed to GitHub!
    echo ========================================
    echo.
    echo Your repository: https://github.com/ziadabdelader-lgtm/sign-flow
    echo.
    echo Next steps:
    echo 1. Go to https://vercel.com
    echo 2. Click "New Project"
    echo 3. Import your GitHub repository
    echo 4. Add environment variables from .env.local
    echo 5. Deploy!
    echo.
) else (
    echo.
    echo ========================================
    echo  AUTHENTICATION FAILED
    echo ========================================
    echo.
    echo Please try one of these methods:
    echo.
    echo Method 1 - GitHub CLI:
    echo   1. Install: winget install GitHub.cli
    echo   2. Login: gh auth login
    echo   3. Run this script again
    echo.
    echo Method 2 - Personal Access Token:
    echo   1. Go to: https://github.com/settings/tokens
    echo   2. Generate new token (classic)
    echo   3. Select 'repo' scope
    echo   4. Copy the token
    echo   5. Run: git remote set-url origin https://YOUR_TOKEN@github.com/ziadabdelader-lgtm/sign-flow.git
    echo   6. Run this script again
    echo.
)

pause
