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





// + + + + + + + + + + + + + + + + + + + + + + + + + + + + 
//  jsl.js
//  Author: Jana Deutschlaender
//  VFH Berlin, Modul IAM
//  14|10|10
// + + + + + + + + + + + + + + + + + + + + + + + + + + + +

/* DOM-Objects for JSL tasks */
var $doc = document,
    $body = $doc.body,
    $objbox = $doc.getElementById('obj'),
    $textbox = $doc.getElementById('excerpt'),
    $back = $doc.getElementById('back'),
    $article = $doc.getElementsByTagName('article').item(0),


	/**
	* switches single view and overview
	*/
	switchViews = function () {
	    "use strict";
	    
	    /* 
	        view switcher only works with activated JavaScript, 
	        therefore it should be dynamically added to the DOM via Scripting
	    */
	    if ($textbox && $back) {
	        /* append more link */
	        var $more = jde.get_cNode("more", $textbox, 0);
	
	        if ($more) {
	            /* JSL4: var mlink = jde.create_link("Den kompletten Text anzeigen", "index.html", "morelink", "show_simpleDetail(); return false;"), */
	            /* JSL5: */
	            var mlink = jde.create_link("Den kompletten Text anzeigen", "02_index_jsl.html", "morelink", "show_animatedDetail(); return false;"),
	                text = document.createTextNode("Weiterlesen ...");
	            mlink.appendChild(text);
	            $more.appendChild(mlink);
	        }
	
	        /* append back link (JSL2) */
	        /* JSL4: var blink = jde.create_link("Zurück zur Übersicht", "index.html", "backlink", "show_simpleOverview(); return false;"), */
	        /* JSL5: */
	        var blink = jde.create_link("Zurück zur Übersicht", "02_index_jsl.html", "backlink", "show_animatedOverview(); return false;"),
	            btext = document.createTextNode("Zurück"),
	            wrap = document.createElement("span");
	        wrap.appendChild(btext);
	        blink.appendChild(wrap);
	        $back.appendChild(blink);
	    }
	
	},

	/* JSL4: switch view without animation */
	show_simpleDetail = function () {
	    "use strict";
	    jde.set_id($body, "detail");
	},

	show_simpleOverview = function () {
	    "use strict";
	    jde.set_id($body, "overview");
	};


/* JSL4/JSL5: switch view with animation */
var timer,
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



jde.addLoadEvent(switchViews);