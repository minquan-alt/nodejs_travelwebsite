# CLONE REPO TO CODE
1. git clone https://github.com/minquan-alt/nodejs_travelwebsite.git
2. npm install
   # download necessary packages
4. npm run prepare
   # prepare husky
5. create file .env in nodejs_travelwebsite and copy environment code in group chat to paste in
6. split terminal:
     + one run:
         npm run watch
       # compile scss folder to css folder 
     + one run:
         npm start
       # start server to load website
7. after finishing coding,type:
     ctrl + C
   to close the server
8. ### if code run OK:
     + git add .
     + git commit -m "abcxyz"
     + git push origin main
   ### if not sure or having bug:
     + git fetch
       # update the newest code files and branches in github with no change
     + git branch -r
       # check whether having the branch that we want to push code
     + git checkout <name_branch>
         ### ex: git checkout test
     + git add .
     + git commit -m "abcxyz"
     + git push origin main:<name_brand>
         ### ex: git push origin main:test
       # push code we just have edited in main branch to "test" branch
