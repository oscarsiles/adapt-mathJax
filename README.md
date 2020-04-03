# MathJax

An extension to load [MathJax](https://www.mathjax.org) into Adapt.

## Installation

* In this extension the default configuration for MathJax is as follows:
```json
"_mathJax": {
	"_inlineConfig": {
		"tex": {
			"inlineMath": [ [ "$", "$" ], [ "\\(", "\\)" ] ],
			"displayMath": [ [ "$$", "$$" ], [ "\\[", "\\]" ] ],
			"processEscapes": true,
			"autoload": {
			"color": [],
			"colorV2": ["color"]
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
	},
	"_src": "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js",
}
```
* If this needs to be overridden, add the above to `config.json` and modify where required.
* With [Adapt CLI](https://github.com/adaptlearning/adapt-cli) installed, run `adapt install mathJax`. Alternatively, download the ZIP and extract into the src > extensions directory.
* Run an appropriate Grunt task.

### Usage

* With the default configuation, equations are processed in LaTeX format.
* In JSON, surround LaTeX equations with `\\(` and `\\)` (or `$` on either side) for inline mode or `\\[` and `\\]` (or `$$` on either side) for display mode.
* Example of inline mode:
```
\\(x^n + y^n = z^n\\)
$x^n + y^n = z^n$
```
* Example of display mode (rendered in a separate block):
```
\\[f(x) = \\frac{1}{1+x}\\]
$$f(x) = \\frac{1}{1+x}$$
```
* When directly editing in the authoring tool, backslashes do *not* have to be escaped with an additional backslash (`\`). The above 'inline mode' example would therefore be entered as:
```
\(x^n + y^n = z^n\)
$x^n + y^n = z^n$
```
* The Adapt loading screen is shown while MathJax is processing.

### Attributes

Attribute | Type | Description | Default
--------- | ---- | ----------- | -------
`_inlineConfig` | Object | In-line [configuration](http://docs.mathjax.org/en/latest/options/index.html#configuration) for MathJax | `{		"tex": { "inlineMath": [ [ "$", "$" ], [ "\\(", "\\)" ] ], "displayMath": [ [ "$$", "$$" ], [ "\\[", "\\]" ] ], "processEscapes": true,	"autoload": { "color": [], "colorV2": ["color"]	}, "packages": {"[+]": ["noerrors"]} }, "options": { "ignoreHtmlClass": "tex2jax_ignore", "processHtmlClass": "tex2jax_process"	}, "loader": { "load": ["input/asciimath", "[tex]/noerrors"] } }`
`_src` | String | The URL to the copy of MathJax which should be loaded | `"https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"`
