package com.example.restaurantesakip1.Models;

import android.os.Build;

import androidx.annotation.RequiresApi;

import java.util.ArrayList;
import java.util.List;

public class Restaurant {
    public int id;
    public String name;
    public String description;
    public int location; //Latitude al final
    public int califation;

    public List<String> foodTypes;
    public List<String> imagesUrls;

    public List<Review> reviews;

    public Restaurant(String name){
        this.name = name;
    }

    public float getScore(){
        reviews = new ArrayList<>();
        float x = 0.0f;
        for (Review r : reviews) {
            x += r.score;
        }
        return x;
    }
}
