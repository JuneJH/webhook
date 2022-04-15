echo Deploy Project
# 获取最新版代码
cd /root/source/note
git pull
cd /root/source/blog_project/docs
rm -r note
cd ..
npm i
yarn docs:build

