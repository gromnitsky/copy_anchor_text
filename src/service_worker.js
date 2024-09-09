function send_message(err, text) {
    chrome.runtime.sendMessage({ target: 'offscreen.html', err, text })
}

async function click(info, tab) {
    await chrome.offscreen.createDocument({
        url: chrome.runtime.getURL('offscreen.html'),
        reasons: ['CLIPBOARD'],
        justification: 'Write text to the clipboard',
    })

    let error = msg => send_message("Failed to extract the text:\n\n" + msg)

    // send a message to content_script.js
    chrome.tabs.sendMessage(tab.id, "menuClick", function menuClick(res) {
        if (chrome.runtime.lastError) {
            return error(chrome.runtime.lastError.message
                         + "\n\nReload the page & retry.")
        }

        res = res || {}
        if (res.err) { return error(res.err) }
        if ( !(res.text && res.text.trim().length)) {
            return error('No useful data in the attributes.')
        }

        console.log(res.text.length, `${res.text.slice(0, 9)}…`)
        send_message(null, res.text)
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
