package com.example.restaurantesakip1.Presentations;

import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager.widget.ViewPager;


import android.os.Bundle;

import com.example.restaurantesakip1.Presentations.Fragments.AddFragment;
import com.example.restaurantesakip1.Presentations.Fragments.SearchFragment;
import com.example.restaurantesakip1.Presentations.Fragments.SectionsPageAdapter;
import com.example.restaurantesakip1.R;
import com.google.android.material.tabs.TabLayout;




public class SearchActivity extends AppCompatActivity {

    public SectionsPageAdapter pagesAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search);

        pagesAdapter = new SectionsPageAdapter(getSupportFragmentManager());

        ViewPager viewPager = findViewById(R.id.search_container);
        setupViewPager(viewPager);
        TabLayout tabLayout = findViewById(R.id.tabs_options);
        tabLayout.setupWithViewPager(viewPager);
    }

    public void setupViewPager(ViewPager viewPager){
        SectionsPageAdapter adapter = new SectionsPageAdapter(getSupportFragmentManager());
        adapter.addFragment(new SearchFragment(), "Buscar");
        adapter.addFragment(new AddFragment(), "Agregar");
        viewPager.setAdapter(adapter);
    }


}
