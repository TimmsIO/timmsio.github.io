---
layout: post
asset: "/assets/posts/angstromctf2019/"
title: "AngstromCTF2019: One Bite
"
date: 2019-04-26 16:10:14 +1000
categories: [writeup, rev]
tags: [ctf, 2019, angstrom, rev]
points: 60
author: Morgaine Timms
license: CC-BY-4.0
thumbnail: 
thumbnailAttr: 
thumbnailAttrUrl: 
thumbnailAlt: 
published: true
toc: false
description: "XOR of a byte-wise XOR"
excerpt_separator: <!--more-->
---

AngstromCTF2019: One Bite
==========================

The Challenge
-------------

> One Bite
> Rev
> 60
>
> Whenever I have friends over, I love to brag about things that I can eat in a single bite. Can you give this program a tasty flag that fits the bill?
>
> /problems/2019/one_bite
>
> Author: SirIan

A binary file is also provided.

<!--more-->

The Solution
------------

After decompiling the code with [Ghidra](https://github.com/NationalSecurityAgency/ghidra) and cleaning it up a little:

```c
undefined8 main(void)

{
  int  test;
  size_t  break_condition;
  long in_FS_OFFSET;
  int  counter;
  byte input[40];
  long local_20;

  local_20 = *(long *)(in_FS_OFFSET + 0x28);
  puts("Give me a flag to eat: ");
  fgets((char *)input, 0x22, stdin);
   counter = 0;
  while (true)
  {
     break_condition = strlen(input);
    if ( break_condition <= counter)
      break;
    input[counter] =  input[counter] ^ 0x3c;
     counter =  counter + 1;
  }
   test = strcmp(input, "]_HZGUcHTURWcUQc[SUR[cHSc^YcOU_WA");
  if ( test == 0)
  {
    puts("Yum, that was a tasty flag.");
  }
  else
  {
    puts("That didn\'t taste so good :(");
  }
  if (local_20 != *(long *)(in_FS_OFFSET + 0x28))
  {
    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return 0;
}

```

The user input gets [XORed](https://en.wikipedia.org/wiki/Exclusive_or) byte-wise with `​0x3c`​ and compared against a string `​]_HZGUcHTURWcUQc[SUR[cHSc^YcOU_WA`​.

The inverse of XOR is XOR, so using `0x3c​`​ to reverse the string should yield the flag.

This is a great utility for operations like this: <https://gchq.github.io/CyberChef/>

The XOR returns the flag:

```text
Key = 3c: actf{i_think_im_going_to_be_sick}
```