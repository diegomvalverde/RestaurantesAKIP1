package com.example.restaurantesakip1.Presentations;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager.widget.ViewPager;

import com.example.restaurantesakip1.Presentations.Fragments.CommentsFragment;
import com.example.restaurantesakip1.Presentations.Fragments.GalleryFragment;
import com.example.restaurantesakip1.Presentations.Fragments.InformationFragment;
import com.example.restaurantesakip1.Presentations.Fragments.SectionsPageAdapter;
import com.example.restaurantesakip1.R;
import com.google.android.material.tabs.TabLayout;

//import androidx.viewpager.widget.ViewPager;

public class DetailedRestActivity extends AppCompatActivity {

    public SectionsPageAdapter pagesAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detailed_rest);

        pagesAdapter = new SectionsPageAdapter(getSupportFragmentManager());

        ViewPager viewPager = findViewById(R.id.container);
        setupViewPager(viewPager);
        TabLayout tabLayout = findViewById(R.id.tabs_restaurantInfo);
        tabLayout.setupWithViewPager(viewPager);
    }

    public void setupViewPager(ViewPager viewPager){
        SectionsPageAdapter adapter = new SectionsPageAdapter(getSupportFragmentManager());
        adapter.addFragment(new InformationFragment(), "Information");
        adapter.addFragment(new GalleryFragment(), "Gallery");
        adapter.addFragment(new CommentsFragment(), "Comments");
        viewPager.setAdapter(adapter);
    }
}
