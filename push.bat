
set artsPath=F:\CodingRepos\ymhexo\arts
set codingPath=F:\CodingRepos\ymhexo\yimocoding
set githubPath=F:\CodingRepos\ymhexo\yimogit.github.io

xcopy %artsPath% %codingPath%\source\_posts /Y
cd /d %codingPath%
call git pull
call hexo clean
call hexo d -g
call git add *
call git commit -m AddArticle
call git push

xcopy %artsPath% %githubPath%\source\_posts /Y

cd /d %githubPath%
call git pull
call hexo clean
call hexo d -g
call git add *
call git commit -m AddArticle
call git push
