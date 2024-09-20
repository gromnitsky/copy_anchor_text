function(browser="chrome") {
  "manifest_version": 3,
  "name": "copy_anchor_text",
  "version": "1.0.2",
  "description": "Copy link text or image title/alt via a context menu.",
  "icons": {
    "128": "icons/128.png"
  },
  "permissions": [
    "contextMenus",
    "clipboardWrite",
  ],
  "background": if browser == "firefox" then {
    "scripts": ["service_worker.js"]
  } else {
    "service_worker": "service_worker.js",
  },
  [if browser == "firefox" then "browser_specific_settings"]: {
    "gecko": {
      "id": "{4affb97e-d37f-4222-8dda-0ae3301ca039}",
      "strict_min_version": "130.0"
    }
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
