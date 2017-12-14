---
layout: page
title: Git Resources
permalink: /git/
---
<ul>

{% for page in site.git %}
  <li>
    <span style="font-size: 21px;"><a href="{{ page.url }}">{{ page.title }}</a> - </span>
    <span>{{ page.description }}</span>
  </li>
{% endfor %}

</ul>
