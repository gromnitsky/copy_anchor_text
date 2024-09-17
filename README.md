# Copy Anchor Text

A browser extension (manifest v3) to copy link text or image title/alt
via a context menu. Unlike other similar junk this one actually works.

* [Chrome Web Store](https://chromewebstore.google.com/detail/copyanchortext/ejchelcnfibgbamkmkcobhbiiobglpgk)
* [.crx file](http://gromnitsky.users.sourceforge.net/js/chrome/)

## Compilation

    $ sudo dnf install jq jsonnet
    $ make crx

The result should be in `_out` dir.

## Implementation notes from 2017

Why doesn't it use the celebrated `activeTab` permission (+
 `chrome.tabs.executeScript()`) instead of `<all_urls>`?

The only way to access a DOM node for which `contextmenu` event was
fired is by first registering an event handler (on a parent of the
node). This is what the extension accomplishes by injecting its
content script into all web pages.

But if we do `executeScript()` on demand, than the `contextmenu` event
doesn't fire in the injected script *iff* `executeScript()` runs for
the 1st time, for the `contextmenu` event happens before the
injection, hence the injected script doesn't see it.

## License

MIT.

The icon is from
[Intrigue Icon Set](http://sourceforge.net/projects/intrigue-icons/).
