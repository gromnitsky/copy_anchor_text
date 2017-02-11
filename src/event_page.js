/* globals chrome */

let clipboard_write = function(str) {
    let node = document.querySelector('textarea')
    node.value = str
    node.select()
    document.execCommand("copy", false, null)
}

let click = function(info, tab) {
    let msg = 'Failed to extract the anchor text'

    // send a message to content_script.js
    chrome.tabs.sendMessage(tab.id, "menuClick", (res) => {
	if (chrome.runtime.lastError) {
	    alert(`${msg}: ${chrome.runtime.lastError.message}`)
	    return
	}
	if ( !(res && res.trim().length)) {
	    alert(msg)
	    return
	}

	console.log(res.length, `${res.slice(0, 9)}…`)
	clipboard_write(res)
    })
}

chrome.contextMenus.onClicked.addListener(click)
// a stage area for clipboard
document.body.appendChild(document.createElement("textarea"))

// the callback shouldn't run each time chrome wakes up the extension
chrome.runtime.onInstalled.addListener(() => {
    console.info('creating a menu item')
    chrome.contextMenus.create({
	"id": "0",
	"title": "֎",
	"contexts": ["link"]
    })
})
