---
layout: post
asset: "/assets/posts/angstromctf2019/"
title: "AngstromCTF2019: Scratch It Out"
date: 2019-04-26 16:11:28 +1000
categories: [writeup, misc]
tags: [ctf, 2019, angstrom, misc]
points: 10
author: Morgaine Timms
license: CC-BY-4.0
thumbnail: 
thumbnailAttr: 
thumbnailAttrUrl: 
thumbnailAlt: 
published: true
toc: false
description: "Using the scratch programming language"
excerpt_separator: <!--more-->
---

AngstromCTF2019: Scratch It Out
================================

The Challenge
-------------

> Scratch It Out
> Misc
> 60
>
> An oddly yellow cat handed me this message - what could it mean?
>
> Author: innoviox
>
> link: https://files.actf.co/397a7663cfc657bea92b8038eb2a27804ac75ba56b74e56572e57f00414fd43f/project.json

<!--more-->

The Solution
------------

The linked file is a JSON document which appears to describe a scratch source document: [project.json]({{ page.asset }}782C53E83A8EC176B130C1FEC4767934.json)

[Scratch has an online interpreter](https://scratch.mit.edu/projects/editor/?tutorial=getStarted) the project can be loaded into:

![]({{ page.asset }}4F65FBD9DAFA2BE57BC24AA145F646C1.jpg)

The graphical source looks like this:

![]({{ page.asset }}F2C0A3642BA10A595C26B82A178C0D24.jpg)

Running the code reveals the flag in the animation area:

![]({{ page.asset }}0E5B0A3BEB3E038796C09FE1FDC90BEE.png)