package com.example.restaurantesakip1.Models;

import com.google.android.gms.maps.model.LatLng;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class Restaurant {
    public int id = 0;
    public String name;

    public LatLng latLng;
    public String address;
    public float score; //Puede que sea solo el metodo de abajo
    public int phoneNumber;

    public List<String> foodTypes;
    public List<String> imagesUrls;
    public Map<String, String> schedule;

    public List<Review> reviews;
    public List<Comment> comments;

    public Restaurant(int id, String name) {
        this.id = id;
        this.name = name;
        this.latLng = new LatLng(9.864244, -83.920438);
        this.address = "En su corazón";
        this.phoneNumber = 88687839;
        this.foodTypes = new ArrayList<String>() {{
            add("American");
            add("Tiquician");
        }};
        this.schedule = new HashMap<String, String>() {{
            put("Lunes", "6:00AM-11:00PM");
            put("Martes", "12:00AM - 11:50PM");
        }};

        this.imagesUrls = new LinkedList<>();
        this.imagesUrls.add("http://www.liveincostarica.com/blog/wp-content/uploads/2018/11/chifrijo-costa-rica-672x372.jpg");

        this.comments = new LinkedList<Comment>(){{
            add(new Comment(0));
            add(new Comment(1));
        }};
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
