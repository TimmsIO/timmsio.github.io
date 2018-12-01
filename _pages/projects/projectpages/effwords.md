---

title: EFFwords
layout: default
date: 2018-11-30 19:32:55 +1100
permalink: /projects/effwords/

---

# EFFwords

Github: [sectorsect/EFFWords](https://github.com/sectorsect/EFFWords)

EFFwords is a golang passphrase generator based on the [EFF diceware passphrase method][eff].

It includes the [zxcvbn-go library](https://github.com/nbutton23/zxcvbn-go) for calculating the approximate time required to crack a given password. Passwords to evaluate can be provided by the user.

## Examples

The following example generates 5 passphrases without including special chars, including the optional crack-time calculation in the format password [{seconds}:{human_readable}]

``` txt
$ EFFWords -zS 5
unicornRetired0sedimentundone [2.851973e+12:centuries]
recaptureFactoidangrilye6aseful [3.579311e+20:centuries]
Bul8lfightmusketafarcelibate [1.532659e+16:centuries]
pregnantfridayTacklingchirp2y [7.706819e+13:centuries]
frecklesAppli8edhatemammary [6.627773e+14:centuries]
```

These examples evaluate existing passwords:

``` txt
$ EFFWords -Z _Admin123
_Admin123 [1.590300e+01:instant]

$ EFFWords -Z "5hEehPPPnK&5wQ8^8Pm%h@n6KN0cUJobXOGtp3BW75n*xBYg1wjbzDNwhGRLh9RR3V8AC8CRdXOozsR4v^VzkV"
5hEehPPPnK&5wQ8^8Pm%h@n6KN0cUJobXOGtp3BW75n*xBYg1wjbzDNwhGRLh9RR3V8AC8CRdXOozsR4v^VzkV [3.240504e+137:centuries]
```

## Usage

``` txt

Author:  Morgaine Timms   (@sectorsect)
License: MIT
Warning: Some of the following options when used in combination can
         significantly weaken the pass-phrases generated.
         You probably know what you are doing though, yeah?


Output Formats:
  * standard:
      password
  * crack-time (-z):
      password [{seconds}:{human_readable}]

Things It Does:
  -c, --caps-position int
      Capitalise the word at this index. (default -1)
  -Z, --check-this-pass string
      Don't generate, just evaluate the strength of a provided pass
  -z, --crack-time
      Check password strength with zxcvbn
  -M, --maximum-chars int
      Maximum characters for passphrases. Truncates. (default -1)
  -m, --minimum-chars int
      Minimum characters for passphrases. (default -1)
  -o, --output-to-file string
      Filepath to output to
  -C, --prevent-caps
      Prevents capitalisation in passphrase
  -I, --prevent-int
      Prevents integers in passphrase
  -S, --prevent-special
      Prevents special chars in passphrase
  -q, --quantity int
      Number of passphrases to generate (default 1)
  -R, --random-caps
      Capitalise a random character in each passphrase
  -v, --verbose
      Show all the things
  -w, --wordcount int
      Number of words per passphrase. (default 4)
```

## Disclaimer

I lay no claim to the included wordlist created by the EFF. I am using it in good faith, with full attribution to the Electronic Frontiers Foundation. I believe the list to be licensed under the CC 3.0 Attribution license [https://creativecommons.org/licenses/by/3.0/us/](https://creativecommons.org/licenses/by/3.0/us/)

[eff]: https://www.eff.org/dice