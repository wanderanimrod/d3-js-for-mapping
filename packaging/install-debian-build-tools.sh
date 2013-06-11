#!/bin/bash

# See http://www.debian.org/doc/manuals/maint-guide/start.en.html

echo "Going to install all the build tools we need..."

sudo apt-get update

sudo apt-get install -y debhelper dh-make devscripts gnupg lintian patch patchutils pbuilder fakeroot file
