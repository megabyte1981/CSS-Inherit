# CSS inherit.js
This simple jQuery plugin allows CSS classes to inherit from other CSS classes that are being referenced from within other CSS stylesheets. 

This plugin was a proof of concept project.  I'm sure there are some edge cases.  

#### Requirements
- jQuery
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
```

## Usage
Add the following plugin path within your head tags.
```html
<script src='js/css.inherit.js'></script>
```
### Calling the plugin.
```javascript
<script>
	$(function() {
		$('body').inheritCSS();
	});
</script>
```
#### Parameters
The only options at this time is a debug print out of the inherited CSS styles.  This is helpful for when the rendered result is not as expected.
```javascript
<script>
	$(function() {
		$('body').inheritCSS({debug:true});
	});
</script>
```

#### Final thing...
Need to add "data-inheritCSS" to all CSS files that you want this plugin to work on.
```html
<!-- before -->
<link href="css/style2.css" rel="stylesheet" type="text/css"/>
<link href="css/style.css" rel="stylesheet" type="text/css"/>

<!-- after -->
<link href="css/style2.css" rel="stylesheet" type="text/css" data-inheritCSS />
<link href="css/style.css" rel="stylesheet" type="text/css" data-inheritCSS />
```

### Standard HTML coding
You still use standard HTML syntax for this plugin.  No special requirements necessary.

```html
<div class="error-message">
	Error Message Styling....
</div>

<div class="error-message-1">
	Error Message Styling from .error-message class....
</div>

<div class="container-box">
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quam augue, molestie vel quam at, tempor tempor diam. In eget accumsan nisi. Vivamus ac
	lacinia libero. Mauris mollis, tellus a ultrices fermentum, dui ex mattis massa, a elementum justo risus at risus. Nam cursus, augue eu sagittis pretium,
	massa sem faucibus velit, sed porta nibh ex ut ante. Donec luctus, purus ac venenatis mollis, est nunc consectetur quam, at porttitor turpis ex ut tortor.
	Ut non dolor tristique, vestibulum massa quis, luctus augue. Morbi in eros quis ex aliquam laoreet nec et augue. Etiam sollicitudin velit nec mauris
	volutpat aliquet. Duis sit amet gravida erat, vitae pellentesque elit.
</div>
```

### Standard CSS coding
Just follow CSS standard practices when using this plugin.  The only difference is now you can reference other styles with a CSS class.
- classes ie. ".error-message"
- ids ie. "#line-through"
- HTML elements ie. "h1, nav, section"

```html
.error-message {
    .red-bg;
    margin-bottom:1em;
    .red-text;
    .padding-1;
}
.container-box {
    .gray-bg;
    padding:0 20px 0 20px;
    font-family: Verdana;
}

/* Red Colors */
.red-bg { background-color: #ffe3e3; border: 1px solid #fcbdbd; }
.red-text {color: #921515; font-weight:bold; .padding-1 }

/* Gray Colors */
.gray-bg { background-color: #eceef1; border: 1px solid #d6d7d9; }

/* Padding */
.padding-1 { padding:5px; }

/* Typography */
#line-through { text-decoration: line-through; }
#underline{ text-decoration: underline; }
.h1 { h1; }

.check-list { color:#159282; }
.done {
    #line-through;
    .red-text;
}

h1 { font-size:3em; padding:0; margin:0; font-weight:bold; #underline; }
section { margin-top:1em; font-family: Verdana; font-weight:bold; }
nav { background-color: #4a88e4; }
hover { cursor:pointer; }

.nav-styles { nav; }

.nav-styles ul li {
    display:inline-block;
    padding:0 15px 0 15px;
    color:#FFF;
    hover;
    line-height:50px;
    height:50px;
}

.nav-styles ul li:hover {
    .red-bg;
    border:0;
    color:#000000;
}
```

## Note
If you don't want a class style to be overwritten by an inherited style, then append all styles at the end of your class.  Also, inherited classes MUST end with a ';'

```html
.error-message {
    .red-bg;
    .red-text;
    .padding-1;
	margin-bottom:1em;
	color:#000000;
}
```

## You are free to use this plugin as you see fit!  Happy coding!
