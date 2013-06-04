#!/usr/bin/env python

#from distutils.core import setup
# you may need setuptools instead of distutils

from setuptools import setup

setup(name='BusyBee',
      version='1.0',
      description='A simple test application for demonstrating debian packaging',
      author='Jim Barritt',
      author_email='jim@foobar.com',
      url='http://foobar.com',
      packages=['busybee'],
      scripts = [
          'scripts/busybee'
      ]
     )



