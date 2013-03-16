{
	"manifest_version": 2,
	"name": "Copy Anchor Text",
	"version": "syscmd(`json < package.json version | tr -d \\n')",
	"permissions": [
		"contextMenus",
		"clipboardWrite"
	],
	"background": {
		"page": "lib/background.html"
	},
	"content_scripts": [
		{
			"matches": ["<all_urls>"],
			"js": ["lib/content_script.js"]
		}
	]
}
