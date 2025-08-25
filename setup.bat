@echo off
echo ====================================
echo    AI 写作助手 - 快速启动脚本
echo ====================================
echo.

REM 检查Node.js是否安装
echo [1/4] 检查Node.js环境...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 未检测到Node.js环境
    echo.
    echo 请先安装Node.js：
    echo 1. 访问 https://nodejs.org/
    echo 2. 下载并安装LTS版本
    echo 3. 重启命令行后重新运行此脚本
    echo.
    echo 或者参考 NODEJS_SETUP.md 文件获取详细安装指南
    pause
    exit /b 1
)
echo ✅ Node.js 环境正常

REM 检查package.json是否存在
echo.
echo [2/4] 检查项目文件...
if not exist "package.json" (
    echo ❌ 未找到package.json文件
    echo 请确保在项目根目录下运行此脚本
    pause
    exit /b 1
)
echo ✅ 项目文件完整

REM 安装依赖
echo.
echo [3/4] 安装项目依赖...
echo 这可能需要几分钟时间，请耐心等待...
npm install
if %errorlevel% neq 0 (
    echo ❌ 依赖安装失败
    echo 请检查网络连接或尝试手动运行: npm install
    pause
    exit /b 1
)
echo ✅ 依赖安装完成

REM 检查环境变量文件
echo.
echo [4/4] 检查环境配置...
if not exist ".env.local" (
    echo ⚠️  未找到.env.local文件
    echo 正在创建环境变量文件...
    copy ".env.example" ".env.local" >nul
    echo.
    echo 📝 请编辑 .env.local 文件，添加你的OpenRouter API Key:
    echo    OPENROUTER_API_KEY=your_actual_api_key_here
    echo.
    echo 获取API Key的方法：
    echo 1. 访问 https://openrouter.ai/
    echo 2. 注册并登录
    echo 3. 在控制台获取免费API Key
    echo.
) else (
    echo ✅ 环境配置文件存在
)

echo.
echo ====================================
echo          🎉 设置完成！
echo ====================================
echo.
echo 下一步操作：
echo 1. 确保 .env.local 中已配置 OpenRouter API Key
echo 2. 运行 'npm run dev' 启动开发服务器
echo 3. 访问 http://localhost:3000 使用应用
echo.
echo 如需帮助，请查看 README.md 文件
echo.
pause
