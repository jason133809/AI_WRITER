@echo off
echo ==========================================
echo        AI写作助手 - GitHub上传助手
echo ==========================================
echo.

echo 请选择上传方式:
echo 1. 使用GitHub CLI (推荐 - 自动化)
echo 2. 手动设置远程仓库
echo 3. 显示完整指南
echo.
set /p choice="请输入选择 (1-3): "

if "%choice%"=="1" goto github_cli
if "%choice%"=="2" goto manual_setup  
if "%choice%"=="3" goto show_guide
goto invalid_choice

:github_cli
echo.
echo 检查GitHub CLI是否已安装...
gh --version >nul 2>&1
if errorlevel 1 (
    echo GitHub CLI未安装，正在安装...
    winget install GitHub.cli
    echo 请重新运行此脚本
    pause
    exit /b
)

echo GitHub CLI已安装
echo 请先登录GitHub账户...
gh auth login

echo.
echo 创建GitHub仓库并上传...
gh repo create ai_writer --public --source=. --remote=origin --push

echo.
echo ✅ 上传完成！
echo 仓库地址将在上面显示
goto end

:manual_setup
echo.
echo 请手动完成以下步骤:
echo.
echo 1. 访问 https://github.com/new
echo 2. 仓库名称填写: ai_writer
echo 3. 选择 Public 或 Private
echo 4. 不要勾选任何初始化选项
echo 5. 点击 "Create repository"
echo.
echo 6. 创建后，复制仓库URL并在下面输入:
set /p repo_url="请输入GitHub仓库URL: "

echo.
echo 添加远程仓库并推送...
git remote add origin %repo_url%
git branch -M main  
git push -u origin main

echo.
echo ✅ 上传完成！
goto end

:show_guide
echo.
echo 打开详细指南文件...
start GIT_UPLOAD_GUIDE.md
goto end

:invalid_choice
echo 无效选择，请重新运行脚本
pause
exit /b

:end
echo.
echo 项目已成功上传到GitHub！
echo 现在可以通过GitHub访问你的AI写作助手项目
pause
