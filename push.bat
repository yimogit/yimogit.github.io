call git pull
call hexo clean
call hexo d -g
call git add *
call git commit -m %1
call git push