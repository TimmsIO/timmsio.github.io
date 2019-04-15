---

title: CVElinker
layout: default
date: 2018-11-30 19:32:55 +1100
permalink: /projects/cvelinker/

---

# CVELINKER

Github: [Sh3r4/cvelinker](https://github.com/Sh3r4/cvelinker)
<br>
Demo Output: [sample report](/projects/cvelinker/samplereport)

This is a golang utility to ingest CVE identifiers and generate reports and links.
It's purpose is to make sifting through advisories which reference CVEs easier.

It's default behaviour is to provide a few useful links to stdout.

``` txt
[-] ========================= CVE-2018-3640 ==========================

[NVD__] https://nvd.nist.gov/vuln/detail/CVE-2018-3640
[MITRE] https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-3640
[LVD__] https://lwn.net/Search/DoSearch?words=CVE-2018-3640
[MTASP] https://www.rapid7.com/db/search?q=CVE-2018-3640
[DEB__] https://security-tracker.debian.org/tracker/CVE-2018-3640
[RHEL_] https://bugzilla.redhat.com/show_bug.cgi?id=CVE-2018-3640
[GOOGL] https://www.google.com/search?q=CVE-2018-3640
[GITHB] https://github.com/search?q=%22CVE-2018-3640%22&type=Issues
```

It is also capable of more complete reports using the [circl.lu  API](https://www.circl.lu/services/cve-search/).

Here is an example of a report generated for CVE-2018-3640 and CVE-2018-3639:
[sample report](/projects/cvelinker/samplereport)