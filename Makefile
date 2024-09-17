browser := chrome
out := _out/$(shell git rev-parse --abbrev-ref HEAD)/$(browser)
src := $(shell find src -type f | grep -v '\.jsonnet')
dest := $(patsubst src/%, $(out)/ext/%, $(src)) $(out)/ext/manifest.json
jsonnet := jsonnet --tla-code 'browser="$(browser)"'
pkg := $(out)/$(shell $(jsonnet) src/manifest.jsonnet | jq -r '.name+"-"+.version')

all: $(dest)

$(out)/ext/%: src/%
	$(mkdir)
	cp $< $@

$(out)/ext/%.json: src/%.jsonnet
	$(mkdir)
	$(jsonnet) $< -o $@

crx: $(pkg).crx
$(pkg).crx: _out/private.pem $(dest)
	google-chrome --pack-extension=$(out)/ext --pack-extension-key=$<
	mv $(out)/ext.crx $(pkg).crx

zip: $(pkg).zip
$(pkg).zip: $(dest)
	cd $(dir $<) && zip -qr $(CURDIR)/$@ *

_out/private.pem:
	$(mkdir)
	openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out $@

upload: $(pkg).crx
	scp $< gromnitsky@web.sourceforge.net:/home/user-web/gromnitsky/htdocs/js/chrome/

mkdir = @mkdir -p $(dir $@)
