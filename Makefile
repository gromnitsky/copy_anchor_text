.DELETE_ON_ERROR:

out := _build
pkg.name := $(shell json -e 'this.q = this.name + "-" + this.version' q < src/manifest.json)

mkdir = @mkdir -p $(dir $@)
src := $(shell find src -type f)

# crx generation

.PHONY: crx
crx: $(out)/$(pkg.name).crx

$(out)/$(pkg.name).zip: $(src)
	$(mkdir)
	cd $(dir $<) && zip -qr $(CURDIR)/$@ *

%.crx: %.zip private.pem
	./zip2crx.sh $< private.pem


# sf

.PHONY: upload
upload:
	scp $(out)/$(pkg.name).crx gromnitsky@web.sourceforge.net:/home/user-web/gromnitsky/htdocs/js/chrome/
