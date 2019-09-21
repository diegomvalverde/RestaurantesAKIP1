package com.example.restaurantesakip1.Data;

import com.example.restaurantesakip1.Models.Restaurant;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class RestaurantRepository implements Repository<Restaurant> {

    List<Restaurant> localDB;

    RestaurantRepository(){
        localDB = new ArrayList<>();
        localDB.add(new Restaurant("Coma feliz"));
        localDB.add(new Restaurant("Dennos su plata"));
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
}
