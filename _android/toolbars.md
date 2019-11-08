---
layout: page
title:  Toolbars
description: Implementing a Toolbar within an Activity or Fragment, with or without using the Navigation Architecture Component
---

The way in which we implement a Toolbar, differs depending on whether we want it to be a part of an **Activity** or a **Fragment**
and whether we're using the **Navigation Architecture Component**.

### Dependencies
We'll be using AndroidX and the Material Design library, optionally together with the Navigation Architecture Component.

```gradle
implementation "androidx.appcompat:appcompat:1.0.0"
implementation "com.google.android.material:material:1.0.0-rc01"

// Optional Navigation dependencies
implementation "android.arch.navigation:navigation-fragment-ktx:1.0.0-alpha09"
implementation "android.arch.navigation:navigation-ui-ktx:1.0.0-alpha09"
```

I additionally use **synthetic properties** provided by [Kotlin Android Extensions](https://kotlinlang.org/docs/tutorials/android-plugin.html#view-binding) for view binding, but this is optional.

<!-- Normally the Activity would be the Toolbar host, and Fragments could inflate their
own menu items by setting `setHasOptionsMenu(true)`.

On the other hand, if you want a Fragment to host your Toolbar, you'll have to handle everything yourself. -->

<!-- It makes sense to manually set the Toolbars title, as the Navigation methods for
Toolbars are meant for use with an Activity, which would want it to be showing
the title of the current destination in the graph, but that doesn't make sense for
the fragment. -->

<!-- Since Fragments are not designed to be ActionBar hosts, you have to do some things
manually. You'll have to inflate the menu and set listeners on the Toolbar yourself,
where as an Activity would provide you with methods to override.

Remember, a Toolbar is just a view, Activities just have helper methods to control them,
in a Fragment you'll have to do that yourself. -->

<!-- `setHasOptionsMenu(true)` is only required when the toolbar is hosted by an Activity,
as all it does is invalidate the Activity's toolbar and have it pool your Fragment
for menu items. -->

<!-- `NavigationUI.setupWithNavController(toolbar, findNavController())` **adds**
a Toolbar to the Navigation listeners. This has the caveat of the Toolbar on
a previous screen updating to reflect the next screen, so if you use sideways
sliding fragment transitions you'll see the toolbar on the previous screen
display wrong information. Ideally the Navigation Component should probably
remove the listener when navigating (issue with the library). We don't have the
ability to remove the listener ourselves.

NOTE: Does NOT map the menu items to navigation destinations with same Ids.
Wonder whether the activity one (that also sets up drawer) does the mapping,
likely not. -->

<!-- NOTE:
Maybe a custom NavController/Destination could let me make the toolbar
behave as explicitly a part of one destination, and always reflect it's title,
instead of the title of the current destination in the graph.
-->

## Within a Fragment

### Without Navigation Component
**TODO**
<!--```kotlin
setHasOptionsMenu(true)
// and override methods-->
<!--```-->

### With Navigation Component
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

## Within an Activity

#### Common Setup
1. Make sure the activity extends `AppCompatActivity`.
2. Use a `NoActionBar` theme on your activity, e.g. `Theme.MaterialComponents.Light.NoActionBar`.
3. Add a Toolbar to the activity's layout.

### Without Navigation Component
[Official Documentation](https://developer.android.com/training/appbar/)

In the activity's `onCreate()` method, call the `setSupportActionBar()` method.
This method sets the toolbar as the app bar for the activity:

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.my_activity)
    
    setSupportActionBar(toolbar)
}
```

#### Adding and Handling Actions
[Official Documentation](https://developer.android.com/training/appbar/actions)

1. Create a menu resource and add our actions

```xml
<menu xmlns:android="http://schemas.android.com/apk/res/android" >

    <!-- "Mark Favorite", should appear as action button if possible -->
    <item
        android:id="@+id/action_favorite"
        android:icon="@drawable/ic_favorite_black_48dp"
        android:title="@string/action_favorite"
        app:showAsAction="ifRoom"/>

    <!-- Settings, should always be in the overflow -->
    <item android:id="@+id/action_settings"
          android:title="@string/action_settings"
          app:showAsAction="never"/>

</menu>
```

2. Inflate the menu
   
In your activity, override `onCreateOptionsMenu()`:

```kotlin
override fun onCreateOptionsMenu(menu: Menu): Boolean {
    menuInflater.inflate(R.menu.main, menu)
    return super.onCreateOptionsMenu(menu)
}
```

1. Handle the Actions

In your activity, override `onOptionsItemSelected()`:

```kotlin
override fun onOptionsItemSelected(item: MenuItem) = when (item.itemId) {
    R.id.action_settings -> {
        // User chose the "Settings" item, show the app settings UI...
        true
    }

    R.id.action_favorite -> {
        // User chose the "Favorite" action, mark the current item
        // as a favorite...
        true
    }

    else -> {
        // If we got here, the user's action was not recognized.
        // Invoke the superclass to handle it.
        super.onOptionsItemSelected(item)
    }
}
```

<!-- In your fragment do:

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
``` -->

### With Navigation Component
Setup the Toolbar in the activity's `onCreate()` method, and override `onSupportNavigateUp()` to handle the Toolbar's back action.

```kotlin
import kotlinx.android.synthetic.main.main_activity.*

class MainActivity : AppCompatActivity() {

    private val navController by lazy { findNavController(R.id.nav_host_fragment) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.main_activity)

        setSupportActionBar(toolbar)

        // Depending on whether you're using a regular Toolbar or a Collapsing one
        // for a regular Toolbar use:
        NavigationUI.setupActionBarWithNavController(this, navController)
        // for a Collapsing Toolbar use:
        collapsingToolbar.setupWithNavController(toolbar, navController)
    }

    override fun onSupportNavigateUp(): Boolean {
        return NavigationUI.navigateUp(navController, null)
    }
}
```

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
