package com.example.restaurantesakip1.Presentations;

import android.os.Bundle;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.viewpager.widget.ViewPager;

import com.example.restaurantesakip1.Data.RestaurantRepository;
import com.example.restaurantesakip1.Data.RestaurantService;
import com.example.restaurantesakip1.Data.RetrofitClient;
import com.example.restaurantesakip1.Models.Restaurant;
import com.example.restaurantesakip1.Models.Session;
import com.example.restaurantesakip1.Presentations.Fragments.CommentsFragment;
import com.example.restaurantesakip1.Presentations.Fragments.GalleryFragment;
import com.example.restaurantesakip1.Presentations.Fragments.InformationFragment;
import com.example.restaurantesakip1.Presentations.Fragments.LocationFragment;
import com.example.restaurantesakip1.Presentations.Fragments.SectionsPageAdapter;
import com.example.restaurantesakip1.R;
import com.google.android.material.tabs.TabLayout;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

//import androidx.viewpager.widget.ViewPager;

public class DetailedRestActivity extends AppCompatActivity {

    public SectionsPageAdapter pagesAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detailed_rest);


        String restaurantId = getIntent().getStringExtra("RESTAURANT_ID");
        System.out.println(restaurantId);


        RestaurantService service = RetrofitClient.getRetrofitInstance().create(RestaurantService.class);
        Call<Restaurant> call = service.getRestaurant("Bearer " + Session.getInstace().token, restaurantId);

        //I want a loading feature here

        call.enqueue(new Callback<Restaurant>() {
            @Override
            public void onResponse(Call<Restaurant> call, Response<Restaurant> response) {
                if (response.body() == null){
                    System.out.println("Its a null");
                    System.out.println(response.message());
                } else {
                    setupComponents(response.body());
                }
            }

            @Override
            public void onFailure(Call<Restaurant> call, Throwable t) {
                System.out.println(t.getCause());
            }
        });



    }

    public void setupComponents(Restaurant restaurant){
        TextView txtName = findViewById(R.id.txt_restName);
        txtName.setText(restaurant.name);
        TextView txtScore = findViewById(R.id.txt_restScore);
        txtScore.setText(Float.toString(restaurant.stars));

        pagesAdapter = new SectionsPageAdapter(getSupportFragmentManager());

        ViewPager viewPager = findViewById(R.id.container);
        setupViewPager(viewPager, restaurant);
        TabLayout tabLayout = findViewById(R.id.tabs_restaurantInfo);

        tabLayout.setupWithViewPager(viewPager);
    }

    public void setupViewPager(ViewPager viewPager, Restaurant restaurant){
        SectionsPageAdapter adapter = new SectionsPageAdapter(getSupportFragmentManager());
        adapter.addFragment(new InformationFragment(restaurant), "Informacion");
        adapter.addFragment(new GalleryFragment(restaurant), "Galeria");
        adapter.addFragment(new CommentsFragment(restaurant), "Comentarios");
        viewPager.setAdapter(adapter);
    }
}
