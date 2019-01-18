---
layout: page
title: Android
permalink: /android/
---
### Featured Guides
Guides that are worth highlighting for being the most feature complete or well written.
<ul>

{% for page in site.android %}
  {% if page.id == "/android/bottom_navigation" %}
    <li>
      <span style="font-size: 18px;"><a href="{{ page.url }}">{{ page.title }}</a> - </span>
      <span>{{ page.description }}</span>
    </li>
  {% endif %}
{% endfor %}

</ul>


### Guides
<ul>

{% for page in site.android %}
  <li>
    <span style="font-size: 18px;"><a href="{{ page.url }}">{{ page.title }}</a> - </span>
    <span>{{ page.description }}</span>
  </li>
{% endfor %}

</ul>
