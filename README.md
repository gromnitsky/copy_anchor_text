# Copy Anchor Text

A Chrome 73+ extension.

(Download the .crx file
[here](http://gromnitsky.users.sourceforge.net/js/chrome/).)

Adds an item to the context menu (arbitrary drawn as '֎') for copying
a link anchor text or the value of title/alt attributes for an image.

Unlike other similar extensions this one actually works.

# News

**0.1.0**

- Reduce the memory usage by switching to an 'Event Page', instead of
  a persistent bg page.
- Add img support.

## Compilation

    $ make crx

The result should be in `_out` dir.

## Implementation notes

Why doesn't it use the celebrated `activeTab` permission (+
 `chrome.tabs.executeScript()`) instead of `<all_urls>`?

The only way to get hold of a DOM node for which the `contextmenu`
event was fired is to register an event handler first (on a parent of
the node). This is what the extension does via injecting its content
script into all the web pages.

But if we do `executeScript()` on demand, than the `contextmenu` event
doesn't fire in the injected script *iff* `executeScript()` runs for
the 1st time, for the `contextmenu` event happens before the
injection, hence the injected script doesn't see it.

## License

MIT.

The icon is from
[Intrigue Icon Set](http://sourceforge.net/projects/intrigue-icons/).
