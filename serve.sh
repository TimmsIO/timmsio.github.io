#! /bin/bash
if [ "$1" = "lan" ]; then
bundle exec jekyll serve --host=0.0.0.0
else
bundle exec jekyll serve
fi