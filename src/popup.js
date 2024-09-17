function clipboard_write(s) {
    let node = document.querySelector('textarea')
    node.value = s
    node.select()
    document.execCommand('copy')
}

function error(msg) {
    document.querySelector('#error').innerText = msg
}

chrome.runtime.onMessage.addListener( req => {
    if (req.err) return error(req.err)
    clipboard_write(req.text)
    window.close()
})

document.querySelector('html').onclick = () => window.close()
