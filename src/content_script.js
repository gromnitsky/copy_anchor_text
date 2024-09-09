let CapturedData = null

// listen to a message from service_worker.js
chrome.runtime.onMessage.addListener(function(req, sender, sendRes) {
    if (req !== "menuClick")
	throw new Error('invalid message from service_worker.js: ' + req)

    if (CapturedData === null) {
	sendRes({ err: "Contextmenu event didn't fire, blame the web page!" })
	return
    }

    sendRes({ text: CapturedData })
    CapturedData = null
})

document.addEventListener('contextmenu', function(event) {
    let n = event.target
    CapturedData = n.innerText || n.title || n.alt
}, true)
