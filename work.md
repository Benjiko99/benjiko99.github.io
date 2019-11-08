---
layout: page
title: Work
permalink: /work/
---
### Articles
<ul>

{% for page in site.work %}
  <li>
    <span style="font-size: 18px;"><a href="{{ page.url }}">{{ page.title }}</a> - </span>
    <span>{{ page.description }}</span>
  </li>
{% endfor %}

</ul>
