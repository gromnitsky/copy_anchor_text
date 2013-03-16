{
	"manifest_version": 2,
	"name": "Copy Anchor Text",
	"description": "Adds an item to right click menu to copy link name",
	"icons": {
		"128": "icons/128.png"
	},
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
