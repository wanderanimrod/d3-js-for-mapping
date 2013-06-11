#!/usr/bin/env python
from distutils.sysconfig import get_python_lib
print "My python lives in [%s]" % get_python_lib()

from hello.commands import say_hello


say_hello()
