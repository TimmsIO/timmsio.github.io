---
layout: post
title: "SimpleSec: Reasonable Security Advice for All"
date: 2017-10-28 14:17:22 +1100
categories: blog
tags: simplesec
author: Morgan Timms
license: CC-BY-4.0
thumbnail: /assets/images/posts/lowHangingFruit-min.jpg
thumbnailAttr: Jeff Kubina
thumbnailAttrUrl: https://www.flickr.com/photos/kubina/
thumbnailAlt: Apples recently harvested from trees in an orchard
description: The average user is low hanging fruit, the harvesting of which keeps almost all the world's "hackers" occupied.
excerpt_separator: <!--more-->
---

I get asked a lot by family and friends-of-friends to give advice about information security.
The temptation is always there to tell them about some obscure attack vector, but it's counter productive.
The truth is, most users will never face a targeted attack; in fact, most users will never face a truly skilled attacker.
The average user is low hanging fruit, the harvesting of which keeps almost all the world's "hackers" occupied.

{% include blogPostThumb.html %}

It gets worse for the average user though.
<!--more-->

The average user doesn't have many places they can turn to for decent security advice.
The media is obsessed with scare-mongering when it comes to security.
Take a look at the recent media coverage of the KRACK attack -- all eyes were on a niche attack while other attack vectors which were relevant to the average user's threat model flew under the radar.
The media is more than happy to sensationalise high-profile data spills, but offers their audience no actionable advice.

It is little wonder then that most people seek advice when they see an opportunity for it, or that so many are so vulnerable to technology based crime.
I'm not about to leave those around me out to dry, so I learned to become a "simple security measures" evangelist.

When I respond to a request for advice, the hardest part is tempering my own excitement about information and operational security.
I love these topics. I eat, sleep and breathe this stuff. I have so much stuff I think is cool to say.

But I shouldn't.

The second you see someone's eyes glaze over as you start to explain why ECDH and ECDSA are so much better than DH and DSA -- that is the moment you have lost the battle.
We have an obligation in the infosec industry to give simple advice that can be followed with as little effort as possible.
Unfortuantely it is also my experience that we are too quick to cut off the nose to spite the face. Just because something is technically more secure does not make it more secure in practice.

## What is Good Advice?

I want to preface this by saying that I am talking about good advice for the average person, based on a threat model for an average person. No nation-state actors or targeted attacks here.

The biggest hurdle to giving security advice to people outside of the IT industry is that it is often too technical or too difficult to do. If my advice makes the person's life more difficult, I am doing it wrong.

I believe that good security advice should fit these criteria:

1. The reason for why it is good advice is intuitive
1. Mitigates a common risk
1. Requires little to no effort to enact
1. No technical background knowledge is needed
1. Can be conveyed in a sentence

These criteria ensure that any advice will introduce minimal security fatigue, not overwhelm the user, and above all else will actually help them.

## What Advice Do I Give?

I am careful to make sure that I know my audience before I start rattling off advice at an unsuspecting acquaintance. Some people are more resistant to security fatigue than others, and balancing the benefits with the effort isn't always easy.

I've changed this list up a few times, but as it currently stands, here is what I tell people in order of the most important to the least:

### Use a Password Manager

This is an easy win. Password managers actually decrease security fatigue in my experience. On top of that, they are extremely easy to adopt because they just pick up your passwords as you use them. After a month of use, it will probably have all your passwords.

### Use Multi-Factor Auth

Unfortunately, multi-factor authentication causes _a lot_ of security fatigue. The benefit of preventing an attacker who has your un-hashed password from gaining access is clear though.

Although I've heard plenty of people decry using a mobile number for 2FA, for most people it is more than secure enough and doesn't cause as much fatigue as an authenticator app or a Yubikey. This is very much a case of aligning the advice with the threat model of the user in question.

### Install Some Blocking Extensions

Blocking extensions will cause very little extra effort for the average user, but it will prevent ad networks (particularly those of ill repute) from executing arbitrary code on your machine.

Plus you don't have to see ads anymore.

### Use a VPN

This is a dead easy thing to do, but isn't necessarily the right thing for the average user.

### Block JS by Default

I don't _always_ suggest this. It depends on the user. Nevertheless, only allowing JS for whitelisted sites can prevent a whole host of attacks. It also has the benefit of protecting you if you accidentally visit a known malicious link.