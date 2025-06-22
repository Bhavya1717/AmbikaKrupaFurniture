GitHub Command

# Connect to GitHub and push code (first time setup)
git init
git remote add origin https://github.com/Bhavya1717/CraftsmanCove.git
git add .
git commit -m "{commit_message}"
git push -u origin master

# Just push all code to GitHub repo (after setup)
git add .
git commit -m "{commit_message}"
git push