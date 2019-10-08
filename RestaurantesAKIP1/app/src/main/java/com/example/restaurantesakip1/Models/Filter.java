package com.example.restaurantesakip1.Models;

import java.util.List;

public class Filter {
    String name = "";
    int stars = 5;
    String price = "barato";
    String foodType = "Variado";
    List<Double> distance;

    public Filter(List<Double> distance){
        this.distance = distance;
    }
}
