#!/bin/bash

# To run this do
# wget -O initialise-build-server.sh https://raw.github.com/ureport/spikes/master/packaging/initialise-build-server.sh; sh ./initialise-build-server.sh
# 

echo "Going to set up this server with everything you need to build debian packages..."

sudo apt-get install -y git

mkdir ~/Code

cd Code

git clone git://github.com/ureport/spikes.git

cd spikes/packaging

./install-debian-build-tools.sh

echo "Setup complete."
