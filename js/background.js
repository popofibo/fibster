/*
DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
                    Version 2, December 2004 

 Copyright (C) 2013 http://popofibo.com <popo.fibo@gmail.com> 

 Everyone is permitted to copy and distribute verbatim or modified 
 copies of this code, and changing it is allowed as long 
 as the name is changed. 

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION 

  0. You just DO WHAT THE FUCK YOU WANT TO.
*/
var selText = null;
var response = null;

chrome.extension.onMessage.addListener(function(request, sender, sendResponse)
{
    switch(request.message)
    {
        case 'setText':
            window.selText = request.data;
        break;
         
        default:
            sendResponse({data: 'Invalid arguments'});
        break;
    }
});
 
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        chrome.tabs.create({url: "http://popofibo.com/pop/fibster-chrome-extension-get-inline-movie-data-through-imdb-com/"});
    }
});
 
function savetext(info,tab)
{
    var jax = new XMLHttpRequest();
	var cake = "http://mymovieapi.com/?title="+selText+
	"&type=xml&plot=simple&episode=1&limit=1&yg=0&mt=none&lang=en-US&offset=&aka=simple&release=simple&business=0&tech=0";
	
	jax.open("GET", cake, true);
    jax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	jax.send();
    jax.onreadystatechange = function() { if(jax.readyState==4) 
			{  
			  response = jax.responseText;
			 
			chrome.tabs.create({
            url: chrome.extension.getURL('dialog.html'),
            active: false
			}, function(tab) {
				chrome.windows.create({
				tabId: tab.id,
                type: 'popup',
                focused: true
            });
        });
		
		/*chrome.windows.create({'url': chrome.extension.getURL('dialog.html'),'type': 'popup', 'width': 440, 'height': 220, 'left': (screen.width/2)-(440/2), 'top': (screen.height/2)-(220/2)} , function(window) {
    });*/
	}}
	
}
 
var contexts = ["selection"];
for (var i = 0; i < contexts.length; i++)
{
    var context = contexts[i];
    chrome.contextMenus.create({"title": "Fibster", "contexts":[context], "onclick": savetext});  
}
