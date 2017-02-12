/* globals chrome */

let clipboard_write = function(str) {
    let node = document.querySelector('textarea')
    node.value = str
    node.select()
    document.execCommand("copy", false, null)
}

let click = function(info, tab) {
    let complain = (msg) => alert("Failed to extract the text:\n\n" + msg)

    // send a message to content_script.js
    chrome.tabs.sendMessage(tab.id, "menuClick", (res) => {
	if (chrome.runtime.lastError) {
	    complain(chrome.runtime.lastError.message
		    + "\n\nReload the page & retry.")
	    return
	}

	res = res || {}
	if (res.err) {
	    complain(res.err)
	    return
	}
	if ( !(res.text && res.text.trim().length)) {
	    complain('No useful data in the attributes.')
	    return
	}

	console.log(res.text.length, `${res.text.slice(0, 9)}…`)
	clipboard_write(res.text)
    })
}

chrome.contextMenus.onClicked.addListener(click)
// a stage area for clipboard
document.body.appendChild(document.createElement("textarea"))

// the callback shouldn't run each time chrome wakes up the extension
chrome.runtime.onInstalled.addListener(() => {
    console.info('add a menu item')
    chrome.contextMenus.create({
	"id": "0",
	"title": "֎",
	"contexts": ["link", "image"]
    })
})
