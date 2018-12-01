---

title: blog
layout: default
date: 2018-11-30 19:32:55 +1100
permalink: /blog

---

# Blog Listing

***

{% for post in site.posts %}
<p>
<h4><a href="{{ post.url }}">{{ post.title }}</a></h4>
<blockquote>{{ post.description }}</blockquote>
</p>
{% endfor %}
