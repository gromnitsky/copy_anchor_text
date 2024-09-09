function clipboard_write(s) {
    let node = document.querySelector('textarea')
    node.value = s
    node.select()
    document.execCommand('copy')
}

chrome.runtime.onMessage.addListener( req => {
    if (req.target === 'offscreen.html') {
        req.err ? alert(req.err) : clipboard_write(req.text)
    }
    window.close()
})
