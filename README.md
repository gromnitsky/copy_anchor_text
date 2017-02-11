# Copy Anchor Text

Chrome 50+ extension.

Adds an item to the context menu named 'Copy Anchor Text' for copying
a link name. Unlike other similar extensions this one actually works.

## Build requirements

* GNU make
* `npm -g i json`.
* xxd util

## Making a custom crx

1. Generate a private RSA key:

	`$ openssl genrsa -out private.pem 1024`

2. To generate a .crx, type `make` & you should get
   `_build/copy_anchor_text-x.y.z.crx`.


## Bugs

* `contextmenu` event won't fire on a page with html frames.
* On some Google+ elements, the respond to a message from a background
  page vanishes.


## License

MIT.

The icon is from
[Intrigue Icon Set](http://sourceforge.net/projects/intrigue-icons/).
