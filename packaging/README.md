# setup.py

`setup.py` is the basic installation mechanism for python. It can do everything for us.

The `setup.py` in this folder is configured to install a simple python script `busybee`. 

You can test this out by typing

    python setup.py install

It works best if you are using `virtualenv` and first activate your environment, otherwise you will need to `sudo` it.

Using `virtualenv`, it will install the script into the `bin` folder of the env and then you should be able to...

   busybee



# Mainly use fpm

https://github.com/jordansissel/fpm#readme

  gem install fpm

  fpm -s python -t deb setup.py

# On the server

  dpkg -i package.deb

To see what files were installed and where...

   dpkg -L package.deb

# Deep inside a debian package

Debian packages are `ar` zip files, so you can look at one like...

  ar t nodejs_0.2.0_amd64.deb

You can look in your package by doing...

  dpkg -c python-busybee_1.0_all.deb 

