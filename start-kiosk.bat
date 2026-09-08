@echo off
setlocal
set "APP_PATH=%~dp0index.html"
for %%I in ("%APP_PATH%") do set "APP_URL=file:///%%~fI"
set "APP_URL=%APP_URL:\=/%"

if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
  start "Happy scan" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --kiosk --edge-kiosk-type=fullscreen --disable-pinch --no-first-run "%APP_URL%"
  exit /b 0
)

if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
  start "Happy scan" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" --kiosk --edge-kiosk-type=fullscreen --disable-pinch --no-first-run "%APP_URL%"
  exit /b 0
)

if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
  start "Happy scan" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --kiosk --disable-pinch --no-first-run "%APP_URL%"
  exit /b 0
)

echo Microsoft Edge or Google Chrome was not found.
echo Run start.bat or open index.html manually.
pause
exit /b 1
