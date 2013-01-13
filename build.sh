rm -R dist/*
cp -R css dist
cp -R img dist
cp -R js dist
cp manifest.json dist

zip urlparams.zip dist/*
zip urlparams.zip dist/*/*

rm -R dist/*
mv urlparams.zip dist/.
ls -la dist/urlparams.zip

