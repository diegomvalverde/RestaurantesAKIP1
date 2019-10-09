package com.example.restaurantesakip1.Data;

import com.example.restaurantesakip1.Models.Comment;
import com.example.restaurantesakip1.Models.Restaurant;
import com.example.restaurantesakip1.Models.Review;

import org.json.JSONObject;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Header;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;

public interface InteractionService {
    @POST("/comments")
    Call<ResponseBody> postComment(@Header("Authorization") String authHeader, @Body Comment body);

    @POST("/reviews")
    Call<ResponseBody> updateReview(@Header("Authorization") String authHeader, @Body Review body);

    @Multipart
    @POST("/upload")
    Call<ResponseBody> uploadImage(@Part MultipartBody.Part file, @Part("name") RequestBody requestBody);
}
