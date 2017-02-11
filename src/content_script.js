/* global chrome */

let MyAnchor = null

// listen to a message from event_page.js
chrome.extension.onMessage.addListener(function(req, sender, sendRes) {
    if (req !== "menuClick")
	throw new Error('invalid message from event_page.js: ' + req)

    sendRes(MyAnchor)
})

document.addEventListener('contextmenu', function(event) {
    MyAnchor = event.target.innerText
}, true)
