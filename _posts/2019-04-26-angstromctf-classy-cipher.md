---
layout: post
asset: "/assets/posts/angstromctf2019/"
title: "AngstromCTF2019: Classy Cipher"
date: 2019-04-26 16:07:20 +1000
categories: [writeup, crypto]
tags: [ctf, 2019, angstrom, crypto]
author: Morgaine Timms
license: CC-BY-4.0
thumbnail: 
thumbnailAttr: 
thumbnailAttrUrl: 
thumbnailAlt: 
published: true
toc: false
description: "Deciphering an ASCII rotation cipher"
excerpt_separator: <!--more-->
---
AngstromCTF2019: Classy Cipher
===============================

The Challenge
-------------

> Classy Cipher
> Crypto
> 20
> >
> Every CTF starts off with a Caesar cipher, but we're more classy.
>
> Author: defund
>
> link: https://files.actf.co/2e1940179916e0501fbba0de705a668e42646c916276d7a51ad6a2d2cc381720/classy_cipher.py

<!--more-->

The linked file is a simple python script.

```python
from secret import flag, shift

def encrypt(d, s):
	e = ''
	for c in d:
		e += chr((ord(c)+s) % 0xff)
	return e

assert encrypt(flag, shift) == ':<M?TLH8<A:KFBG@V'
```

The Solution
------------

The python script rotates characters by an unknown amount. The character rotation must be less than 255 (the ASCII range) as enforced by `​% 0xff`​ in the `​encrypt()`​ function.

The rotation can be calculated because the first 4 values of the flag are known:

`​:<M?`​ *must* be `​actf`​

The easiest way to calculate the shift is using the `encrypt()` algorithm to compare the known characters.

```python
def shift_test(have, want):
    for x in range(255):
        tested = encrypt(want, x)
        if tested == have:
            return x
```

After calculating the rotation, a lookup table can be created for all ascii values and used to decipher the ciphertext

```python
def generate_table(shift):
    table = {}
    # generate all ascii chars
    for x in range(255):
        # get the key and its cipher equivalent
        key = chr(x)
        cipheredKey = encrypt(key,shift)
        # add to table
        table[cipheredKey] = key
    return table

def decipher(ciphertext, shift):
    lookup = generate_table(shift)
    out = ''
    for char in ciphertext:
        out += lookup[char]
    return out
```

Combining the above scripts reveals the flag:

* The rotation was 216
* The flag is actf{so_charming}

Here is the script I used, commented for clarity

```python
#from secret import flag, shift

def encrypt(d, s):
	e = ''
	for c in d:
		e += chr((ord(c)+s) % 0xff)
	return e

#assert encrypt(flag, shift) == ':<M?TLH8<A:KFBG@V'

# test for the correct shift
def shift_test(have, want):
    for x in range(255):
        tested = encrypt(want, x)
        if tested == have:
            return x

def generate_table(shift):
    table = {}
    # generate all ascii chars
    for x in range(255):
        # get the key and its cipher equivalent
        key = chr(x)
        cipheredKey = encrypt(key,shift)
        # add to table
        table[cipheredKey] = key
    return table

def decipher(ciphertext, shift):
    lookup = generate_table(shift)
    out = ''
    for char in ciphertext:
        out += lookup[char]
    return out

# algorithm starts here

# we know the flag
ciphertext = ':<M?TLH8<A:KFBG@V'
# test for the shift used to get the known part of the flag
shift = shift_test(have=':<M?', want='actf')
print(f'Shift is: {shift}')

# generate a lookup table and print the flag
flag = decipher(ciphertext, shift)
print(f"The flag says: {flag}")

```