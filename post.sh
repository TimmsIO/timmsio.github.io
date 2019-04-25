#!/bin/bash

###########################################
# This is from: https://gist.github.com/daarashaw/6107707
# and has been modified slightly to match the way I am abusing jekyll
###########################################


#---------/---------------------\---------#
#--------|- Jekyll Post Creator -|--------#
#---------\---------------------/---------#
# Thanks to davejamesmiller for his ask function, found here:
# https://gist.github.com/davejamesmiller/1965569


# Post creator designed to remove the repetitive aspects of writing posts in Jekyll.

# Simply put the script in your site directory, edit the configs to fit your setup, and run it with:
# ./post "post title"

# What is does:
# - creates the post with the correct format of date and title
# - adds YAML front-matter (layout, title, comments (if using custom yaml comments section), date, categories)
# - opens the post file in editor chosen


########## Configs ##########

# Post layout
layout=post

# Post comments (lowercase please)
comments=false

# Post text editor
editor=code

# Post directory
folder=_posts/

########## Program ##########

# show help with -h
if [ "$1" == "-h" ]; then
  echo "Usage: `basename $0` \"Post title\""
  exit 0
elif [ -z "$1" ]; then
  echo "Usage: `basename $0` \"Post title\""
  exit 0
fi

# Y/n ask function
function ask {
    while true; do

        if [ "${2:-}" = "true" ]; then
            prompt="Y/n"
            default=Y
        elif [ "${2:-}" = "false" ]; then
            prompt="y/N"
            default=N
        else
            prompt="y/n"
            default=
        fi

        # Ask the question
        read -p "$1 [$prompt] " REPLY

        # Default?
        if [ -z "$REPLY" ]; then
            REPLY=$default
        fi

        # Check if the reply is valid
        case "$REPLY" in
            Y*|y*) return 0 ;;
            N*|n*) return 1 ;;
        esac

    done
}

function get () {
  # Ask the question
  prompt="text"
  read -p "$1 [$prompt] " REPLY
  echo $REPLY
}

##### Variables #####

# post title
title="$1"

# convert title to filepath format
# echo part replaces spaces with '-'
# awk converts it to lowercase
# sed keeps only lowercase letters and '-'
filetitle=$( echo ${1// /-} | awk '{print tolower($0)}'| sed 's/[^a-z\-]*//g')

# name of file
filename="`date +%F`-$filetitle"
filepath="$folder$filename.md"
echo "$filepath"


########## Adding to file ##########

## setup the frontmatter
echo "---" >> "$filepath"
echo "layout: $layout" >> "$filepath"
if ask "Has Assets?" ; then
  echo "asset: \"assets\\posts\\$filepath\"" >> "$filepath"
  mkdir assets/posts/$filename
fi
echo "title: \"$title\"" >> "$filepath"
echo "date: `date +%F\ %H:%M:%S\ %z`" >> "$filepath"
if ask "Is Blog?" ; then
  echo "categories: [blog]" >> "$filepath"
else
  ctftype=$(get "CTF Category?")
  echo "categories: [writeup, $ctftype]" >> "$filepath"
fi
echo "author: Morgaine Timms" >> "$filepath"
echo "license: CC-BY-4.0" >> "$filepath"
echo "thumbnail: " >> "$filepath"
echo "thumbnailAttr: " >> "$filepath"
echo "thumbnailAttrUrl: " >> "$filepath"
echo "thumbnailAlt: " >> "$filepath"
echo "published: false" >> "$filepath"
echo "toc: false" >> "$filepath"
echo "description: \"TODO:\"" >> "$filepath"
echo "excerpt_separator: <!--more-->" >> "$filepath"
echo "---" >> "$filepath"

## setup the body of the post
echo >> "$filepath"
echo >> "$filepath"
echo "<!--more-->" >> "$filepath"
echo >> "$filepath"



# open in chosen editor
# if [ "$editor" == "code" ]; then
#   code "$filepath"
# else
#   $editor "$filepath"
# fi
