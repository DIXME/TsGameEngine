@echo off
cls
REM Build script for the TypeScript project

REM Compile TypeScript files
echo Compiling TypeScript files...
tsc
if %errorlevel% neq 0 (
    echo Compilation failed. Please check the errors above.
    exit /b 1
)

:: move main to the root dir of public

move ./public/out/main.js ./public/main.js

echo Build completed successfully!
pause
cls