function loadScript(url)
{
    // adding the script tag to the head as suggested before
   var head = document.getElementsByTagName('head')[0];
   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = url;

   // fire the loading
   head.appendChild(script);
}

loadScript('js/bootstrap.js');
loadScript('js/jquery.scrollTo.min.js');
loadScript('js/jquery.stellar.js');
loadScript('js/waypoints.min.js');
loadScript('js/jquery.easing.1.3.js');
loadScript('js/jquery.fitvids.js');
loadScript('js/jquery.fullscreen.js');
loadScript('js/jquery.wipetouch.js');
$(document).ready(function() {
	loadScript('js/general.js');
});
