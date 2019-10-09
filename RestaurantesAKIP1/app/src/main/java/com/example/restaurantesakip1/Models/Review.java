package com.example.restaurantesakip1.Models;

import com.google.gson.annotations.SerializedName;

import java.util.Date;

public class Review {
    @SerializedName("_id")
    public String _id;
    @SerializedName("userId")
    public String userId;
    @SerializedName("restaurantId")
    public String restaurantId;

    @SerializedName("score")
    public int score;

    @SerializedName("price")
    public String price;
}
