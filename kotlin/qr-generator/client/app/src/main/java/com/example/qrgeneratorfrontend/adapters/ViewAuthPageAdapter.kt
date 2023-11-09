package com.example.qrgeneratorfrontend.adapters

import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.lifecycle.Lifecycle
import androidx.viewpager2.adapter.FragmentStateAdapter
import com.example.qrgeneratorfrontend.fragments.SignupTabFragment
import com.example.qrgeneratorfrontend.fragments.LoginTabFragment

class ViewAuthPageAdapter(fragmentManager: FragmentManager, lifecycle: Lifecycle) :
    FragmentStateAdapter(fragmentManager, lifecycle) {
    override fun getItemCount(): Int {
        return 2
    }

    override fun createFragment(position: Int): Fragment {
        if( position==1){
            return SignupTabFragment();
        }
        return LoginTabFragment();
    }
}