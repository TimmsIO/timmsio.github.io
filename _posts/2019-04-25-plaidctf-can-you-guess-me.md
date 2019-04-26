---
layout: post
title: "PlaidCTF2019: Can You Guess Me"
date: 2019-04-25 10:38:14 +1000
categories: [writeup, misc]
tags: [ctf, 2019, plaid, misc]
author: Morgaine Timms
license: CC-BY-4.0
thumbnail: 
thumbnailAttr: 
thumbnailAttrUrl: 
thumbnailAlt: 
published: true
toc: false
description: "Code injection in a simple python application"
excerpt_separator: <!--more-->
---

# PlaidCTF2019 - Can You Guess Me 

Misc - 100pts

## The Challenge

The challenge text leads to the python code running the challenge.

``` txt
Misc (100 pts)
Here's the source to a guessing game: here 

You can access the server at

nc canyouguessme.pwni.ng 12349
```

<!--more-->

``` python
#! /usr/bin/env python3

from sys import exit
from secret import secret_value_for_password, flag, exec

print(r"")
print(r"")
print(r"  ____         __   __           ____                     __  __       ")
print(r" / ___|__ _ _ _\ \ / /__  _   _ / ___|_   _  ___  ___ ___|  \/  | ___  ")
print(r"| |   / _` | '_ \ V / _ \| | | | |  _| | | |/ _ \/ __/ __| |\/| |/ _ \ ")
print(r"| |__| (_| | | | | | (_) | |_| | |_| | |_| |  __/\__ \__ \ |  | |  __/ ")
print(r" \____\__,_|_| |_|_|\___/ \__,_|\____|\__,_|\___||___/___/_|  |_|\___| ")
print(r"                                                                       ")
print(r"")
print(r"")

try:
    val = 0
    inp = input("Input value: ")
    count_digits = len(set(inp))
    if count_digits <= 10:          # Make sure it is a number
        val = eval(inp)
    else:
        raise

    if val == secret_value_for_password:
        print(flag)
    else:
        print("Nope. Better luck next time.")
except:
    print("Nope. No hacking.")
    exit(1)
```

## The Solution

The exploitable flaw in 'Can You Guess Me' is twofold:
1. the use of [python's `eval()` built-in function](https://docs.python.org/3/library/functions.html#eval); and
2. ineffective input sanitisation [using python's `set()` built-in cast function](https://docs.python.org/3/library/functions.html#func-set)

`set()` counts unique elements, and allows for the use longer input _as long as there are repeated characters_. For example:

``` python
>>> len(set("aaaaaaaaaaaaaaaa"))
1
```

The input `print(vars())` is sufficient to bypass the ineffective sanitisation.

There are also other python commands which fit under the character limit without using the `set()` flaw.
`help(flag)` produces a very helpful error message:

``` txt
Input value: help(flag)
No Python documentation found for 'PCTF{hmm_so_you_were_Able_2_g0lf_it_down?_Here_have_a_flag}'.
Use help() to get the interactive help utility.
Use help(str) for help on the str class.

Nope. Better luck next time.
```
