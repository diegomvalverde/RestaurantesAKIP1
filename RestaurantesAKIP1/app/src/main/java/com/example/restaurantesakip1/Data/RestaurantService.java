package com.example.restaurantesakip1.Data;

import com.example.restaurantesakip1.Models.Filter;
import com.example.restaurantesakip1.Models.Restaurant;

import org.json.JSONObject;

import java.util.List;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.HTTP;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface RestaurantService {
    @GET("/restaurants")
    Call<List<Restaurant>> getAllRestaurants( @Header("Authorization") String authHeader);

    @POST("/restaurants")
    Call<ResponseBody> saveRestaurant(@Header("Authorization") String authHeader, @Body Restaurant body);

    @GET("/restaurants/{id}")
    Call<Restaurant> getRestaurant(@Header("Authorization") String authHeader, @Path("id") String id);

    @POST("/restaurants/filter/")
    //@HTTP(method = "GET", path = "/restaurants", hasBody = true)
    Call<List<Restaurant>> filterRestaurants(@Header("Authorization") String authHeader, @Body Filter body);

}
