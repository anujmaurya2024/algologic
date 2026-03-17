@echo off
echo ===================================================
echo   Anti-Gravity AI Full-Stack: One-Click Startup
echo ===================================================

:: Ensure we are in the script directory
cd /d "%~dp0"

echo [1/3] Checking environment...
if not exist "server\.env" (
    echo WARNING: server/.env not found! AI will not work without a Gemini API Key.
    echo Please copy server/.env.example to server/.env and add your key.
)

echo [2/3] Starting Backend & Frontend...
:: Start both in separate windows for easy log viewing
start cmd /k "echo --- BACKEND LOGS --- && cd server && npm install && npm run dev"
start cmd /k "echo --- FRONTEND LOGS --- && cd algo-visualizer && npm install && npm run dev"

echo [3/3] Success! 
echo ---------------------------------------------------
echo 📡 Backend: http://localhost:5000
echo 📡 Frontend: http://localhost:5173
echo ---------------------------------------------------
echo TIP: If this Bat file didn't start correctly in PowerShell,
echo      try typing: .\run.bat
echo ---------------------------------------------------
pause
