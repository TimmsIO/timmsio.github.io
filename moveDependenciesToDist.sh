#! /bin/bash

declare -A files

# setup the move for multi.js files
files["_excludes/multi.js/dist/multi.min.css"]="assets/css/multi/"
files["_excludes/multi.js/dist/multi.min.js"]="assets/js/multi/"
# files["_excludes/pushy-buttons/css/pushy-buttons.min.css"]="assets/css/pushyButtons/"

for key in ${!files[@]}; do
    cp ${key} ${files[${key}]}
done