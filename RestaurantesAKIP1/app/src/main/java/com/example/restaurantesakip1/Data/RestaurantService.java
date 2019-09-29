package com.example.restaurantesakip1.Data;

import com.example.restaurantesakip1.Models.Restaurant;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface RestaurantService {
    @GET("/restaurants")
    Call<List<Restaurant>> getAllRestaurants();

    @GET("/restaurants/{id}")
    Call<List<Restaurant>> getRestaurant(@Path("id") int id);
}
