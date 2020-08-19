---
layout: page
title:  Attributes
description: Resolving Themed Attributes
---

## Resolving Themed Attributes

#### Color

You need to check if the attribute got resolved to a resource or a color value.

The default value of textColorPrimary is not a Color but a ColorStateList, which is a resource.

```java
@ColorInt public static int resolveColorAttr(Context context, @AttrRes int colorAttr) {
  TypedValue resolvedAttr = resolveThemeAttr(context, colorAttr);
  // resourceId is used if it's a ColorStateList, and data if it's a color reference or a hex color
  int colorRes = resolvedAttr.resourceId != 0 ? resolvedAttr.resourceId : resolvedAttr.data;
  return ContextCompat.getColor(context, colorRes);
}

public static TypedValue resolveThemeAttr(Context context, @AttrRes int attrRes) {
  Theme theme = context.getTheme();
  TypedValue typedValue = new TypedValue();
  theme.resolveAttribute(attrRes, typedValue, true);
  return typedValue;
}
```

**Usage:**
```java
@ColorInt int color = resolveColorAttr(context, android.R.attr.textColorPrimaryInverse);
```