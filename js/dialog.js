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
window.onload = function(e) {
    chrome.runtime.getBackgroundPage(function(bgWindow) {
        var elem = document.getElementById("area");		
		elem.value = bgWindow.response;
		
		var div = document.getElementById("divId");
		
		ConvertXMLToHTML(elem.value, div);
	}
    );
};

function ConvertXMLToHTML(text, div) {
	var xmlDoc = null;
	
	try
      {
      xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async="false";
      xmlDoc.loadXML(text);
      }  
    catch(e)
      {
      try
        {
        parser=new DOMParser();
        xmlDoc=parser.parseFromString(text,"text/xml");
        }
      catch(e)
        {
        alert(e.message);
        }
      }
	
	if (xmlDoc.getElementsByTagName("imdb_url")[0].childNodes[0].nodeValue != null && xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue  != null) {
		div.innerHTML += "<div class='page_title' style='padding:0 0 25px 0;margin:0 0 20px 0;background:url(\"static/border.png\") 0 100% repeat-x;'><h2><a href='" + xmlDoc.getElementsByTagName("imdb_url")[0].childNodes[0].nodeValue + "' target='_blank'>"+ xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue +"</a></h2><h3><font color='#FFFFFF'>Rating</font> <em>" + xmlDoc.getElementsByTagName("rating")[0].childNodes[0].nodeValue + "</em> <font color='#FFFFFF'>with</font> <em>" + xmlDoc.getElementsByTagName("rating_count")[0].childNodes[0].nodeValue + " votes</em></h3><h4>" + xmlDoc.getElementsByTagName("year")[0].childNodes[0].nodeValue + "</h4>";
	}
	
	var image='';
	if (xmlDoc.getElementsByTagName("poster")[0].getElementsByTagName("cover")[0].childNodes[0].nodeValue != null) {
		image = xmlDoc.getElementsByTagName("poster")[0].getElementsByTagName("cover")[0].childNodes[0].nodeValue;
		div.innerHTML += "<img align = 'left' height = '80' width = '80' class='profile_image' src='" + image + "' alt='Poster' style = 'float:left;    margin:5px 11px 0 0;border-bottom:#FFF 1px solid;border-right:#FFF 1px solid;'/>";
	}
	
	if (xmlDoc.getElementsByTagName("plot_simple")[0].childNodes[0].nodeValue != null) {
		div.innerHTML += "<b>" + xmlDoc.getElementsByTagName("plot_simple")[0].childNodes[0].nodeValue + "</b></div>";
	}
	div.innerHTML += "<p style=\"clear:both;\"><br />";
	
	var dirs=null; 
	
	if (xmlDoc.getElementsByTagName("directors")[0].getElementsByTagName("item") != null) {
		div.innerHTML += "<div class='services' style=\"overflow:hidden;\">";
		div.innerHTML += "<h2>Directors</h2>";
		dirs = xmlDoc.getElementsByTagName("directors")[0].getElementsByTagName("item");
	}
	
	var element=null;
	
	for (i=0;i<dirs.length;i++) {
		element=dirs[i].childNodes[0].nodeValue;
		div.innerHTML += "<ul style=\"list-style:none;overflow:hidden;\"><li style=\"background :url('static/list_bg_new.png') 0 0 no-repeat;display:inline;width:200px;float:left;height:33px;margin:0 10px 15px 0;line-height:31px;padding:0 0 0 31px;font-weight:bold;text-shadow:#000 1px 1px 0;\">" + element + "</li></ul>";
		
		if (i == dirs.length-1) {
			div.innerHTML += "</div></p>";
		}
	}
	
	div.innerHTML += "</div><p style=\"clear:both;\">";
	
	var genres=null; 
	
	if (xmlDoc.getElementsByTagName("genres")[0].getElementsByTagName("item") != null) {
		div.innerHTML += "<div class='services' style=\"overflow:hidden;\">";
		div.innerHTML += "<h2>Genres</h2>";
		genres = xmlDoc.getElementsByTagName("genres")[0].getElementsByTagName("item");
	}
	
	element=null;
	
	for (i=0;i<genres.length;i++) {
		element=genres[i].childNodes[0].nodeValue;
		div.innerHTML += "<li style=\"list-style:none;display:inline;float:left;font-weight:bold;text-shadow:#000 1px 1px 0;\">" + element + "</li>";
		if (i < genres.length-1) {
			div.innerHTML += "<li style=\"list-style:none;display:inline;float:left;font-weight:bold;text-shadow:#000 1px 1px 0;\">, </li>";
		}
		else if(i == genres.length-1) {
			div.innerHTML += "</ul>";
			div.innerHTML += "</div></p>";
		}
	}
	
	div.innerHTML += "</div><br /><p style=\"clear:both;\">";
	
	var actors=null; 
	
	if (xmlDoc.getElementsByTagName("actors")[0].getElementsByTagName("item") != null) {
		div.innerHTML += "<div class='services' style=\"overflow:hidden;\">";
		div.innerHTML += "<h2>Actors</h2>";
		actors = xmlDoc.getElementsByTagName("actors")[0].getElementsByTagName("item");
		div.innerHTML += "<ul style=\"list-style:none;overflow:hidden;\">";
	}
	
	element=null;
	
	for (i=0;i<actors.length;i++) {
		element=actors[i].childNodes[0].nodeValue;
		div.innerHTML += "<li style=\"list-style:none;display:inline;float:left;font-weight:bold;text-shadow:#000 1px 1px 0;\">" + element + "</li>";
		if (i < actors.length-1) {
			div.innerHTML += "<li style=\"list-style:none;display:inline;float:left;font-weight:bold;text-shadow:#000 1px 1px 0;\">, </li>";
		}
		else if(i == actors.length-1) {
			div.innerHTML += "</ul>";
			div.innerHTML += "</div></p>";
		}
	}
	
}
