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