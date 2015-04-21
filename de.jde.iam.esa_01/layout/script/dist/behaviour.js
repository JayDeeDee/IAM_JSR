// + + + + + + + + + + + + + + + + + + + + + + + + + + + + 
//  behaviour.js
//  Author: Jana Deutschlaender
//  VFH Berlin, Modul IAM
//  14|10|10
// + + + + + + + + + + + + + + + + + + + + + + + + + + + + 



/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + */
/* general methods*/
/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + */


/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + */
/* project library width helper funcs */
/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + */

var jde = {

    /**
    * executes functions when the page loads.
    * @param func_name name of function
    */
    addLoadEvent: function (func_name) {
        "use strict";
        if (typeof func_name === 'function') {
            var lastonload = window.onload;

            if (typeof window.onload !== 'function') {
                window.onload = func_name;
            } else {
                window.onload = function () {
                    lastonload();
                    func_name();
                };
            }
        }
    },
    /**
    * get config param from Query GET-Parameter 
    * @param param name of GET Param
    */
    get_config: function(param) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == param){
                return pair[1];
            }
	   }
	   return false;
    },


    /**
    * diverse functions for setting special attributes to a node.
    * @param elem name of node
    * @param attr kind of attribute
    * @param value attribute value
    */
    set_attr: function (elem, attr, value) {
        "use strict";
        var myNode = elem;
        myNode.setAttribute(attr, value);
    },
    set_href: function (elem, url) {
        "use strict";
        var myNode = elem;
        myNode.setAttribute("href", url);
    },
    set_title: function (elem, title) {
        "use strict";
        var myNode = elem;
        myNode.setAttribute("title", title);
    },
    set_class: function (elem, className) {
        "use strict";
        var myNode = elem;
        myNode.classList.add(className);
    },
    set_id: function (elem, idVal) {
        "use strict";
        var myNode = elem;
        myNode.setAttribute("id", idVal);
    },
    set_width: function (elem, width) {
        "use strict";
        var myNode = elem;
        myNode.setAttribute("width", width);
    },
    set_height: function (elem, height) {
        "use strict";
        var myNode = elem;
        myNode.setAttribute("height", height);
    },
    remove_class: function (elem, className) {
        "use strict";
        var myNode = elem;
        myNode.classList.remove(className);
    },
    
    addEventListenerByClass: function (className, event, fn) {
	    var list = document.getElementsByClassName(className);
	    for (var i = 0, len = list.length; i < len; i++) {
	        list[i].addEventListener(event, fn, false);
	    }
	},
    
    /**
    * creates a link with title, url, id and onclick event.
    * @param txt link text
    * @param ltitle link title
    * @param url  link destination
    * @param id  value of link id
    * @param onclick  value of onclick-attribute
    * @return link element (a);
    */
    create_link: function (ltitle, url, id, onclick) {
        "use strict";
        var myNode = document.createElement("a");

        this.set_title(myNode, ltitle);
        this.set_href(myNode, url);
        this.set_attr(myNode, "id", id);
        this.set_attr(myNode, "onclick", onclick);
        return myNode;
    },

    /**
    * returns a DOM Node width a certain parent, class and position
    * @param pos  position of the node in nodeArray width this parent and class
    * @param $parentNode  DOM Object of parent
    * @param className  class attribute of node
    * @return if it exists the node else false;
    */
    get_cNode: function (className, $parentNode, pos) {
        "use strict";
        var elemArray = $parentNode.getElementsByClassName(className),
            i = elemArray.length;
        if (i > 0 && pos < i) {
            return elemArray[pos];
        }
        return false;
    },
    
    /**
    * Ajax methods based on Joern Kreutel 
    */
    xhr: function (method, dpath, obj, onsuccess, onerror) {
        "use strict";
        
        var $req = new XMLHttpRequest(),
            url = null,
            json;
        
        if (dpath) {

            if (dpath.indexOf("/") === 0) {
                url = /*webapp_basepath + */ dpath.substring(1);
            } else {
                url = dpath;
            }
    
            // callback func
            $req.onreadystatechange = function () {

                if ($req.readyState === 4) {
                    if ($req.status === 200 && onsuccess) {
                        onsuccess($req);
                    } else if (onerror) {
                        onerror($req);
                    }
                }
            };

            $req.open(method, url, true);
            if (obj) {
                json = JSON.stringify(obj); // create a json representation from the object
                $req.setRequestHeader("Content-type", "application/json");
            }
            $req.setRequestHeader("Accept", "application/json, application/xml, text/html, text/plain");

            if (obj) {
                $req.send(json);
            } else {
                $req.send();
            }

        } /* if (dpath) */
    },
    set_textNode: function (title, $ctext) {
        "use strict";
        var $text = document.createTextNode(title);
        $ctext.appendChild($text);
    }
};

/*  empty DOM knode */
HTMLElement.prototype.empty = function() {
    var $next = this;
    while ($next.hasChildNodes()) {
        $next.removeChild($next.lastChild);
    }
};





/* DOM-Objects for JSL and JSR tasks */


var err_head = "Es ist ein Fehler aufgetreten",
    err_txt = "Die Daten konnten nicht geladen werden.",
    
    configs = ["/data/die_umsiedlerin.json", "/data/der_bau.json", "/data/uebungen/ue2_1.json", "/data/uebungen/ue2_2.json", "/data/uebungen/ue2_3.json"];
	currentConfigId = 0,
	$config_switch,
	$config_choices,
    
    ec = 0,
    oc = 0,
    
    $textbox = null,
    $back = null,
    $objbox = null,
    

    $doc = document,
    $body = $doc.body,
    $back = $doc.getElementById('back'),
    $title = $doc.getElementById('main_title'),
    $article = $doc.getElementsByTagName('article').item(0),
    $left = $doc.getElementById('left'),
    $middle = $doc.getElementById('middle'),
    $right = $doc.getElementById('right'),
    $tpls = $doc.getElementById('templates'),
    $tpl_mediabox = $tpls.getElementsByClassName('media_link')[0],
    $tpl_excerpt = $doc.getElementById('excerpt'),
    $tpl_obj = $doc.getElementById('obj'),
    $errorbox = $doc.getElementById('statusbox'),
    $errortxt = $doc.getElementById('errortxt'),
    $errorhead = $doc.getElementById('errorhead');

$tpl_mediabox.parentNode.removeChild($tpl_mediabox);
$tpl_excerpt.parentNode.removeChild($tpl_excerpt);
$tpl_obj.parentNode.removeChild($tpl_obj);

var alertDesc = function (desc) {
	    "use strict";
	    
	    if ($objbox) {
	        var $more = $objbox.querySelector('.more'),
	            $img = $objbox.querySelector('.more img'),
	            $alink = jde.create_link("Bildbeschreibung anzeigen", "final_index.html", "morelink", "show_description(\'" + desc + "\'); return false;");
	        
	        $alink.appendChild($img);
	        $more.appendChild($alink);
	    }
	},
	
	set_nextJsonConfig = function () {
		"use strict";
		if (currentConfigId < (configs.length - 1)) {
			currentConfigId = currentConfigId + 1;
		} else {
			currentConfigId = 0;
		}
	},
	
	get_nextJsonConfig = function () {
		"use strict";
		var nextConfigId;
		if (currentConfigId < (configs.length - 1)) {
			nextConfigId = currentConfigId + 1;
		} else {
			nextConfigId = 0;
		}
		return nextConfigId;
	},
	
	get_jsonConfig = function () {
		"use strict";
		return currentConfigId;
	},
	
	
    /**
     * onclick event: alert() dialog for image description
     */
    show_description = function (desc) {
        "use strict";
        alert(desc);
    },

    /**
    * switches single view and overview
    */
    switchViews = function () {
        "use strict";

        if ($textbox && $back) {

            /* append more link */
            var $more = jde.get_cNode("more", $textbox, 0);

            if ($more) {
                var mlink = jde.create_link("Den kompletten Text anzeigen", "index.html", "morelink", "show_animatedDetail(); return false;"),
                    text = document.createTextNode("Weiter lesen ...");
                mlink.appendChild(text);
                $more.appendChild(mlink);
            }

            build_backlink();
        }

    },
    
    build_backlink = function () {
    	if ($back) {
    		var blink = jde.create_link("Zurück zur Übersicht", "index.html", "backlink", "show_animatedOverview(); return false;"),
                btext = document.createTextNode("Zurück"),
                wrap = document.createElement("span");
            wrap.appendChild(btext);
            blink.appendChild(wrap);
            $back.appendChild(blink);
    	}
    },

    /**
     * switch view without animation 
     */
    show_simpleDetail = function () {
        "use strict";
        jde.set_id($body, "detail");
    },

    show_simpleOverview = function () {
        "use strict";
        jde.set_id($body, "overview");
    },


    /**
     * switch view with animation 
     */
    timer,
    _isOverview = true,
    _isAnimated = false,
    
	is_overview = function(){
		"use strict";
		return _isOverview;
	},
	
	set_overview = function(bool){
		"use strict";
		_isOverview = bool;
	},
	
	is_animated = function(){
		"use strict";
		return _isAnimated;
	},
	
	set_animated = function(bool){
		"use strict";
		_isAnimated = bool;
	},

    clear = function (t) {
	    "use strict";
	    clearTimeout(t);
	    set_animated(false);
	},

	end_animation = function (e) {
    	"use strict";
	    if (e.propertyName == "opacity") {
			jde.remove_class($article, "hide");
			jde.remove_class($article, "show");
			jde.remove_class($body, "view");
			$body.removeEventListener("transitionend", end_animation, false);
		}
	},
	
	show_article = function(t){
		jde.set_class($article, "show");
		jde.remove_class($article, "hide");
		clear(t);		
	},

    show_view = function (e) {
	    "use strict";
	    if (e.propertyName == "opacity") {
			$body.removeEventListener("transitionend", show_view, false);
			
			jde.set_class($body, "view");
			
			if(is_overview()){
				jde.set_id($body, "detail");
			} else{
				jde.set_id($body, "overview");
			}
	    	
	    	timer = setTimeout(function () { show_article(); }, 500);
	    	
	    	$body.addEventListener("transitionend", end_animation, false);
	    	set_overview(!is_overview());
		}
	},

	show_overview = function () {
	    "use strict";
    	jde.set_id($body, "overview");
    	jde.set_class($article, "show");
    	set_overview(true);
	},

    show_animatedDetail = function () {
	    "use strict";
	    if ($article) {
	        if (!is_animated() && is_overview()) {
	            jde.set_class($article, "hide");
	            set_animated(true);
	            $body.addEventListener("transitionend", show_view, false);
	        }
	        
	    } else {
	        /*Fallback JSL4: */
	        show_simpleDetail();
	    }
	},


	show_animatedOverview = function () {
	    "use strict";
	    if ($article) {
	        if (!is_animated() && !is_overview()) {
	            jde.set_class($article, "hide");
	            set_animated(true);
	            $body.addEventListener("transitionend", show_view, false);
	        }
	        
	    } else {
	        /*Fallback JSL4: */
	        show_simpleOverview();
	    }
	};

    /**
    * adds an errormessage, if json config data could not be read
    */
    build_errorcontent = function ($req, errhead, errtxt) {
        "use strict";
        $errorhead.empty();
        jde.set_textNode(err_head, $errorhead);
        $errortxt.empty();
        jde.set_textNode(err_txt, $errortxt);
        $errorbox.style.display = "block";
    },

    /**
    * use $tpl_mediabox to create a mediabox (more than one box possible)
    * @param item   json item
    */
    build_mediabox = function (item) {
        "use strict";
        try {
            var $rootElem = document.getElementById(item.render_container);
            if ($rootElem) {
                
                var $tmpElem = $tpl_mediabox.cloneNode(true);
                jde.set_textNode(item.title || 'Medien', $tmpElem.getElementsByTagName('h2')[0]);
                
                $rootElem.appendChild($tmpElem);
                var $ul = $tmpElem.querySelector('ul');
                for (var i = 0; i < item.content.length; i++) {
                    var $li = document.createElement('li');
                    var $a = document.createElement('a');
                    $li.appendChild($a);
                    $a.href = item.content[i].src;
                    $a.textContent = item.content[i].title;
                    $ul.appendChild($li);
                    $a.addEventListener("click", function(e){
    					e.preventDefault();
    					alert('Nicht Teil des Implementierungsumfangs');
    				});
                }
                
            }
        } catch (err) { }
    },

    /**
    * use $tpl_excerpt to create a excerpt box (only one box possible)
    * @param item   json item
    */
    build_excerpt = function (item) {
        "use strict";
        try {
            var $rootElem = document.getElementById(item.render_container);
            if (ec < 1 && $rootElem) {
                var $tmpElem = $tpl_excerpt.cloneNode(true);
                jde.set_textNode('Textauszug', $tmpElem.getElementsByTagName('h2')[0]);
                
                $rootElem.appendChild($tmpElem);
                var $block = $tmpElem.querySelector('blockquote');
                jde.xhr(
                    "GET",
                    item.src,
                    null,
                    function(xmlhttp) {
                        $block.innerHTML = xmlhttp.responseText;
                    }
                );
                ec++;
                $textbox = $doc.getElementById('excerpt');
                $back = $doc.getElementById('back');
                switchViews();
            }
        } catch (err) { /*console.log(err);*/ }
    },

    /**
    * use $tpl_obj to create a object box (only one box possible)
    * @param item  json item
    */
    build_obj = function (item) {
        "use strict";
        try {
            var $rootElem = document.getElementById(item.render_container);
            if (oc < 1 && $rootElem) {
                var $tmpElem = $tpl_obj.cloneNode(true);
                jde.set_textNode('Objekt', $tmpElem.getElementsByTagName('h2')[0]);
                var $fig = $tmpElem.querySelector('figure');
                if(item.src && item.description){
                    var bclass = 'maxw';
                    var $img = document.createElement('img');
                    var img = new Image();
                    img.onload = function(){
                        if(img.height > img.width){
                            bclass = 'maxh';
                        }
                        $tmpElem.classList.add(bclass);
                    };
                    img.src = item.src; 
                    $img.src = item.src;
                    $img.alt = item.description;
                    $fig.appendChild($img);
                    
                    $rootElem.appendChild($tmpElem);
                    oc++;
                    $objbox = $doc.getElementById('obj'),
                    alertDesc(item.description);
                }
            }
        } catch (err) { /*console.log(err);*/ }
    },



    /**
    * adds dynamic content according to json config file
    * @param $req   request
    */
    build_content = function ($req) {
        "use strict";

        var textContent = $req.responseText,
            jsonContent = JSON.parse(textContent),
            item,
            hasExcerpt = false;
            main_title = jsonContent.title || err_head;

        $errorbox.style.display = "none";

        //title == h1 setzen
        $title.empty();
        $errorhead.empty();
        $errortxt.empty();
        jde.set_textNode(main_title, $title);
        

        //cols fuellen
        for (var i = 0; i < jsonContent.content_items.length; i++) {

            item = jsonContent.content_items[i];
            switch (item.type) {
            case "objekt":
                build_obj(item);
                break;
            case "textauszug":
                build_excerpt(item);
                hasExcerpt = true;
                break;
            case "medienverweise":
                build_mediabox(item);
                break;
            default:
                break;
            }
            
            if( i == (jsonContent.content_items.length-1) && !hasExcerpt){
            	build_backlink();
            }
        } /* for */
    },
    
    empty_content = function() {
    	
    	oc = 0;
        ec = 0;
        $left.empty();
        $right.empty();
        $middle.empty();
        $back.empty();
    	
    },
    
    reload_content = function (config) {
    	 	
    	empty_content();
    	
    	jde.xhr(
            "GET",
            config,
            null,
            function (xmlhttp) { build_content(xmlhttp); },
            function (xmlhttp) { build_errorcontent(xmlhttp); }
        );
    	
    	set_nextJsonConfig();
    	var n = configs[currentConfigId].lastIndexOf("/"); 
    	config_switch.textContent = configs[currentConfigId].substr(n+1);
    	
    },
     

    /* onload func for ajax  */
    load_content = function () {
        "use strict";
        
        empty_content();
        
        var config = jde.get_config("config");
        var $config_switch = document.getElementById("config_switch");
        
        if(config){
    		var testconfig = configs[get_nextJsonConfig()];
    		var n = config.localeCompare(testconfig);
    		if(n == 0){
				set_nextJsonConfig();
    		}
    	} else{
    		config = configs[currentConfigId];
    	}
   
		$config_switch.addEventListener("click", function(e){
    		e.preventDefault();
    		reload_content(configs[get_jsonConfig()]);
		});
		        
        reload_content(config);
 
    };

/**
 *  adds a func to window.onload event 
 */
jde.addLoadEvent(load_content);