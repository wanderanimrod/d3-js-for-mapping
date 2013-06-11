#!/bin/bash

# See http://www.debian.org/doc/manuals/maint-guide/start.en.html
# See http://www.cyberciti.biz/tips/linux-debian-package-management-cheat-sheet.html

# To see what it installed try dpkg -l

echo "Going to install all the build tools we need..."

sudo apt-get update

sudo apt-get install -y debhelper dh-make devscripts gnupg lintian patch patchutils pbuilder fakeroot file

sudo apt-get install -y python-pip

wget https://bitbucket.org/pypa/setuptools/raw/0.7.2/ez_setup.py -O - | sudo python

sudo easy_install virtualenv

mkdir ~/.virtualenvs

cd ~/.virtualenvs

virtualenv --no-site-packages packaging

cd ~/Code/spikes/packaging
