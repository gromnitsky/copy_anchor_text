function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }

function send_message_to_popup(err, text) {
    chrome.runtime.sendMessage({err, text})
}

function error(msg) {
    send_message_to_popup(`Failed to extract the text:\n\n${msg}`)
}

function validate_url(str) {
    let url
    try {
        url = new URL(str)
    } catch (_) {
        return false
    }
    let protocols = ['chrome:', 'about:', 'edge:']
    if (protocols.indexOf(url.protocol) !== -1) return false
    return [
        'chromewebstore.google.com',
        'addons.mozilla.org',
        'microsoftedge.microsoft.com',
    ].indexOf(url.hostname) === -1
}

async function click(info, tab) {
    // if you move this call to send_message_to_popup(), Firefox will
    // complain 'openPopup requires a user gesture'
    await chrome.action.openPopup()

    // to content_script.js
    chrome.tabs.sendMessage(tab.id, "contextMenus", async res => {
        await sleep(100) // oh my days

        if (!validate_url(info.frameUrl || info.pageUrl)) {
            return error('Certain pages are protected from browser extensions.')
        }

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
