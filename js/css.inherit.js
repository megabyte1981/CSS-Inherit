(function ($) {
	inheritCSS = (function(element, settings){

		function _inheritcss(element, settings){

            // Default options settings
            this.settings = $.extend({
                debug: false
            }, settings);

            // Dynamic variables settings
            this.initials = {
                cssFilePath : '',
                cssFileContents : '',
                cssFind : {}
            };
            $.extend(this,this.initials);

            //DOM element passed in
            this.$el = $(element);

            // Ensure 'this' always references inheritCSS
            this.changeInheritCSS = $.proxy(this.changeInheritCSS,this);

            // Initialize this mother
            this.init();
        }

		return _inheritcss;

	})();

    inheritCSS.prototype.init = function(){

        this.findCSS();

    };

    inheritCSS.prototype.findCSS = function(){
        var obj = this;

        if($("head").find('link').length > 0) {
            $("head").find('link').each(function( index ) {
                if($(this)[0].hasAttribute('data-inheritCSS')) {
                    obj.initials.cssFilePath = $(this)[0].attributes.href.nodeValue;
                    obj.getCSS();
                }
            });

            if(obj.initials.cssFileContents != "") {
                obj.processCSS();
            }
        }

    };

    inheritCSS.prototype.getCSS = function(){
        var obj = this;

        $.ajax({
            url: this.initials.cssFilePath,
            dataType: "text",
            async: false,
            success: function(cssText) {
				cssText = cssText.replace(/(\r\n|\n|\r)/gm," "); // Remove all new lines and returns
				cssText = cssText.replace(/\/.*?\//g, ""); // Remove all comments ie. /* */
				cssText = cssText.replace(/\s{2,}/g, " "); // Remove all double spaces
                cssText = cssText.replace(/\s{/g, "{"); // Remove all spaces before the {
				cssText = cssText.replace(/}\s/g, "}"); // Remove space after }
				cssText = cssText.replace(/}/g, "}"); // Remove space after }
                obj.initials.cssFileContents += cssText;
            }
        });

    };

    inheritCSS.prototype.processCSS = function(){
        var obj = this;

        this.parseCSS();
		this.findInheritCSS();
		this.replaceInheritCSS();
		this.buildInheritCSS();

        if(this.settings.debug) {
			
			var debug_container = $('<div/>',{
				text: obj.initials.cssFileContents,
				css:{
					'position':'relative',
					'margin': '1em',
					'padding': '1em',
					'border': '.03em solid #e1e1e1',
					'background-color': '#eceef1',
					'border-radius': '.2em',
				}
			});
			
			var debug_label = $('<div/>',{
				text: 'DEBUG',
				css:{
					'position':'absolute',
					'top': '0',
					'left': '0',
					'padding': '0 1em 0 1em',
					'background-color': '#969696',
					'color':'#FFF',
					'border-radius': '.2em',
				}
			});
			debug_label.prependTo(debug_container);
			debug_container.prependTo("body");
        }
    };

    inheritCSS.prototype.parseCSS = function(){
        var obj = this;

        var str = obj.initials.cssFileContents;
        // Collect all styles between the {}'s
        var result = str.match(new RegExp('{' + '([^<>]*?)' + '}', 'gm'));

        // Find inherit class names
        if(result.length > 0) {
            $.each( result, function( key, val ) {
                val = val.replace('{', '').replace('}', '');
                var arr = val.split(';');
                $.each( arr, function( k, v ) {
                    v = $.trim(v);
                    if(!v.match(/:/)) {
                        // Cast out blanks values
                        if(v) {
                            obj.initials.cssFind[v] = "";
                        }
                    }
                });
            });
        }

    };

	inheritCSS.prototype.findInheritCSS = function(){
        var obj = this;

        if(obj.initials.cssFind != "") {
			$.each( obj.initials.cssFind, function( key, val ) {           

				var start_pos = obj.initials.cssFileContents.indexOf('}' + key + '{');
				
				// check if the style is found at the beginning for the string.
				if(start_pos == -1) {
					start_pos = obj.initials.cssFileContents.indexOf(key + '{');
				}

                if(start_pos > 0) {
					
					var start_val_length = key.length + 2; // +2 to include the '{'

    				// Add the key length the the starting position so that we can return only the CSS between the {}'s
    				start_pos = start_pos + start_val_length;

    				var end_pos = obj.initials.cssFileContents.indexOf('}',start_pos);
    				var styles = obj.initials.cssFileContents.substring(start_pos,end_pos);

    				// Check if the styles variable ends with a ;
    				styles = $.trim(styles);
    				if(!styles.endsWith(";")) {
    					styles = styles + ";";
    				}

    				obj.initials.cssFind[key] = styles;
                }
            });
        }

    };

	inheritCSS.prototype.replaceInheritCSS = function(){
        var obj = this;

        if(obj.initials.cssFind != "") {
			$.each( obj.initials.cssFind, function( key, val ) {

				var find = key + ";";
				var found = new RegExp(find, 'g');
				obj.initials.cssFileContents = obj.initials.cssFileContents.replace(found, val);

            });
        }

    };

	inheritCSS.prototype.buildInheritCSS = function(){
        var obj = this;

        if(obj.initials.cssFind != "") {
			$("<style type='text/css'>" + obj.initials.cssFileContents + "</style>").appendTo("head");
        }

    };

    //*********************************************************************************
	//
	//*********************************************************************************
	$.fn.inheritCSS = function(options){
		return this.each(function(index,el){
			el.inheritCSS = new inheritCSS(el,options);
		});
	};

}(jQuery));
