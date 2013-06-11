#!/bin/bash

# See http://www.debian.org/doc/manuals/packaging-tutorial/packaging-tutorial

echo "Going to build the debian package..."

source pyenv.sh

python setup.py sdist

mkdir -p dist/debian

cp dist/BusyBee-1.0.tar.gz dist/debian/busybee_1.0.orig.tar.gz

cd dist/debian

tar xf busybee_1.0.orig.tar.gz 

mv BusyBee-1.0/ busybee-1.0

cd busybee-1.0

mkdir debian

dch --create -v 1.0-1 --package busybee

echo 8 >> debian/compat

cp ../../../debian/control debian/control

echo "" >> debian/copyright

cp ../../../debian/rules debian/rules

mkdir -p debian/source

echo "3.0 (quilt)" >> debian/source/format

# it makes the package one level up
# you can now install and remove them when you like..
# install: sudo dpkg -i busybee_1.0-1_amd64.deb 
# remove : sudo dpkg -r busybee


