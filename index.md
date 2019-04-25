---
title: root
layout: default
date: 2017-10-29 19:32:55 +1100
contactShow: true
---

# Morgaine Timms

I'm an infosec nerd, security engineer, penetration tester, CTFer, and former software engineer. Oh, and I'm working on my OSCP.

I sometimes write [security-focused software](/projects),  [blog posts](/blog), and [CTF writeups for challenges I solved](/writeup).

Here are a few of the most recent:

{% for post in site.posts limit:4 %}
<p>
<h5><a href="{{ post.url }}">{{ post.title }}</a></h5>
<blockquote>{{ post.description }}</blockquote>
</p>
{% endfor %}

## Contact

Email: [PGP key][pgp]
<br>
Twitter: [sh3r4_hax][twitter]
<br>
Github: [Sh3r4][gh]
<br>
NPM: [timmsio][npm]
<br>
Keybase: [tiosect](https://keybase.io/tiosect)
<br>
LinkedIN: [Morgaine](https://www.linkedin.com/in/morgaine-timms-879354144/)

[twitter]: https://twitter.com/sh3r4_hax
[pgp]: /assets/misc/mt.pgp.txt "A2D1 316F A7BD 87F6 D0F7  DA73 42A6 A028 415F CE85"
[gh]: https://github.com/Sh3r4 "My github account"
[npm]: https://www.npmjs.com/~timmsio "My NPM account"

## Infosec Experience

- vulnerability assessment
- application security auditing
- secure code reviews
- network security auditing
- dependency management
- corporate incident response
- log analysis and threat hunting
- creating and leading training programmes
  - basic corporate security awareness programme
  - developer specific application security programme
- ISO 27002/27001 compliance
- SIEM setup and ongoing management
- IDS setup and ongoing management
- threat surface analysis

## Developer Experience

- Golang
  - Custom dependency management tooling
  - Graph database visualisation
- C#
  - WPF Desktop Applications
  - SharePoint applications
- typeScript / javaScript
  - web-based code editor
  - custom code completion engine
- python
  - academic test delivery platform
  - psychology/neurology study data collection
- SQL
  - complex data migrations
  - investigation and reconstruction of damaged datasets
