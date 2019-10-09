package com.example.restaurantesakip1.Data;

import com.example.restaurantesakip1.Models.Restaurant;
import com.example.restaurantesakip1.Models.Session;
import com.example.restaurantesakip1.Models.User;


import org.json.JSONObject;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface UserService {
    @GET("/login/{email}/{pass}")
    Call< User > getUser(@Path("email") String email, @Path("pass") String pass);

    @POST("/users")
    Call<JSONObject> saveUser(@Body User body);

    //@GET("/login/{email}/{pass}")
    //Call<User> getUser();


}
