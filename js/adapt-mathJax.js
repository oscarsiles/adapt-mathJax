define([ "core/js/adapt" ], function(Adapt) {

	function loadScript(scriptObject, callback) {
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');

		script.type = scriptObject.type || 'text/javascript';

		if (scriptObject.src) {
			script.src = scriptObject.src;
		}

		if (scriptObject.text) {
			script.text = scriptObject.text;
		}

		if (callback) {
			// Then bind the event to the callback function.
			// There are several events for cross browser compatibility.
			script.onreadystatechange = callback;
			script.onload = callback;
		}

		// Append the <script> tag.
		head.appendChild(script);
	}

	function setUpMathJax() {
		Adapt.wait ? Adapt.wait.begin() : Adapt.trigger("plugin:beginWait");

		var config = Adapt.config.get("_mathJax");
		var inlineConfig = config ? config._inlineConfig : {
			"tex": {
				"inlineMath": [ [ "$", "$" ], [ "\\(", "\\)" ] ],
				"displayMath": [ [ "$$", "$$" ], [ "\\[", "\\]" ] ],
				"processEscapes": true,
				"autoload": {
				"color": [],
				"colorv2": ["color"]
				},
				"packages": {"[+]": ["noerrors"]}
			},
			"options": {
				"ignoreHtmlClass": "tex2jax_ignore",
				"processHtmlClass": "tex2jax_process"
			},
			"loader": {
				"load": ["input/asciimath", "[tex]/noerrors"]
			}
		};
		var src = config ? config._src : "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";

		if ( /^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {src.replace("-chtml", "-svg")}

		var mathjaxConfig = "window.MathJax = " + JSON.stringify(inlineConfig) + ";"

		loadScript({ text: mathjaxConfig });

		loadScript({ src: src }, function() {
			Adapt.wait ? Adapt.wait.end() : Adapt.trigger("plugin:endWait");
		});

	}

	function onProcessMath() {
		$(".loading").show();
	}

	function onEndProcess() {
		Adapt.trigger("device:resize");
		$(".loading").hide();
	}

	function onViewReady(view) {
		$(".loading").show();

		function checkForMathJax() {
			if (!window.MathJax || !window.MathJax.version) {
				window.setTimeout(checkForMathJax, 200);
			} else {
				Adapt.trigger("mathJax:processMath");
				MathJax.typesetPromise().then(() => {
					Adapt.trigger("mathJax:endProcess");
				  }).catch((err) => console.log(err.message));
			}
		}

		checkForMathJax();
	}

	function onPopupOpened($element) {
		if ($element) $element = $element[0];

		MathJax.typesetPromise([$element]).catch((err) => console.log(err.message));
	}

	Adapt.once("app:dataReady", setUpMathJax).on({
		"mathJax:processMath": onProcessMath,
		"mathJax:endProcess": onEndProcess,
		"menuView:ready pageView:ready": onViewReady,
		"popup:opened": onPopupOpened
	});

});
