function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }
function is_firefox() { return navigator.userAgent.indexOf('Firefox') !== -1 }

function send_message_to_popup(err, text) {
    chrome.runtime.sendMessage({err, text})
}

function error(msg) {
    send_message_to_popup(`Failed to extract the text:\n\n${msg}`)
}

async function click(_, tab) {
    // if you move this call to send_message_to_popup(), Firefox will
    // complain 'openPopup requires a user gesture'
    await chrome.action.openPopup()

    // to content_script.js
    chrome.tabs.sendMessage(tab.id, "contextMenus", async res => {
        if (chrome.runtime.lastError) {
            return error(chrome.runtime.lastError.message
                         + "\n\nReload the page & retry.")
        }

        res = res || {}
        if (res.err) { return error(res.err) }
        if ( !(res.text && res.text.trim().length)) {
            return error('No useful data in the attributes.')
        }

        if (is_firefox()) await sleep(100) // oh my days
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
