---
layout: page
title: Android Cookbook
permalink: /android/
---
### Guides
<ul>

{% for page in site.android %}
  <li>
    <span style="font-size: 18px;"><a href="{{ page.url }}">{{ page.title }}</a> - </span>
    <span>{{ page.description }}</span>
  </li>
{% endfor %}

</ul>
