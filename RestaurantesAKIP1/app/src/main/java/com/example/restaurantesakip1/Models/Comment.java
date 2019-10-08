package com.example.restaurantesakip1.Models;

import java.util.Date;

public class Comment {
    public String _id;
    public int userId;
    public int restaurantId;
    public Date date;
    public String body;

    public Comment(String id){
        _id = id;
        date = new Date();
        userId = 666;
        body = "Dude, el mejor chifrijo de la vida";
    }
}
