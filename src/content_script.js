/* global chrome */

let CapturedData = null

// listen to a message from event_page.js
chrome.extension.onMessage.addListener(function(req, sender, sendRes) {
    if (req !== "menuClick")
	throw new Error('invalid message from event_page.js: ' + req)

    if (CapturedData === null) {
	sendRes({ err: "Contextmenu event didn't fire, blame the web page!" })
	return
    }

    sendRes({ text: CapturedData })
    CapturedData = null
})

// a capturing event
document.addEventListener('contextmenu', function(event) {
    let n = event.target
    CapturedData = n.innerText || n.title || n.alt
}, true)
