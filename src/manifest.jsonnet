function(browser="chrome") {
  "manifest_version": 3,
  "name": "copy_anchor_text",
  "version": "1.0.1",
  "description": "Copy link text or image title/alt via a context menu.",
  "icons": {
    "128": "icons/128.png"
  },
  "permissions": [
    "contextMenus",
    "clipboardWrite",
    "activeTab",
  ],
  "background": if browser == "firefox" then {
    "scripts": ["service_worker.js"]
  } else {
    "service_worker": "service_worker.js",
  },
  "action": {
    "default_popup": "popup.html",
    "default_icon": "icons/128.png"
  },
  "content_scripts": [{
    "matches": ["<all_urls>"],
    "js": ["content_script.js"]
  }]
}
