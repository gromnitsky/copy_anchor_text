async function send_message_to_popup(err, text) {
    await chrome.action.openPopup()
    chrome.runtime.sendMessage({err, text})
}

function error(msg) {
    send_message_to_popup(`Failed to extract the text:\n\n${msg}`)
}

function click(_, tab) {
    // to content_script.js
    chrome.tabs.sendMessage(tab.id, "contextMenus", res => {
        if (chrome.runtime.lastError) {
            return error(chrome.runtime.lastError.message
                         + "\n\nReload the page & retry.")
        }

        res = res || {}
        if (res.err) { return error(res.err) }
        if ( !(res.text && res.text.trim().length)) {
            return error('No useful data in the attributes.')
        }

        // ask to copy
        send_message_to_popup(null, res.text)
    })
}

chrome.contextMenus.onClicked.addListener(click)

// the callback shouldn't run each time chrome wakes up the extension
chrome.runtime.onInstalled.addListener(() => {
    console.info('add a menu item')
    chrome.contextMenus.create({
        "id": "0",
        "title": "Copy link 🔗 text or image ☯️ title/alt",
        "contexts": ["link", "image"]
    })
})
