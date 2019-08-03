---
layout: page
title: Clean Code
permalink: /clean_code/
---
<ul>

{% for page in site.clean_code %}
  {% if page.id == "/clean_code/understand" %}
  <li>
    <span style="font-size: 18px;"><a href="{{ page.url }}">{{ page.title }}</a></span>
    {% if page.description %}
      <span> - {{ page.description }}</span>
    {% endif %}
  </li>
  {% endif %}
{% endfor %}

</ul>
