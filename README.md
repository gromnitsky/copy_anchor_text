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

## License

MIT.

The icon is from
[Intrigue Icon Set](http://sourceforge.net/projects/intrigue-icons/).
