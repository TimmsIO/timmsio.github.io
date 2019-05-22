---
layout: post
asset: "/assets/posts/angstromctf2019/"
title: "AngstromCTF2019: Blank Paper"
date: 2019-04-26 15:47:57 +1000
categories: [writeup, misc]
tags: [ctf, 2019, angstrom, misc]
points: 30
author: Morgaine Timms
license: CC-BY-4.0
thumbnail: 
thumbnailAttr: 
thumbnailAttrUrl: 
thumbnailAlt: 
published: true
toc: false
description: "Reading a slightly malformed PDF document"
excerpt_separator: <!--more-->
---

AngstromCTF2019: Blank Paper
=============================

The Challenge
-------------

> Blank Paper
> Misc
> 30pts
>
> Someone scrubbed defund's paper too hard, and a few of the bytes fell off.
>
> Author: defund
>
> link: https://files.actf.co/26e1d969c6a7c21d973a64a67f74ea2695ee5b8743cd8f20d9ccde665bbfd368/blank\_paper.pdf

<!--more-->

The Solution
------------

The PDF appears unusable to a large number of PDF viewers.

![]({{ page.asset }}ACAD1086EB7E7027810D87D028B76AE3.jpg)

But the PDF viewers built into modern browsers are often a little more tolerant. Opening in FireFox reveals the flag:

![]({{ page.asset }}0FABC1142B992E2FF3A292BB97B3E495.png)

