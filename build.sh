rm -R dist/*
cp -R css dist
cp -R img dist
cp -R js dist
cp manifest.json dist

zip url-paramter.zip dist/*
zip url-paramter.zip dist/*/*

rm -R dist/*
mv url-paramter.zip dist/.
ls -la dist/url-paramter.zip

