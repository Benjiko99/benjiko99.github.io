---
layout: page
title: Clean Code
permalink: /clean_code/
---
### Guides
<ul>

{% for page in site.clean_code %}
  <li>
    <span style="font-size: 18px;"><a href="{{ page.url }}">{{ page.title }}</a> - </span>
    <span>{{ page.description }}</span>
  </li>
{% endfor %}

</ul>
