#!/bin/bash

echo "Removing distribution folder"
rm -rf ../dist

echo "Recreating distribution folder"
mkdir ../dist
mkdir ../dist/js
mkdir ../dist/css
cp -R ../img/ ../dist/img/
cp -R ../fonts/ ../dist/fonts/

echo "Copying .htaccess file"
cp ../.htaccess ../dist/.htaccess

echo "Minifying index.html"
java -jar htmlcompressor.jar -c utf-8 --compress-js --compress-css -o ../dist/index.html ../index.html

echo "Combining CSS manually (since YUI can't seem to get that part right)"
cat ../css/bootstrap.css ../css/bootstrap-responsive.css ../css/style.css>../dist/css/combined-style.css

echo "Minifying CSS"
java -jar yuicompressor.jar --type css --charset utf-8 -o ../dist/css/combined-style.css ../dist/css/combined-style.css

echo "Minifying JS"
java -jar compiler.jar --js ../js/bootstrap-carousel.js ../js/bootstrap-modal.js ../js/bootstrap-tooltip.js ../js/jquery.scrollTo.min.js ../js/waypoints.min.js ../js/jquery.fitvids.js ../js/general.js --js_output_file ../dist/js/combined-scripts.js
java -jar compiler.jar --js ../js/css3-mediaqueries.js --js_output_file ../dist/js/css3-mediaqueries.js
