echo 开始部署
# 获取最新版代码
rm -rf /root/data/app/blog_project/docs/note/*
cd /root/data/app/note
git pull
cp -r /root/data/app/note/* /root/data/app/blog_project/docs/note
cd /root/data/app/blog_project
npm run docs:build
echo 完成部署
