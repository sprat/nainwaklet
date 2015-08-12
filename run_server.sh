#!/bin/bash
pushd $(dirname $0) > /dev/null
python2 -m SimpleHTTPServer 8080
popd > /dev/null