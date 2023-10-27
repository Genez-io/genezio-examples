package com.example.qrgeneratorfrontend

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import androidx.activity.viewModels
import androidx.fragment.app.FragmentManager
import androidx.viewpager2.widget.ViewPager2
import com.example.qrgeneratorfrontend.adapters.ViewAuthPageAdapter
import com.example.qrgeneratorfrontend.viewModels.UserViewModel
import com.genezio.sdk.User
import com.google.android.material.tabs.TabLayout
import com.google.android.material.tabs.TabLayout.OnTabSelectedListener

class MainActivity : AppCompatActivity() {


    private lateinit var tabLayout: TabLayout;
    private lateinit var viewPager2 : ViewPager2;
    private lateinit var adapter : ViewAuthPageAdapter;
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        tabLayout = findViewById(R.id.tab_layout)
        viewPager2 = findViewById(R.id.view_pager);

        tabLayout.addTab((tabLayout.newTab().setText("Login")))
        tabLayout.addTab((tabLayout.newTab().setText("Signup")))

        var fragmentManager: FragmentManager = getSupportFragmentManager();
        adapter = ViewAuthPageAdapter(fragmentManager,lifecycle);
        viewPager2.adapter = adapter;

        tabLayout.addOnTabSelectedListener(object: TabLayout.OnTabSelectedListener{

            override fun onTabSelected(tab: TabLayout.Tab) {

              viewPager2.setCurrentItem(tab.position)

            }

            override fun onTabReselected(tab: TabLayout.Tab) {

            }

            override fun onTabUnselected(tab: TabLayout.Tab) {

            }

        })

        viewPager2.registerOnPageChangeCallback(object: ViewPager2.OnPageChangeCallback(){

            override fun onPageSelected(position: Int) {
                tabLayout.selectTab(tabLayout.getTabAt(position))
            }


        })


    }

    override fun onBackPressed() {
        finish()
        super.onBackPressed()
    }

}