@echo off
echo 启动AI写作助手开发服务器...
set PATH=%PATH%;"C:\Program Files\nodejs"
cd /d d:\project\ai_writer
rmdir /s /q .next 2>nul
"C:\Program Files\nodejs\npm.cmd" run dev
pause
