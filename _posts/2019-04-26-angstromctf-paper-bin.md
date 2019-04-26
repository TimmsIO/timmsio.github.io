---
layout: post
asset: "/assets/posts/angstromctf2019/"
title: "AngstromCTF2019: Paper Bin"
date: 2019-04-26 16:10:48 +1000
categories: [writeup, misc]
tags: [ctf, 2019, angstrom, misc]
author: Morgaine Timms
license: CC-BY-4.0
thumbnail: 
thumbnailAttr: 
thumbnailAttrUrl: 
thumbnailAlt: 
published: true
toc: false
description: "Hexeditors can be very useful"
excerpt_separator: <!--more-->
---

AngstromCTF2019: Paper Bin
===========================

The Challenge
-------------

> Paper Bin
> Misc
> 40 pts
>
> defund accidentally deleted all of his math papers! Help recover them from his computer's raw data.
>
> Author: defund
>
> link: https://files.actf.co/ac4e8f7e16fb244613ffe42741046f98839e477e7a511d583dcc1bb291486029/paper_bin.dat

<!--more-->

The Solution
------------

This was a frustrating challenge simply because most tools designed to deal with PDFs happily read through the first PDF in the binary and report that is all there was.
Interestingly, different PDF readers would pick different PDFs from the file to display — but all would only display one PDF.

After inspecting the output from the excellent [pdf-parser.py by Didier Stevens](https://blog.didierstevens.com/2008/10/30/pdf-parserpy/) and deciding to use a hex editor, the PDFs in the .dat became clearer.

Searching for the PDF file header “%PDF” in the .dat file revealed the files. One of them appears to have a different version.

![]({{ page.asset }}6ED266953DEB27B53066DE71DEE358E9.png)

Carving the PDFs out of the file and opening the suspicious one revealed the flag.

![]({{ page.asset }}4713E54D36B8B377AF339BEA4687FA3E.png)