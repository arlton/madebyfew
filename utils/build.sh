#!/bin/bash

echo "Removing distribution folder"
rm -rf ../dist

echo "Recreating distribution folder"
mkdir ../dist
mkdir ../dist/js
mkdir ../dist/css
mkdir ../dist/inc
cp -R ../img/ ../dist/img/
cp -R ../inc/ ../dist/inc/
cp -R ../fonts/ ../dist/fonts/

echo "Copying .htaccess file"
cp ../.htaccess ../dist/.htaccess

echo "Copying index.html"
cp ../index.html ../dist/index.html

echo "Updating index.html script references"
sed -i "" 's/<script type\=\"text\/javascript\" src\=\"js\/css3-mediaqueries\.js\"><\/script>//g' ../dist/index.html
sed -i "" 's/<script type\=\"text\/javascript\" src\=\"js\/jquery\.js\"><\/script>//g' ../dist/index.html

echo "Minifying index.html"
java -jar htmlcompressor.jar -c utf-8 --compress-js --compress-css -o ../dist/index.html ../dist/index.html

while [ "$1" != "" ]; do
    case $1 in
        -l | --less )           
            echo "Compiling LESS"
            lessc ../less/style.less ../css/style.css
    esac
    shift
done

echo "Minifying CSS"
java -jar yuicompressor.jar --type css --charset utf-8 -o ../dist/css/style.css ../css/style.css

echo "Minifying JS"
java \
    -jar compiler.jar \
    --js \
            ../js/css3-mediaqueries.js \
            ../js/jquery.js \
            ../js/bootstrap-carousel.js \
            ../js/bootstrap-modal.js \
            ../js/bootstrap-tooltip.js \
            ../js/jquery.scrollTo.min.js \
            ../js/jquery.stellar.js \
            ../js/waypoints.min.js \
            ../js/jquery.easing.1.3.js \
            ../js/jquery.fitvids.js \
            ../js/jquery.fullscreen.js \
            ../js/jquery.wipetouch.js \
            ../js/general.js \
    --js_output_file \
            ../dist/js/combined-scripts.js
