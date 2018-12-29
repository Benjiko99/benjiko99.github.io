---
layout: page
title:  Bottom Navigation
description: Implementing Bottom Navigation, including fragment management
---

We'll be integrating a `BottomNavigationView` in a way that it properly interacts with other components like: `FloatingActionButton`, `CollapsingToolbarLayout` and `Snackbar`.

We will also be implementing **fragment management** for our destinations.

### Dependencies
We'll be using AndroidX and the Material Design library.
```gradle
implementation "androidx.appcompat:appcompat:1.0.0"
implementation "com.google.android.material:material:1.0.0-rc01"
```

## Layout Setup

#### fragment__hub.xml
This is the layout of my "home" fragment, which contains the `BottomNavigationView`.

We're excluding the `BottomNavigationView` from the `CoordinatorLayout`, as setting it up
in that way would be a lot more complicated. The `CoordinatorLayout` will coordinate the
`FloatingActionButton`, `CollapsingToolbarLayout` and `Snackbar` together.

One feature that we'll be missing because of this decision, is applying layout behaviors to the
`BottomNavigationView`, like if you wanted it to scroll out of the way as the user scrolls down;
a transparent `BottomNavigationView` would also not work.

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <androidx.coordinatorlayout.widget.CoordinatorLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_above="@id/bottomNavigation">

        <com.google.android.material.appbar.AppBarLayout
            android:id="@+id/appbar"
            android:layout_width="match_parent"
            android:layout_height="150dp"
            android:theme="@style/ThemeOverlay.MaterialComponents.ActionBar"
            android:background="@android:color/white">

            <com.google.android.material.appbar.CollapsingToolbarLayout
                android:id="@+id/collapsingToolbar"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                app:expandedTitleGravity="bottom"
                app:layout_scrollFlags="scroll|exitUntilCollapsed|snap">

                <androidx.appcompat.widget.Toolbar
                    android:id="@+id/toolbar"
                    popupTheme="@style/ThemeOverlay.MaterialComponents.Dark"
                    android:layout_width="match_parent"
                    android:layout_height="?attr/actionBarSize"
                    app:layout_collapseMode="pin" />

            </com.google.android.material.appbar.CollapsingToolbarLayout>
        </com.google.android.material.appbar.AppBarLayout>

        <!-- Host for the fragments of our Bottom Navigation destinations -->
        <FrameLayout
            android:id="@+id/bottomNavHost"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            app:layout_behavior="@string/appbar_scrolling_view_behavior" />

        <com.google.android.material.floatingactionbutton.FloatingActionButton
            android:id="@+id/fab"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="bottom|end"
            android:layout_margin="24dp"
            android:src="@drawable/ic_add" />

    </androidx.coordinatorlayout.widget.CoordinatorLayout>

    <com.google.android.material.bottomnavigation.BottomNavigationView
        android:id="@+id/bottomNavigation"
        style="@style/Widget.MaterialComponents.BottomNavigationView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true" />

</RelativeLayout>
```

## Fragment Management
The `BottomNavigationView` is just a view, it doesn't provide any of the logic required to
switch between fragments and retain their instances. Thankfully Android has us covered with `FragmentManager`; each `Activity` and `Fragment` has one of these, and they are all we need
to manage our fragments; it even takes care of saving and restoring their state into bundles.

We will be writing some code of our own though. We need to declare the available destinations
and inflate the menu items for them; propagate presses of the back button to the active fragment;
and swap the fragments by coordinating the `FragmentManager`.

We will be supporting **two modes of fragment retention**:
- retaining and reusing the same fragment instances;
- always creating new fragment instances when navigated to.

### Implementation

#### BottomNavManager.kt
```kotlin
/**
 * Handles switching between bottom navigation destinations and
 * takes care of the fragments representing the destinations.
 */
class BottomNavManager(
    private val host: BottomNavHost,
    private val bottomNavigation: BottomNavigationView,
    @IdRes val containerIdRes: Int,
    private val fragmentRetentionBehavior: FragmentRetentionBehavior
) : Stateful, OnBackPressedInterceptor {

    companion object {
        private const val STATE_SELECTED_ITEM_ID = "selectedItemId"
    }

    private val destinations: ArrayList<BottomNavDestination>
        get() = host.provideDestinations()

    private val activeFragment: Fragment?
        get() = host.fragmentManager.findFragmentById(containerIdRes)

    init {
        bottomNavigation.setOnNavigationItemSelectedListener(::switchToDestination)
        bottomNavigation.setOnNavigationItemReselectedListener { /* required */ }

        updateBottomNavigationItems()

        if (activeFragment == null)
            switchToFirstDestination()
    }

    private fun switchToFirstDestination() {
        if (destinations.isNotEmpty())
            switchToDestination(destinations.first())
    }

    private fun updateBottomNavigationItems() {
        bottomNavigation.menu.clear()

        for (dest in destinations) {
            bottomNavigation.menu
                .add(Menu.NONE, dest.idRes, Menu.NONE, dest.titleRes)
                .setIcon(dest.iconRes)
        }
    }

    private fun switchToDestination(item: MenuItem): Boolean {
        destinations.find { it.idRes == item.itemId }
            ?.let { destination ->
                switchToDestination(destination)
                return true
            }
        return false
    }

    private fun switchToDestination(destination: BottomNavDestination) {
        when (fragmentRetentionBehavior) {
            RETAIN_FRAGMENTS -> swapActiveFragmentWhileRetainingOthers(destination)
            RECREATE_FRAGMENTS -> swapActiveFragmentWhileDroppingOthers(destination)
        }
    }

    /**
     * Detaches the active fragment, then either attaches an existing instance of [destination]'s fragment
     * or adds a new instance, depending on whether it's found in [BottomNavHost.fragmentManager].
     */
    private fun swapActiveFragmentWhileRetainingOthers(destination: BottomNavDestination) {
        host.fragmentManager.inTransaction {

            fun addNewInstance() {
                val newInstance = host.provideFragmentForDestination(destination.idRes)
                add(containerIdRes, newInstance, destination.getTag())
            }

            activeFragment?.let(::detach)

            when (val foundFragment = host.fragmentManager.findFragmentByTag(destination.getTag())) {
                null -> addNewInstance()
                else -> attach(foundFragment)
            }
        }
    }

    /**
     * Replaces all fragments in [BottomNavHost.fragmentManager] with a new instance of [destination]'s fragment.
     */
    private fun swapActiveFragmentWhileDroppingOthers(destination: BottomNavDestination) {
        host.fragmentManager.inTransaction {
            val fragment = host.provideFragmentForDestination(destination.idRes)
            replace(containerIdRes, fragment)
        }
    }

    /**
     * Called by the hosting activity when the Back button is pressed.
     * Gets propagated to the active bottom nav fragment.
     * @return True if the fragment handled the back press, false otherwise.
     */
    override fun onBackPressed(): Boolean = (activeFragment as? BottomNavFragment)?.onBackPressed() ?: false

    override fun onSaveInstanceState(outState: Bundle) {
        outState.putInt(STATE_SELECTED_ITEM_ID, bottomNavigation.selectedItemId)
    }

    override fun onRestoreInstanceState(savedState: Bundle) {
        bottomNavigation.selectedItemId = savedState.getInt(STATE_SELECTED_ITEM_ID)
    }

    private fun BottomNavDestination.getTag() = "bottom_nav_destination_$idRes"
}

inline fun FragmentManager.inTransaction(func: FragmentTransaction.() -> Unit) {
    beginTransaction().apply {
        func()
        commit()
    }
}
```

#### FragmentRetentionBehavior.kt
```kotlin
enum class FragmentRetentionBehavior {
    RECREATE_FRAGMENTS,
    RETAIN_FRAGMENTS
}
```

#### BottomNavDestination.kt
```kotlin
/**
 * Defines a bottom navigation destination that can be navigated to.
 */
data class BottomNavDestination(
    @IdRes val idRes: Int,
    @StringRes val titleRes: Int,
    @DrawableRes val iconRes: Int
)
```

#### BottomNavFragment.kt
```kotlin
/**
 * Fragments representing navigation destinations implement this interface.
 */
interface BottomNavFragment : OnBackPressedInterceptor
```

#### BottomNavHost.kt
Used in our "home" fragment to declare the destinations and provide their fragments.

```kotlin
interface BottomNavHost {

    val fragmentManager: FragmentManager

    fun provideDestinations(): ArrayList<BottomNavDestination>

    fun provideFragmentForDestination(@IdRes destinationId: Int): Fragment
}
```

#### Stateful.kt
Used by the `BottomNavManager` to save its state `Bundle` as part of the `savedInstanceState` of
the `Fragment` that is hosting it.

```kotlin
/**
 * Marks custom classes whose state can be saved in a bundle.
 */
interface Stateful {

    fun onSaveInstanceState(outState: Bundle)

    fun onRestoreInstanceState(savedState: Bundle)
}

fun Bundle.saveInstanceStateOf(vararg instances: Stateful) {
    for (instance in instances) {
        instance.onSaveInstanceState(this)
    }
}

fun Bundle.restoreInstanceStateOf(vararg instances: Stateful) {
    for (instance in instances) {
        instance.onRestoreInstanceState(this)
    }
}
```

#### OnBackPressedInterceptor.kt
Used to let the destination `Fragment`s and the `BottomNavManager` handle the back button.

```kotlin
/**
 * Used to propagate back presses between activities and their fragments
 * or any other components, like [BottomNavManager].
 */
interface OnBackPressedInterceptor {

    /**
     * @return True if the fragment handled the back press, false otherwise.
     */
    fun onBackPressed(): Boolean
}

/**
 * Propagates the event through a chain of responsibility to the NavHost's current fragment.
 */
fun AppCompatActivity.propagateOnBackPressedToNavHostFragment(@IdRes navHostFragmentIdRes: Int): Boolean {
    val navHostFragment = supportFragmentManager.findFragmentById(navHostFragmentIdRes)
    val currentFragment = navHostFragment?.childFragmentManager?.fragments?.get(0)

    if (currentFragment is OnBackPressedInterceptor) {
        return currentFragment.onBackPressed()
    }
    return false
}
```

### Usage Example

#### HubFragment.kt
This is our "home" screen that contains the Bottom Navigation and declares the available destinations.

```kotlin
import kotlinx.android.synthetic.main.fragment__hub.*

class HubFragment : Fragment(), OnBackPressedInterceptor {

    private lateinit var bottomNavManager: BottomNavManager

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        return inflater.inflate(R.layout.fragment__hub, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        NavigationUI.setupWithNavController(toolbar, findNavController())

        bottomNavManager = BottomNavManager(BottomNavHostImpl(), bottomNavigation, R.id.bottomNavHost, RETAIN_FRAGMENTS)
        savedInstanceState?.restoreInstanceStateOf(bottomNavManager)

        fab.setOnClickListener {
            Snackbar.make(it, "The FAB properly moves out of the way!", Snackbar.LENGTH_LONG).show()
        }
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        outState.saveInstanceStateOf(bottomNavManager)
    }

    inner class BottomNavHostImpl : BottomNavHost {

        override fun provideDestinations() = arrayListOf(
            BottomNavDestination(R.id.navigation__practices, R.string.title_practices, R.drawable.ic_practices),
            BottomNavDestination(R.id.navigation__diary, R.string.title_diary, R.drawable.ic_diary)
        )

        override fun provideFragmentForDestination(@IdRes destinationId: Int): Fragment =
            when (destinationId) {
                R.id.navigation__practices -> PracticesFragment.newInstance()
                R.id.navigation__diary -> DiaryFragment.newInstance()
                else -> throw IllegalArgumentException("Unknown destinationId: $destinationId.")
            }

        override val fragmentManager: FragmentManager
            get() = this@HubFragment.childFragmentManager
    }

    override fun onBackPressed() = bottomNavManager.onBackPressed()
}
```

#### PracticesFragment.kt
For a `Fragment` to be useable with our `BottomNavManager`, it needs to implement
the `BottomNavFragment` interface.

```kotlin
class PracticesFragment : Fragment(), BottomNavFragment {

    companion object {
        fun newInstance() = PracticesFragment()
    }

    // We don't handle the back press so just return false.
    // We would want to handle it if for example the screen
    // contained a "Bottom Sheet" and we wanted to hide it.
    override fun onBackPressed() = false
    
    ...
}
```

#### MainActivity.kt
In our `MainActivity` we need to propagate the back button presses to the `BottomNavHost`
so it's `Fragment`s can handle back presses.

I use the Navigation Architecture Component in this example;
if you don't use it you'll have to modify the `propagateOnBackPressedToNavHostFragment()` function.
It just needs to call the `onBackPressed()` function on your `BottomNavHost` fragment.

```kotlin
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity__main)
    }

    // this is the only part that concerns Bottom Navigation
    override fun onBackPressed() {
        val wasHandled = propagateOnBackPressedToNavHostFragment(R.id.navHostFragment)
        if (!wasHandled) super.onBackPressed()
    }

    override fun onSupportNavigateUp(): Boolean = findNavController(R.id.navHostFragment).navigateUp()
}
```

#### activity__main.xml
In my case, the `MainActivity` just hosts a `NavHostFragment` from the Navigation Architecture Component. My "home" fragment `HubFragment`, is set as the start destination of the
navigation graph. This doesn't really concern you if you're not using this type of navigation,
just make sure to propagate the back button presses to your "home" `Fragment` as mentioned above.

```xml
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <fragment
        android:id="@+id/navHostFragment"
        android:name="androidx.navigation.fragment.NavHostFragment"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:defaultNavHost="true"
        app:navGraph="@navigation/nav_hub" />

</FrameLayout>
```
