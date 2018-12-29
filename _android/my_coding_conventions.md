---
layout: page
title:  My Coding Conventions
description: Naming, structure, rules, conventions
---

This document is just to keep track of my personal conventions.

## Naming in XML
Naming conventions will be specified using the format:
`<value> [optional]`

### Layouts

We need to avoid name shadowing and want the names to look the same everywhere
*(don't want snake_case in xml and lowerCamelCase in code)*. You can imagine
a view id `@+id/icon` and a databinding variable of the same name `icon` as logical
choices for the names, but this would result in name shadowing or compilation errors.

How do we solve this problem? We could choose to suffix our view ids with `View`,
so we'd use the id `@+id/iconView` or we could have used a more verbose Variable
name like `profileIcon` instead.

**These solutions should only be used when a problem with conflicting names has occurred,
don't needlessly suffix your ids or make the names verbose.**

*NOTE: By not using snake_case we lose the ability to use double underscores,
but we probably wouldn't use it for ids anyways.*

##### View Ids
**Ids** in **layouts** use the following convention:
`android:id="@+id/<lowerCamelCase>"`

**Examples:**
```
`android:id="@+id/toolbar"`
`android:id="@+id/bottomNavigation"`
`android:id="@+id/scrollView"`
```

##### DataBinding Variables
For **variable names** in **databinding** layouts we use the following convention:
```
<variable name="<lowerCamelCase>" type="String" />
```

**Examples:**
```
<variable name="caption" type="String" />
<variable name="profileIcon" type="Drawable" />
<variable name="canContinue" type="Boolean" />
```

### Values

For **string** resources we use the following convention:
`<string name="<screen>__<usage>__<description>[__<nested-usage>[__<nested-description>]]">Text</string>`

**Examples:**
```
<!-- Menu Actions -->
<string name="home__action__settings">Settings</string>

<!-- Content Texts -->
<string name="settings__section__general">General</string>
<string name="settings__button__change_theme">Change theme</string>
<string name="settings__option__allow_analytics">Allow Analytics</string>
<string name="settings__option__allow_analytics__summary">Share usage info with us</string>
<string name="settings__text__copyright_notice">Copyright 2018</string>
```

## XML References
For **attributes** in xml we use the following convention:
`?<attr-name>` and `?android:<attr-name>`

**Examples:**
```
android:textColor="?android:textColorPrimary"
android:textColor="?myFavoriteColor"
```
