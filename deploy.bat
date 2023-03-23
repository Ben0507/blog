@echo off
echo building...
call build.bat
echo building-complete.
git init
git add -A
git commit -m 'auto-deploy'
git remote add origin https://github.com/Ben0507/blog.git
git pull
git push --force origin HEAD:master
REM To delete the dist folder
echo Auto-Deploy-Complete!
pause