let CapturedData = null

function messages_from_service_worker(req, sender, res) {
    if (req !== "contextMenus")
        throw new Error('invalid message from service_worker.js: ' + req)

    if (CapturedData === null) {
        res({ err: "Contextmenu event didn't fire, blame the web page!" })
        return
    }

    res({ text: CapturedData })
    CapturedData = null
}

chrome.runtime.onMessage.addListener(messages_from_service_worker)

document.addEventListener('contextmenu', function(event) {
    let n = event.target
    CapturedData = n.innerText || n.title || n.alt
}, true)
