---

title: easyphrase
layout: default
permalink: /utils/easyphrase/

---

# easyphraseTheDemo

Via npm: `npm install -g easyphrase`

Or github: 
 [https://github.com/TimmsIO/easyphrase](https://github.com/TimmsIO/easyphrase)

## Live Demo

<div></div>
<div id="easyphrase"></div>
<br/>
<div>
    <div class="list-group">
        <button id="easyphrase-generate-button" type="button" class="list-group-item list-group-item-action">Generate Password</button>
        <label class="list-group-item list-group-item-action"><input type="checkbox" autocomplete="off" value="" id="easyphrase-silent-checkbox">Less Verbose Mode</label>
        <label class="list-group-item list-group-item-action"><input type="checkbox" autocomplete="off" value="" id="easyphrase-lessSec-checkbox">Less Secure (no dictionary attack mitigation)</label>
        <div class="list-group-item">
            <label for="easyphrase-quantity-input">Quantity to generate:</label>
            <div class="input-group">
                <input type="number" class="form-control" id="easyphrase-quantity-input">
                <span class="input-group-addon">passwords</span>
            </div>
        </div>
        <button id="easyphrase-copy-button" type="button" class="list-group-item list-group-item-action">Copy Last Password to Clipboard</button>
    </div>
    </br>
</div>
<div></div>

## What is it?

Easyphrase is a password generator that works on the commandline using node, or works on a webpage using plain js.

It uses the wordlist created by the EFF to go with their promotional dice password generation method.

Easyphrase has one goal: make it easier for people to have decent passwords.

The software was initially developed with two goals:

1. provide a commandline client for IT professionals who need to generate large quantities of passwords
1. provide a web client for corporate users which can be made available on the intranet





<script src="/assets/js/easyphrase/easyphrase.min.js"></script>
