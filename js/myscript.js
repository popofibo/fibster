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
document.addEventListener('mouseup',function(event)
{
    var sel = window.getSelection().toString();
    if(sel.length) {
        chrome.extension.sendMessage({'message':'setText','data': sel},function(response){})
		}
})
