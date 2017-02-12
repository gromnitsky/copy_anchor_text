# Copy Anchor Text

A Chrome 50+ extension.

(Download the compiled extension [here](http://gromnitsky.users.sourceforge.net/js/chrome/).)

Adds an item to the context menu (arbitrary drawn as '֎') for copying
a link anchor text or the value of title/alt attributes for an image.

Unlike other similar extensions this one actually works.

# News

**0.1.0**

- Reduce the memory usage by switching to an 'Event Page', instead of
  a persistent bg page.
- Add img support.


## Build requirements

* GNU make
* `npm -g i json`.
* xxd util

## Compiling

1. Generate a private RSA key:

	`$ openssl genrsa -out private.pem 1024`

2. To generate a .crx, type `make`; you should get
   `_build/copy_anchor_text-x.y.z.crx`.


## License

MIT.

The icon is from
[Intrigue Icon Set](http://sourceforge.net/projects/intrigue-icons/).
