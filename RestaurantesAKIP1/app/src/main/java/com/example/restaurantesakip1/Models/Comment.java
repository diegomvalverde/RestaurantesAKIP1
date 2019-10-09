package com.example.restaurantesakip1.Models;

import com.google.gson.annotations.SerializedName;

import java.util.Date;

public class Comment {
    @SerializedName("_id")
    public String _id;
    @SerializedName("userId")
    public String userId;
    @SerializedName("restaurantId")
    public String restaurantId;

    @SerializedName("date")
    public String date;
    @SerializedName("comment")
    public String comment;

    public Comment(){
        date = "[Ingrese fecha aqui]";
        userId = "666";
        comment = "Dude, el mejor chifrijo de la vida";
    }
}
