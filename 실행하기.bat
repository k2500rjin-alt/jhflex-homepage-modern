@echo off
setlocal EnableExtensions
title JHFLEX Local Development Server

cd /d "%~dp0"

echo.
echo ==============================================
echo   JHFLEX Local Development Server
echo ==============================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js가 설치되어 있지 않습니다.
  echo Node.js LTS 설치 후 이 파일을 다시 실행해 주세요.
  echo https://nodejs.org/
  echo.
  pause
  exit /b 1
)

where pnpm >nul 2>nul
if errorlevel 1 (
  where corepack >nul 2>nul
  if errorlevel 1 (
    echo [ERROR] pnpm과 Corepack을 모두 찾을 수 없습니다.
    echo Node.js LTS를 설치한 뒤 이 파일을 다시 실행해 주세요.
    echo https://nodejs.org/
    echo.
    pause
    exit /b 1
  )
  echo [INFO] 전역 pnpm 없이 Corepack pnpm을 사용합니다.
  set "PACKAGE_MANAGER=corepack pnpm"
) else (
  set "PACKAGE_MANAGER=pnpm"
)

if not exist "node_modules\.pnpm" (
  echo [INFO] 첫 실행입니다. 필요한 패키지를 설치합니다.
  call %PACKAGE_MANAGER% install
  if errorlevel 1 (
    echo.
    echo [ERROR] 패키지 설치에 실패했습니다. 인터넷 연결을 확인해 주세요.
    pause
    exit /b 1
  )
)

echo.
echo [INFO] 브라우저가 자동으로 열리면 JHFLEX 미리보기입니다.
echo [INFO] 서버를 종료하려면 이 창에서 Ctrl+C를 누르세요.
echo.
call %PACKAGE_MANAGER% dev -- --open

echo.
echo [INFO] 개발 서버가 종료되었습니다.
pause
