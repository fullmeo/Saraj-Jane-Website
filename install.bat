@echo off
setlocal enabledelayedexpansion

echo ============================================
echo  Sarah Jane Iffra Website - Installer
echo ============================================
echo.

:: Check for Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH.
    echo Please install Node.js ^(^>= 16.0.0^) from https://nodejs.org/
    pause
    exit /b 1
)

:: Check Node.js version
for /f "tokens=1 delims=v" %%i in ('node -v') do set NODE_VERSION_RAW=%%i
for /f "tokens=1 delims=v" %%i in ('node -v') do set NODE_VERSION=%%i
for /f "tokens=1 delims=." %%i in ("!NODE_VERSION:~1!") do set NODE_MAJOR=%%i

if !NODE_MAJOR! lss 16 (
    echo [ERROR] Node.js version 16 or higher is required.
    echo Current version:
    node -v
    echo Please upgrade Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js found:
node -v

:: Check for npm
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed or not in PATH.
    pause
    exit /b 1
)

:: Check npm version
for /f "tokens=1 delims=." %%i in ('npm -v') do set NPM_MAJOR=%%i
if !NPM_MAJOR! lss 7 (
    echo [ERROR] npm version 7 or higher is required.
    echo Current version:
    npm -v
    echo Please upgrade npm by running: npm install -g npm
    pause
    exit /b 1
)

echo [OK] npm found:
npm -v
echo.

:: Install dependencies
echo Installing dependencies...
echo.
call npm install
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] npm install failed. See output above for details.
    pause
    exit /b 1
)

echo.
echo ============================================
echo  Installation complete!
echo ============================================
echo.
echo To start the development server, run:
echo   npm start
echo.
echo To build for production, run:
echo   npm run build
echo.
pause
