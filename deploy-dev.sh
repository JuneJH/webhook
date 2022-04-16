echo 开始部署
# 获取最新版代码
cd /root/source/note
git pull
cp -r /root/source/note/* /root/source/blog_project/docs/note
cd /root/source/blog_project
yarn docs:build
echo 完成部署
