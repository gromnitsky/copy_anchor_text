/*global chrome:true */

var MyAnchor = null				// lame approach

// listen to a message from background.js
chrome.extension.onMessage.addListener(function(req, sender, sendRes) {
	if (req !== "menuClick")
		throw new Error('invalid message from background.js: ' + req)

	console.log('copy_anchor_text: menuClick: ' + MyAnchor)
	sendRes(MyAnchor)
})

document.addEventListener('contextmenu', function(event) {
	MyAnchor = event.target.innerText
}, false)

console.log('copy_anchor_text: loaded')
