@echo off
setlocal
set "APP_PATH=%~dp0index.html"
for %%I in ("%APP_PATH%") do set "APP_URL=file:///%%~fI"
set "APP_URL=%APP_URL:\=/%"

if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
  start "Happy scan" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --start-fullscreen --disable-pinch --no-first-run "%APP_URL%"
  exit /b 0
)

if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
  start "Happy scan" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" --start-fullscreen --disable-pinch --no-first-run "%APP_URL%"
  exit /b 0
)

if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
  start "Happy scan" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --start-fullscreen --disable-pinch --no-first-run "%APP_URL%"
  exit /b 0
)

if exist "%LocalAppData%\Google\Chrome\Application\chrome.exe" (
  start "Happy scan" "%LocalAppData%\Google\Chrome\Application\chrome.exe" --start-fullscreen --disable-pinch --no-first-run "%APP_URL%"
  exit /b 0
)

start "Happy scan" "%APP_PATH%"
exit /b 0
