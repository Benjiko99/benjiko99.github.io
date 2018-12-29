---
layout: page
title:  Toolbars
description: Implementing a Toolbar using Activities, Fragments and Navigation Component
---

How to implement a toolbar depends on whether you want it to be a part of an **Activity** or a **Fragment**
and whether you're using the new **Navigation Architecture Component**.

Normally the Activity would be the Toolbar host, and Fragments could inflate their
own menu items by setting `setHasOptionsMenu(true)`.

On the other hand, if you want a Fragment to host a Toolbar, there don't seem to
be any callbacks provided by the framework that you could hook into.
In this case you'll have to handle everything yourself.

It makes sense to manually set the Toolbars title, as the Navigation methods for
Toolbars are meant for use with an Activity, which would want it to be showing
the title of the current destination in the graph, but that doesn't make sense for
the fragment.

Since Fragments are not designed to be ActionBar hosts, you have to do some things
manually. You'll have to inflate the menu and set listeners on the Toolbar yourself,
where as an Activity would provide you with methods to override.

Remember, a Toolbar is just a view, Actitivies just have helper methods to control them,
in a Fragment you'll have to do that yourself.

`setHasOptionsMenu(true)` is only required when the toolbar is hosted by an Activity,
as all it does is invalidate the Activity's toolbar and have it pool your Fragment
for menu items.

`NavigationUI.setupWithNavController(toolbar, findNavController())` **adds**
a Toolbar to the Navigation listeners. This has the caveat of the Toolbar on
a previous screen updating to reflect the next screen, so if you use sideways
sliding fragment transitions you'll see the toolbar on the previous screen
display wrong information. Ideally the Navigation Component should probably
remove the listener when navigating (issue with the library). We don't have the
ability to remove the listener ourselves.

NOTE: Does NOT map the menu items to navigation destinations with same Ids.
Wonder whether the activity one (that also sets up drawer) does the mapping,
likely not.

<!-- NOTE:
Maybe a custom NavController/Destination could let me make the toolbar
behave as explicitly a part of one destination, and always reflect it's title,
instead of the title of the current destination in the graph.
-->

### Navigation Component Dependencies
```gradle
implementation "android.arch.navigation:navigation-fragment-ktx:1.0.0-alpha06"
implementation "android.arch.navigation:navigation-ui-ktx:1.0.0-alpha06"
```

## Fragments

### Without Navigation Component
**TODO**
```kotlin
setHasOptionsMenu(true)
// and override methods
```

### With Navigation Component
**TODO: WHAT ARE THE LIBRARY DEPENDENCIES**
Navigation Component can manage the toolbar's title and Up navigation for you
with the following snippet:

```kotlin
NavigationUI.setupWithNavController(toolbar, findNavController())

// Alternative syntax
toolbar.setupWithNavController(findNavController())
```

*The title will reflect the current destination, but this comes with a small
problem—during a transition to the next destination, the toolbars in both fragments will
show the title from the next destination. It seems Navigation Component
really wants you to have the toolbar in your activity instead.*

#### Adding and Handling Actions

```kotlin
toolbar.setupWithNavController(findNavController())
toolbar.inflateMenu(R.menu.my_fragment_menu)
toolbar.setOnMenuItemClickListener {
    when (it.itemId) {
        R.id.action_example -> {
          // ...
          true
        }
        else -> false
    }
}
```

<br />
## Activities

### Without Navigation Component

#### Setup
[Official Documentation](https://developer.android.com/training/appbar/)

1. Make sure the activity extends `AppCompatActivity`.

2. Use a `NoActionBar` theme on your activity, e.g. `Theme.MaterialComponents.Light.NoActionBar`.

3. Add a Toolbar to the activity's layout.

4. In the activity's `onCreate()` method, call the `setSupportActionBar()` method.
This method sets the toolbar as the app bar for the activity:

    ```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.my_activity)
        setSupportActionBar(findViewById(R.id.my_toolbar))
    }
    ```

Further reading: [Adding and Handling Actions](https://developer.android.com/training/appbar/actions)

#### Using the Toolbar of an Activity from a Fragment
In your fragment do:

```kotlin
override fun onCreateView(inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
  // ...
  setHasOptionsMenu(true)
}
```

```kotlin
override fun onCreateOptionsMenu(menu: Menu?, inflater: MenuInflater?) {
    inflater?.inflate(R.menu.menu_my_fragment, menu)
    super.onCreateOptionsMenu(menu, inflater)
}

override fun onOptionsItemSelected(item: MenuItem?): Boolean {
    return when (item?.itemId) {
        R.id.action_share -> {
            // ...
            return true
        }
        else -> super.onOptionsItemSelected(item)
    }
}
```

### With Navigation Component
```kotlin
val navController = Navigation.findNavController(this, R.id.nav_host_fragment)

setSupportActionBar(toolbar)
NavigationUI.setupActionBarWithNavController(this, navController)
```

<br />
## Refuting StackOverflow Solutions
You'll often see this solution suggested to setup your Toolbar in a Fragment:

```kotlin
(activity as AppCompatActivity).setSupportActionBar(toolbar)
```

The [documentation](https://developer.android.com/reference/androidx/appcompat/app/AppCompatActivity.html#setSupportActionBar(androidx.appcompat.widget.Toolbar))
for `setSupportActionBar()` makes it clear that this method is supposed to be only used by activities and it makes the toolbar
act as the *traditional window decor action bar* that you'd get from a activity theme:

    Set a Toolbar to act as the ActionBar for this Activity window.

    When set the Activity.getActionBar() method will return an ActionBar object
    that can be used to control the given toolbar as if it were a
    traditional window decor action bar.
