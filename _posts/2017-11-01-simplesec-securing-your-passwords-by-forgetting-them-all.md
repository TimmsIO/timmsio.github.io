---
layout: post
title: "SimpleSec: Securing Your Passwords by Forgetting Them All"
date: 2017-11-02 11:41:36 +1100
categories: blog tutorial
tags: simplesec
author: Morgan Timms
license: CC-BY-4.0
thumbnail: /assets/images/posts/quikclyForgetting.svg
thumbnailAttr: Nevit Dilmen
thumbnailAttrUrl: https://commons.wikimedia.org/wiki/File:Mr_pipo_Learning_and_forgetting.svg
description: "'To keep a secret you must also hide it from yourself': or why you should never use passwords you can remember"
excerpt_separator: <!--more-->
instructions: true
instructionsLink: "#i-get-it-how-do-i-start"
disclaimer: "The contents of this post align with risk mitigation in an average internet user's threat model. It wasn't written with consideration to risk controls outside of that model."
published: true
toc: true
---

Information security has been around as long as humans have held secrets from one another.

In his novel _1984_, George Orwell noted a truth that has been ever-present in infosec:

> <span class="quote">For the first time he perceived that if you want to keep a secret you must also hide it from yourself. </span>
>
> <span class="quote-attr">~ 1984, G. Orwell</span>

{% include blogPostThumb.html %}

So how can you leverage this for your benefit?

In order to make sure you are the only one who can reliably access all of your accounts, you'll have to forget all your passwords.

<!--more-->

Luckily, a solution does exist which allows just that: a password manager.

## TL;DR

> Really important first point though: DO NOT USE A WEAK PASSWORD TO LOCK YOUR PASSWORD VAULT!!!
>
> If you want a quick way to generate a strong password for this, check out [easyphrase][ep].
>
> **Use a password manager because:**
>
> - no more remembering passwords
> - no more having to type them in
> - reduces security fatigue while also making you more secure
>
> **Use a password manager safely by:**
>
> - using a really strong passphrase to encrypt your passwords
> - only using your password-manager passphrase for your password manager

## What Is a Password Manager

A password manager is a piece of software which locks your passwords in an encrypted container and retrieves them when you need them. It will sync them across your devices, and even fill your password in for you.

It has some serious benefits, not least of which it actually reduces security fatigue (frustration with the extra steps security measures require).

## Why Use a Password Manager

There are many reasons for this. It makes it easier to log in to accounts, it's easy to adopt, it's free to very cheap, and many others.

But to understand the most fundamental strengths of the password manager, one must understand what makes passwords strong and how to stop one data breach from providing access to all your accounts.

### What Makes a Strong Password

Let's take a look at the advice of an authoritative voice on this. This excerpt is from the 2016 Information Security Manual produced by the Australian Signals Directorate. It applies to  "TOP SECRET" data.

> Control: 0422; Revision: 4; Updated: Apr-15; Applicability: TS; Compliance: must; Authority: AA
>
> Agencies using passphrases as the sole method of authentication must enforce the following
> passphrase policy:
>
> - a minimum length of 15 alphabetic characters with no complexity requirement; or
> - a minimum length of 11 characters, consisting of at least three of the following character sets:
>   - lowercase alphabetic characters (a–z)
>   - uppercase alphabetic characters (A–Z)
>   - numeric characters (0–9)
>   - special characters.

Basically, if your password is more than 15 characters it's probably pretty secure -- assuming of course it isn't your name, username, favourite film title, etc.

### How to Stop One Compromise Becoming Many

We all have _**A LOT**_ of online accounts. And they suffer data breaches all the time.

Let's run through an (overly simplified) scenario to illustrate why this is a problem.

Let's say you love James Bond films, so to remember your passwords you always use 'Bond007' as your password.

You signed up for Adobe Cloud a while back. They needed your email and your password to make an account.

That email/password combination went into a database somewhere at Adobe, but someone stole it and dumped the contents on the internet.

When you signed up for Adobe, you also signed up for Dropbox. Same email/password.

Whoever has your email/password combination (now available on the internet) has access to your Dropbox. And what else? Banking, email, etc.

It sounds like a ridiculous password to use everywhere, but it happens all the time. Most people use the same password for everything and rarely change it. It even happened to Paul Manafort, someone whose threat model includes risks far harder to control than the average user's.

<div class="container tweet-container">

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Manafort&#39;s email password is: Bond007  <br><br>Seriously.</p>&mdash; the grugq (@thegrugq) <a href="https://twitter.com/thegrugq/status/925038396182970368?ref_src=twsrc%5Etfw">October 30, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<noscript>
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Clarifying: Manafort&#39;s &quot;Bond007&quot; password is from the Adobe &amp; Dropbox leaks. It might not be his email password. It&#39;s been public since 2013</p>&mdash; the grugq (@thegrugq) <a href="https://twitter.com/thegrugq/status/925103520264503296?ref_src=twsrc%5Etfw">October 30, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</noscript>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Adobe&#39;s passwords went public: 2013-11<br>Dropbox&#39;s passwords went public: 2016-08<br><br>Same email + password in both.</p>&mdash; the grugq (@thegrugq) <a href="https://twitter.com/thegrugq/status/925104141315194880?ref_src=twsrc%5Etfw">October 30, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

</div>

The solution to this problem is very simple in concept but overwhelming in execution: never use a password on more than one account.

### Tying It Back Together

So to be more secure, one must use dozens of long nonsensical passwords that most humans couldn't remember one of consistently.

This is the core reason a password manager is useful; no more remembering passwords and no more typing them in.

In my estimation, the biggest strength of password managers for the average user is that it's actually easier to use the internet if you are using one.

## Using a Password Manager Safely

The name of the game is reducing risk, so let's discuss some of the risks introduced by using a password manager:

- Your encrypted vault is often stored in the cloud. It could be lost in a data breach.
- It requires a password. It could be guessed or brute forced if it's weak.

Both of these new risks come down to your 'master password'. This is the key to the kingdom. Anyone who knows this _and_ has your vault has everything.

Sounds scary. We can easily control this risk in a few steps though.

1. Use a passphrase to secure your vault. It's easy to type and easy to remember. If you like dice, here is a cool way of generating them: [EFF dice generation method][eff]. Or if you want a quick solution you could use [my generation tool, easyphrase][ep].

1. Don't use your password manager password anywhere else. Ever. Even if you change your password manager password, never re-use it.

## I Get it, How Do I Start?

This is surprisingly easy. Here are the steps:

### 1. Install a password manager:

You are better off going with a well known one. They are pretty similar, but the two most user friendly options I currently know of are:

- [LastPass](https://www.lastpass.com/)
  - free for personal use on computers
  - works on phones/tablets (paid)
  - browser extension
  - stores passwords when you enter them
  - includes a random password generator
- [1Password](https://1password.com/)
  - paid only
  - works on phones/tablets
  - browser extension
  - stores passwords when you enter them
  - includes a random password generator

### 2. Set Up Your 'Master Password'

You are best off making a passphrase for this. Use one of these methods:

- [The EFF Dice Based Method][eff]
- [My passphrase generator][ep]
- Any other reputable passphrase generator

Just make sure it meets these requirements:

1. Make it at least 15 characters long
1. Never use it anywhere else

Write this password on a piece of paper and put it somewhere safe. Unlike regular account passwords, there is no password reset. Forgetting your password is catastrophic.

It sounds counter intuitive, but if you are getting burgled they're probably not looking for a small piece of paper with a password on it.

### 3. See If You've Already Been Compromised

Go to [haveibeenpwned.com][hibp] and check to see if your account details might already be out there.

If your email shows up in any breaches, change the password associated with that account.

Don't forget to also change any other passwords that use the same username/password combination.

### 4. Change Your Passwords If You Need To

This one is really important.

The strength of the password manager is that it lets you use strong and unique passwords for all your accounts.

When you get a chance, change the passwords that are less than 15 characters or that are used on multiple sites. Your password manager will be able to generate a strong and random password for you. Some password managers can even change your password automatically.

### 5. Go About Your Daily Business

Seriously. Making the switch to using a password manager is pretty seamless. It will remember your passwords as you log into your accounts.

After about a month, it should have most of your passwords stored away.

[eff]: https://www.eff.org/dice "EFF's dice generated passphrases"
[ep]: /utils/easyphrase/ "My passphrase generator"
[hibp]: https://haveibeenpwned.com/ "Have I been Pwned Account Compromise Checker"