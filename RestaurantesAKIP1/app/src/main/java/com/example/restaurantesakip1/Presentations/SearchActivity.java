package com.example.restaurantesakip1.Presentations;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import com.example.restaurantesakip1.R;


public class SearchActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search);
    }



    public void openDetailedInfo(View v){
        Intent myIntent = new Intent(SearchActivity.this, DetailedRestActivity.class);
        SearchActivity.this.startActivity(myIntent);
    }
}
