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




