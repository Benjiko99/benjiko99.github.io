---
layout: page
title: Android
permalink: /android/
---

### Guides
<ul>

{% for page in site.android %}
  <li>
    <span style="font-size: 18px;"><a href="{{ page.url }}">{{ page.title }}</a></span>
    {% if page.description %}
      <span> - {{ page.description }}</span>
    {% endif %}
  </li>
{% endfor %}

</ul>
