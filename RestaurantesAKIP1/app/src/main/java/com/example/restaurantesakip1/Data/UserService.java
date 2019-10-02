package com.example.restaurantesakip1.Data;

import com.example.restaurantesakip1.Models.Session;
import com.example.restaurantesakip1.Models.User;



import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface UserService {
    @GET("/login/{email}/{pass}")
    Call< User > getUser(@Path("email") String email, @Path("pass") String pass);

    //@GET("/login/{email}/{pass}")
    //Call<User> getUser();


}
