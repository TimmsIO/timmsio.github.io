---
layout: post
title: "First Post!!"
date: 2018-12-01 10:08:50 +1100
categories: [blog]
points: 10000
author: Morgaine Timms
license: CC-BY-4.0
thumbnail: 
thumbnailAttr: 
thumbnailAttrUrl: 
thumbnailAlt: 
published: true
toc: false
description: "obligatory first post...and an intro to one of my tools"
excerpt_separator: <!--more-->
---

# First Post!!

There really isn't much here though.

Maybe check out [manyheads](/projects/manyheads), an active aid to subdomain enumeration tools.
I wrote the tool during an external attack surface audit in which I enumerated *7000 subdomains*.

Using the rough-version of manyheads I confirmed 3 subdomain takeovers, and a host [🙄] of other issues in a relatively short amount of time.

Since then, I've cleaned it up (a little) and added functionality.
Although it uses HEAD by default, now you can give it any valid HTTP Method to use.
I also added a 'human-readble' and JSON format options to the existing 'greppable' output, as well as the ability to save each result to a separate file.

This is **NOT** a stealthy tool, and it does actively engage the target.
Unless you have permission to audit, don't use this tool!

Here is a sample of the 'human readable' output to give an idea of what it does:

``` txt
///////////////////////////////
HEAD notasubdomain.timms.io =>  [FAIL: Head http://notasubdomain.timms.io: dial tcp: lookup notasubdomain.timms.io: no such host]
--------
HEAD / HTTP/1.1
Host: notasubdomain.timms.io


///////////////////////////////
HEAD notasubdomain.timms.io =>  [FAIL: Head https://notasubdomain.timms.io: dial tcp: lookup notasubdomain.timms.io: no such host]
--------
HEAD / HTTP/1.1
Host: notasubdomain.timms.io


///////////////////////////////
HEAD timms.io => 301 [SUCCESS]
--------
HEAD / HTTP/1.1
Host: timms.io

HTTP/1.1 301 Moved Permanently
Connection: close
Cache-Control: max-age=3600
Cf-Ray: 48217cd3d0017038-SIN
Connection: keep-alive
Date: Sat, 01 Dec 2018 00:37:51 GMT
Expires: Sat, 01 Dec 2018 01:37:51 GMT
Location: https://timms.io/
Server: cloudflare


///////////////////////////////
HEAD timms.io => 200 [SUCCESS]
--------
HEAD / HTTP/1.1
Host: timms.io

HTTP/1.1 200 OK
Connection: close
Access-Control-Allow-Origin: *
Age: 0
Cache-Control: max-age=600
Cf-Ray: 48217cd698acc342-SIN
Connection: keep-alive
Content-Type: text/html; charset=utf-8
Date: Sat, 01 Dec 2018 00:37:52 GMT
Expect-Ct: max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"
Expires: Sat, 01 Dec 2018 00:46:39 GMT
Last-Modified: Mon, 28 May 2018 00:33:21 GMT
Server: cloudflare
Set-Cookie: __cfduid=d41d75e128e9374d0147b8d6ffcdc4c571543624671; expires=Sun, 01-Dec-19 00:37:51 GMT; path=/; domain=.timms.io; HttpOnly; Secure
Vary: Accept-Encoding
Via: 1.1 varnish
X-Cache: MISS
X-Cache-Hits: 0
X-Fastly-Request-Id: f90c15b4e116630ac91d951482eddec8dbaa56dc
X-Github-Request-Id: CC4A:1B2C:6C3B75:926DFD:5C01D797
X-Served-By: cache-sin18021-SIN
X-Timer: S1543624672.788979,VS0,VE240

```