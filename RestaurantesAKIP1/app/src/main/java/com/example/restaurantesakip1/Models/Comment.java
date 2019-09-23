package com.example.restaurantesakip1.Models;

import java.util.Date;

public class Comment {
    public int id;
    public int userId;
    public int restaurantId;
    public Date date;
    public String body;


    public Comment(int id){
        date = new Date();
        userId = 666;
        body = "Dude, el mejor chifrijo de la vida";
    }
}
