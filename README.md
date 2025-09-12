# Copy Anchor Text

A browser extension (manifest v3) to copy link text or image title/alt
via a context menu. Unlike other similar junk, this one actually
works, & reports errors via a popup.

* [Chrome Web Store](https://chromewebstore.google.com/detail/copyanchortext/ejchelcnfibgbamkmkcobhbiiobglpgk)
* [Firefox Addons](https://addons.mozilla.org/en-US/firefox/addon/copy_anchor_text/)
* [.crx file](https://sigwait.org/~alex/demo/chrome/)

The scary 'Access your data for all websites' permission means it
injects a `contextmenu` listener to be able to grab text from `<a>` &
`<img>`.

## Firefox notes

If you hold down <kbd>Shift</kbd> key while right-clicking, then
`contextmenu` doesn't fire & the extension complains.

## Compilation

    $ sudo dnf install jq jsonnet
    $ make crx

The result should be in `_out` dir.

## License

MIT.

The icon is from
[Intrigue Icon Set](http://sourceforge.net/projects/intrigue-icons/).
