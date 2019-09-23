package com.example.restaurantesakip1.Presentations;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.viewpager.widget.ViewPager;

import com.example.restaurantesakip1.Data.RestaurantRepository;
import com.example.restaurantesakip1.Models.Restaurant;
import com.example.restaurantesakip1.Presentations.Fragments.CommentsFragment;
import com.example.restaurantesakip1.Presentations.Fragments.GalleryFragment;
import com.example.restaurantesakip1.Presentations.Fragments.InformationFragment;
import com.example.restaurantesakip1.Presentations.Fragments.LocationFragment;
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


        int restaurantId = getIntent().getIntExtra("RESTAURANT_ID", -1);
        System.out.println(restaurantId);

        Restaurant restaurant = RestaurantRepository.getInstace().localDB.get(restaurantId); //Esto debe de ser un query


        pagesAdapter = new SectionsPageAdapter(getSupportFragmentManager());

        ViewPager viewPager = findViewById(R.id.container);
        setupViewPager(viewPager, restaurant);
        TabLayout tabLayout = findViewById(R.id.tabs_restaurantInfo);

        tabLayout.setupWithViewPager(viewPager);
    }

    public void setupViewPager(ViewPager viewPager, Restaurant restaurant){
        SectionsPageAdapter adapter = new SectionsPageAdapter(getSupportFragmentManager());
        adapter.addFragment(new InformationFragment(restaurant), "Informacion");
        adapter.addFragment(new GalleryFragment(), "Galeria");
        adapter.addFragment(new CommentsFragment(), "Comentarios");
        viewPager.setAdapter(adapter);
    }
}
