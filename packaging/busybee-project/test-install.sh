#!/bin/bash

rm -rf python-busybee_1.0_all.deb

fpm -s python -t deb setup.py

scp python-busybee_1.0_all.deb ciserver:~
