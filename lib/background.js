/*global chrome:true */

var copyToClipboard = function(value) {
	var em = document.getElementById('copy_here')
	em.value = value
    em.select()
    document.execCommand("copy", false, null)
}

var onClickCallback = function(info, tab) {
	// send a message to content_script.js
	chrome.tabs.sendMessage(tab.id, "menuClick", function(respond) {
		if (chrome.runtime.lastError) {
			alert("Couldn't get anchor text: " + chrome.runtime.lastError.message)
			return
		}
		if (!respond || respond.match(/^\s*$/)) {
			alert("Couldn't get anchor text.")
			return
		}

		console.log(respond)
		copyToClipboard(respond)
	})
}

chrome.contextMenus.create({
	"id": "0",
	"title": "Copy Anchor Text",
	"contexts": ["link"],
	"onclick" : onClickCallback
})
