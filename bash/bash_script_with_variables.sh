#!/bin/bash

read -p "variable name: " NAME

if [[ -z "${NAME}" ]]; then
    echo -e "\nERROR: You must pass in a variable name'\n"
    exit -1
fi

echo $NAME
