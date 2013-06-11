#!/bin/bash

# See http://www.debian.org/doc/manuals/packaging-tutorial/packaging-tutorial

echo "Going to build the debian package..."

tar cvzf dist/hello_1.0.orig.tar.gz hello/ say-hello.py 

mkdir -p dist/debian
cd dist/debian

tar xf hello_1.0.orig.tar.gz 

cd hello-1.0

mkdir debian

dch --create -v 1.0-1 --package hello

echo 8 >> debian/compat

cp ../../../conf/debian/control debian/control

echo "" >> debian/copyright

cp ../../../conf/debian/rules debian/rules

mkdir -p debian/source

echo "3.0 (quilt)" >> debian/source/format

# it makes the package one level up
# you can now install and remove them when you like..
# install: sudo dpkg -i busybee_1.0-1_amd64.deb 
# remove : sudo dpkg -r busybee


