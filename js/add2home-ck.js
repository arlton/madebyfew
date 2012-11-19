/*!
 * Add to Homescreen v2.0.4 ~ Copyright (c) 2012 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */var addToHome=function(e){function w(){if(!n)return;var a=Date.now(),f;if(e.addToHomeConfig)for(f in e.addToHomeConfig)y[f]=e.addToHomeConfig[f];y.autostart||(y.hookOnLoad=!1);r=/ipad/gi.test(t.platform);i=e.devicePixelRatio&&e.devicePixelRatio>1;s=/Safari/i.test(t.appVersion)&&!/CriOS/i.test(t.appVersion);o=t.standalone;u=t.appVersion.match(/OS (\d+_\d+)/i);u=u[1]?+u[1].replace("_","."):0;l=+e.localStorage.getItem("addToHome");h=e.sessionStorage.getItem("addToHomeSession");p=y.returningVisitor?l&&l+24192e5>a:!0;l||(l=a);c=p&&l<=a;y.hookOnLoad?e.addEventListener("load",E,!1):!y.hookOnLoad&&y.autostart&&E()}function E(){e.removeEventListener("load",E,!1);p?y.expire&&c&&e.localStorage.setItem("addToHome",Date.now()+y.expire*6e4):e.localStorage.setItem("addToHome",Date.now());if(!v&&(!s||!c||h||o||!p))return;var n=y.touchIcon?document.querySelectorAll("head link[rel=apple-touch-icon],head link[rel=apple-touch-icon-precomposed]"):[],a,f="",l,m=t.platform.split(" ")[0],g=t.language.replace("-","_"),w,x;d=document.createElement("div");d.id="addToHomeScreen";d.style.cssText+="left:-9999px;-webkit-transition-property:-webkit-transform,opacity;-webkit-transition-duration:0;-webkit-transform:translate3d(0,0,0);position:"+(u<5?"absolute":"fixed");if(y.message in b){g=y.message;y.message=""}y.message===""&&(y.message=g in b?b[g]:b.en_us);if(n.length){for(w=0,x=n.length;w<x;w++){a=n[w].getAttribute("sizes");if(a){if(i&&a=="114x114"){f=n[w].href;break}}else f=n[w].href}f='<span style="background-image:url('+f+')" class="addToHomeTouchIcon"></span>'}d.className=(r?"addToHomeIpad":"addToHomeIphone")+(f?" addToHomeWide":"");d.innerHTML=f+y.message.replace("%device",m).replace("%icon",u>=4.2?'<span class="addToHomeShare"></span>':'<span class="addToHomePlus">+</span>')+(y.arrow?'<span class="addToHomeArrow"></span>':"")+'<span class="addToHomeClose">×</span>';document.body.appendChild(d);l=d.querySelector(".addToHomeClose");l&&l.addEventListener("click",N,!1);!r&&u>=6&&window.addEventListener("orientationchange",A,!1);setTimeout(S,y.startDelay)}function S(){var t,n=208;if(r){if(u<5){f=e.scrollY;a=e.scrollX}else u<6&&(n=160);d.style.top=f+y.bottomOffset+"px";d.style.left=a+n-Math.round(d.offsetWidth/2)+"px";switch(y.animationIn){case"drop":t="0.6s";d.style.webkitTransform="translate3d(0,"+ -(e.scrollY+y.bottomOffset+d.offsetHeight)+"px,0)";break;case"bubble":t="0.6s";d.style.opacity="0";d.style.webkitTransform="translate3d(0,"+(f+50)+"px,0)";break;default:t="1s";d.style.opacity="0"}}else{f=e.innerHeight+e.scrollY;if(u<5){a=Math.round((e.innerWidth-d.offsetWidth)/2)+e.scrollX;d.style.left=a+"px";d.style.top=f-d.offsetHeight-y.bottomOffset+"px"}else{d.style.left="50%";d.style.marginLeft=-Math.round(d.offsetWidth/2)-(e.orientation%180&&u>=6?40:0)+"px";d.style.bottom=y.bottomOffset+"px"}switch(y.animationIn){case"drop":t="1s";d.style.webkitTransform="translate3d(0,"+ -(f+y.bottomOffset)+"px,0)";break;case"bubble":t="0.6s";d.style.webkitTransform="translate3d(0,"+(d.offsetHeight+y.bottomOffset+50)+"px,0)";break;default:t="1s";d.style.opacity="0"}}d.offsetHeight;d.style.webkitTransitionDuration=t;d.style.opacity="1";d.style.webkitTransform="translate3d(0,0,0)";d.addEventListener("webkitTransitionEnd",C,!1);g=setTimeout(T,y.lifespan)}function x(e){if(!n||d)return;v=e;E()}function T(){clearInterval(m);clearTimeout(g);g=null;var t=0,n=0,i="1",s="0",o=d.querySelector(".addToHomeClose");o&&o.removeEventListener("click",T,!1);!r&&u>=6&&window.removeEventListener("orientationchange",A,!1);if(u<5){t=r?e.scrollY-f:e.scrollY+e.innerHeight-f;n=r?e.scrollX-a:e.scrollX+Math.round((e.innerWidth-d.offsetWidth)/2)-a}d.style.webkitTransitionProperty="-webkit-transform,opacity";switch(y.animationOut){case"drop":if(r){s="0.4s";i="0";t+=50}else{s="0.6s";t=t+d.offsetHeight+y.bottomOffset+50}break;case"bubble":if(r){s="0.8s";t=t-d.offsetHeight-y.bottomOffset-50}else{s="0.4s";i="0";t-=50}break;default:s="0.8s";i="0"}d.addEventListener("webkitTransitionEnd",C,!1);d.style.opacity=i;d.style.webkitTransitionDuration=s;d.style.webkitTransform="translate3d("+n+"px,"+t+"px,0)"}function N(){e.sessionStorage.setItem("addToHomeSession","1");h=!0;T()}function C(){d.removeEventListener("webkitTransitionEnd",C,!1);d.style.webkitTransitionProperty="-webkit-transform";d.style.webkitTransitionDuration="0.2s";if(!g){d.parentNode.removeChild(d);d=null;return}u<5&&g&&(m=setInterval(k,y.iterations))}function k(){var t=new WebKitCSSMatrix(e.getComputedStyle(d,null).webkitTransform),n=r?e.scrollY-f:e.scrollY+e.innerHeight-f,i=r?e.scrollX-a:e.scrollX+Math.round((e.innerWidth-d.offsetWidth)/2)-a;if(n==t.m42&&i==t.m41)return;d.style.webkitTransform="translate3d("+i+"px,"+n+"px,0)"}function L(){e.localStorage.removeItem("addToHome");e.sessionStorage.removeItem("addToHomeSession")}function A(){d.style.marginLeft=-Math.round(d.offsetWidth/2)-(e.orientation%180&&u>=6?40:0)+"px"}var t=e.navigator,n="platform"in t&&/iphone|ipod|ipad/gi.test(t.platform),r,i,s,o,u,a=0,f=0,l=0,c,h,p,d,v,m,g,y={autostart:!0,returningVisitor:!1,animationIn:"drop",animationOut:"fade",startDelay:2e3,lifespan:15e3,bottomOffset:14,expire:0,message:"",touchIcon:!1,arrow:!0,hookOnLoad:!0,iterations:100},b={ca_es:"Per instal·lar aquesta aplicació al vostre %device premeu %icon i llavors <strong>Afegir a pantalla d'inici</strong>.",cs_cz:"Pro instalaci aplikace na Váš %device, stiskněte %icon a v nabídce <strong>Přidat na plochu</strong>.",da_dk:"Tilføj denne side til din %device: tryk på %icon og derefter <strong>Føj til hjemmeskærm</strong>.",de_de:"Installieren Sie diese App auf Ihrem %device: %icon antippen und dann <strong>Zum Home-Bildschirm</strong>.",el_gr:"Εγκαταστήσετε αυτήν την Εφαρμογή στήν συσκευή σας %device: %icon μετά πατάτε <strong>Προσθήκη σε Αφετηρία</strong>.",en_us:"Add this web page to your %device: tap %icon and then <strong>Add to Home Screen</strong>.",es_es:"Para instalar esta app en su %device, pulse %icon y seleccione <strong>Añadir a pantalla de inicio</strong>.",fi_fi:"Asenna tämä web-sovellus laitteeseesi %device: paina %icon ja sen jälkeen valitse <strong>Lisää Koti-valikkoon</strong>.",fr_fr:"Ajoutez cette application sur votre %device en cliquant sur %icon, puis <strong>Ajouter à l'écran d'accueil</strong>.",he_il:'<span dir="rtl">התקן אפליקציה זו על ה-%device שלך: הקש %icon ואז <strong>הוסף למסך הבית</strong>.</span>',hr_hr:"Instaliraj ovu aplikaciju na svoj %device: klikni na %icon i odaberi <strong>Dodaj u početni zaslon</strong>.",hu_hu:"Telepítse ezt a web-alkalmazást az Ön %device-jára: nyomjon a %icon-ra majd a <strong>Főképernyőhöz adás</strong> gombra.",it_it:"Installa questa applicazione sul tuo %device: premi su %icon e poi <strong>Aggiungi a Home</strong>.",ja_jp:"このウェブアプリをあなたの%deviceにインストールするには%iconをタップして<strong>ホーム画面に追加</strong>を選んでください。",ko_kr:'%device에 웹앱을 설치하려면 %icon을 터치 후 "홈화면에 추가"를 선택하세요',nb_no:"Installer denne appen på din %device: trykk på %icon og deretter <strong>Legg til på Hjem-skjerm</strong>",nl_nl:"Installeer deze webapp op uw %device: tik %icon en dan <strong>Zet in beginscherm</strong>.",pl_pl:"Aby zainstalować tę aplikacje na %device: naciśnij %icon a następnie <strong>Dodaj jako ikonę</strong>.",pt_br:"Instale este web app em seu %device: aperte %icon e selecione <strong>Adicionar à Tela Inicio</strong>.",pt_pt:"Para instalar esta aplicação no seu %device, prima o %icon e depois o <strong>Adicionar ao ecrã principal</strong>.",ru_ru:"Установите это веб-приложение на ваш %device: нажмите %icon, затем <strong>Добавить в «Домой»</strong>.",sv_se:"Lägg till denna webbapplikation på din %device: tryck på %icon och därefter <strong>Lägg till på hemskärmen</strong>.",th_th:"ติดตั้งเว็บแอพฯ นี้บน %device ของคุณ: แตะ %icon และ <strong>เพิ่มที่หน้าจอโฮม</strong>",tr_tr:"%device için bu uygulamayı kurduktan sonra %icon simgesine dokunarak <strong>Ana Ekrana Ekle</strong>yin.",zh_cn:"您可以将此应用程式安装到您的 %device 上。请按 %icon 然后点选<strong>添加至主屏幕</strong>。",zh_tw:"您可以將此應用程式安裝到您的 %device 上。請按 %icon 然後點選<strong>加入主畫面螢幕</strong>。"};w();return{show:x,close:T,reset:L}}(window);