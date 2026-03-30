@echo off
git init
git add .
git commit -m "feat: complete initial authentication & database setup"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/arpit315/AgroConnect.git
git push -u origin main
