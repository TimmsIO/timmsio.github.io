---
layout: post
title: "PlaidCTF2019: Docker"
date: 2019-04-25 10:40:59 +1000
categories: [writeup, misc]
tags: [ctf, 2019, plaid, misc]
author: Morgaine Timms
license: CC-BY-4.0
thumbnail: 
thumbnailAttr: 
thumbnailAttrUrl: 
thumbnailAlt: 
published: true
toc: false
description: "Using some lesser-known docker commands"
excerpt_separator: <!--more-->
---
# PlaidCTF2019 - Docker

Misc - 10pts

## The Challenge

``` txt
Misc (10 pts)
docker pull whowouldeverguessthis/public
```

<!--more-->

## The Solution

When pulling the image, there appear to be three layers:

``` txt
$ docker pull whowouldeverguessthis/public
Using default tag: latest
latest: Pulling from whowouldeverguessthis/public
21fb37f5cb03: Pull complete
0ba403b98a95: Pull complete
6e04248e8980: Pull complete
Digest: sha256:902f0d5b6f0d773120521ff455037edad0145de2c8de1f44d23be99c757ad4bc
Status: Downloaded newer image for whowouldeverguessthis/public:latest
```

A `docker image inspect $imagename` suggests that the flag may be related to the "Cmd" attribute.

``` txt
$ docker image inspect whowouldeverguessthis/public
...SNIP...
            "Cmd": [
                "/bin/sh",
                "-c",
                "echo \"I'm sorry, but your princess is in another castle\" > /flag"
            ],
...SNIP...
        "RootFS": {
            "Type": "layers",
            "Layers": [
                "sha256:743aff3a80526229ca5762b3240e4e506b6b3a61e97accb853707a946a3abb39",
                "sha256:a5fdd7807f999b258a273978509252fcdbb76218e14a01376d5b2ade4798826b",
                "sha256:e958f8e060fc9bb06df3ccb0aff183fa8c549c369536f063d7ea36a617c86564"
            ]
        },
...SNIP...
```

Inspecting the image history with `docker image history $imagename` shows the truncated flag:

``` txt
$ docker image history whowouldeverguessthis/public
IMAGE               CREATED             CREATED BY                                      SIZE                COMMENT
969996089570        7 days ago          /bin/sh -c echo "I'm sorry, but your princes…   50B
<missing>           7 days ago          /bin/sh -c echo "PCTF{well_it_isnt_many_poin…   51B
<missing>           2 months ago        /bin/sh -c #(nop)  CMD ["bash"]                 0B
<missing>           2 months ago        /bin/sh -c #(nop) ADD file:34b9952e66cb98287…   68.9MB
```

The output can be printed in full using the `--no-trunc` option to reveal the flag.
`"PCTF{well_it_isnt_many_points_what_did_you_expect}"` :

``` txt
$ docker image history --no-trunc whowouldeverguessthis/public
IMAGE                                                                     CREATED             CREATED BY                                                                                          SIZE                COMMENT
sha256:969996089570ead17d586e6b940c8cb0375aba7bd329076cbe2a2fc18653b8d9   7 days ago          /bin/sh -c echo "I'm sorry, but your princess is in another castle" > /flag                         50B
<missing>                                                                 7 days ago          /bin/sh -c echo "PCTF{well_it_isnt_many_points_what_did_you_expect}" > /flag                        51B
<missing>                                                                 2 months ago        /bin/sh -c #(nop)  CMD ["bash"]                                                                     0B
<missing>                                                                 2 months ago        /bin/sh -c #(nop) ADD file:34b9952e66cb98287bc41fab82739375fe6c43f38ed3b893e98a99035b494770 in /    68.9MB
```
