# Copy Anchor Text

Chrome 25+ extension.

Adds an item to right click menu named 'Copy Anchor Text' to copy link
name. Unlike other similar extensions this one actually works.

## BUGS

* `contextmenu` won't fire on page with html frames.
* On some Google+ elements the respond to a message from a background
  page vanishes.

## Build requirements:

* jsontool in global mode.
* GNU m4
* xxd utility.
* GNU make.

## Compilation

To compile, run

    $ make compile

To make a .crx file, you'll need a private RSA key named `private.pem`
in the same directory where Makefile is. For testing purposes, generate
it with openssl:

    $ openssl genrsa -out private.pem 1024

and run:

    $ make crx

If everything was fine, `copy_anchor_text-x.y.z.crx` file will
appear.

## License

MIT.

The icon is from
[Intrigue Icon Set](http://sourceforge.net/projects/intrigue-icons/).
