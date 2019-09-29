package com.example.restaurantesakip1.Data;

import android.os.AsyncTask;
import android.util.JsonReader;

import com.example.restaurantesakip1.Models.Restaurant;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.net.ssl.HttpsURLConnection;

public class RestaurantRepository implements Repository<Restaurant> {

    public List<Restaurant> localDB;
    public static RestaurantRepository instance = new RestaurantRepository();

    private RestaurantRepository(){
        localDB = new ArrayList<>();
        localDB.add(new Restaurant(0, "Coma feliz"));
        localDB.add(new Restaurant(1, "Dennos su plata"));
    }

    static public RestaurantRepository getInstace(){
        return instance;
    }



    @Override
    public void add(Restaurant item) {
        add(Collections.singleton(item));
    }

    @Override
    public void add(Iterable<Restaurant> items) {
        for (Restaurant restaurant : items){
            System.out.println("Adding " + restaurant.name);
        }
    }

    @Override
    public void update(Restaurant item) {

    }

    @Override
    public void remove(Restaurant item) {

    }

    @Override
    public List<Restaurant> query(JSONObject specification) {

        return null;
    }
}
