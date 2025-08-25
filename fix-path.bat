@echo off
echo 修复Node.js PATH环境变量...

:: 添加Node.js到系统PATH（需要管理员权限）
setx PATH "%PATH%;C:\Program Files\nodejs" /M

:: 添加到当前用户PATH（不需要管理员权限）
setx PATH "%PATH%;C:\Program Files\nodejs"

echo PATH环境变量已更新，请重启命令行工具
pause
