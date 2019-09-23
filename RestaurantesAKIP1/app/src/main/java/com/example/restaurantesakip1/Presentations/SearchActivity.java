package com.example.restaurantesakip1.Presentations;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Adapter;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.example.restaurantesakip1.Data.RestaurantRepository;
import com.example.restaurantesakip1.Models.Restaurant;
import com.example.restaurantesakip1.Models.SearchAdapter;
import com.example.restaurantesakip1.R;

import java.util.LinkedList;
import java.util.List;


public class SearchActivity extends AppCompatActivity {

    public ListView lv_search;
    public List<Restaurant> restaurantsResults;
    public ArrayAdapter<Restaurant> searchAdapter;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search);
        this.lv_search = findViewById(R.id.lv_searchResults);

        this.restaurantsResults = RestaurantRepository.getInstace().localDB;
        //this.restaurantsResults.add(new Restaurant("Coma feliz"));
        //this.restaurantsResults.add(new Restaurant("Dennos su plata"));

        this.searchAdapter = new SearchAdapter(this, this.restaurantsResults);
        this.lv_search.setAdapter(this.searchAdapter);

        this.lv_search.setOnItemClickListener( (adapterView, view, i, l) -> openDetailedInfo(i));
    }

    public void openDetailedInfo(int index){
        Restaurant restaurant = this.restaurantsResults.get(index);
        Intent intent = new Intent(SearchActivity.this, DetailedRestActivity.class);
        intent.putExtra("RESTAURANT_ID", restaurant.id);
        this.startActivity(intent);
    }


    public void openDetailedInfo(View v){
        Intent myIntent = new Intent(SearchActivity.this, DetailedRestActivity.class);
        //SearchActivity.this.startActivity(myIntent);
    }
}
