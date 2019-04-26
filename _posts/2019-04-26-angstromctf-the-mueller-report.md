---
layout: post
asset: "/assets/posts/angstromctf/"
title: "AngstromCTF2019: The Mueller Report"
date: 2019-04-26 16:11:55 +1000
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
description: "Using commandline tools to extract data from PDFs"
excerpt_separator: <!--more-->
---

AngstromCTF2019: The Mueller Report
====================================

The Challenge
-------------

> The Mueller Report
> Misc
> 20pts
>
> The redacted version of the Mueller report was finally released this week! There's some pretty funny stuff in there, but maybe the report has more beneath the surface.
>
> link:https://mega.nz/#!SsMDmAhT!MjplSc7lCqUQFrZC5EL_t7f2fdoDDNwrZhfTgTAcG7s

<!--more-->

The Solution
------------

Running [strings](https://linux.die.net/man/1/strings) will reveal the flag:

```text
# strings full-mueller-report.pdf | grep "actf"
actf{no0o0o0_col1l1l1luuuusiioooon}
```

![]({{ page.asset }}9E438117688F31D47DDB762F0F8EF625.png)
