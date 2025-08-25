@echo off
chcp 65001 >nul
cls
echo ==========================================
echo           AI写作助手 - 快速上传
echo ==========================================
echo.
echo 选择上传方式:
echo.
echo [1] GitHub CLI 自动上传 (推荐)
echo [2] 手动设置
echo [3] 查看详细说明
echo.
set /p choice=请输入数字 (1-3): 

if "%choice%"=="1" goto auto_upload
if "%choice%"=="2" goto manual
if "%choice%"=="3" goto guide
echo 输入无效，请重试
pause
exit

:auto_upload
cls
echo 正在检查 GitHub CLI...
gh --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo GitHub CLI 未安装，正在安装...
    winget install GitHub.cli
    echo.
    echo 安装完成，请重新运行脚本
    pause
    exit
)

echo GitHub CLI 已就绪
echo.
echo 请登录 GitHub 账户...
gh auth login

echo.
echo 创建仓库并上传代码...
gh repo create ai_writer --public --source=. --remote=origin --push

echo.
echo ================================================
echo 上传成功！您的仓库链接将显示在上方
echo ================================================
pause
exit

:manual
cls
echo ===============================================
echo                手动上传步骤
echo ===============================================
echo.
echo 1. 打开浏览器访问: https://github.com/new
echo 2. 仓库名称输入: ai_writer  
echo 3. 选择 Public 或 Private
echo 4. 不要勾选任何初始化选项
echo 5. 点击 "Create repository"
echo.
pause
echo 创建完成后，请输入仓库地址:
set /p url=GitHub仓库URL: 

git remote add origin %url%
git branch -M main
git push -u origin main

echo.
echo 上传完成！
pause
exit

:guide
start notepad GIT_UPLOAD_GUIDE.md
exit
