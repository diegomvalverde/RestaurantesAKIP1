package com.example.restaurantesakip1.Models;

import com.google.android.gms.maps.model.LatLng;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;

public class Filter {
    @SerializedName("name")
    String name = "";

    @SerializedName("stars")
    int stars = 5;

    @SerializedName("price")
    String price = "barato";

    @SerializedName("foodType")
    String foodType = null;

    @SerializedName("distance")
    List<Double> distance;

    public Filter(List<Double> distance){
        LatLng latLng = new LatLng(9.856290, -83.912560);
        distance =  new ArrayList<>();
        distance.add(latLng.longitude);
        distance.add(latLng.latitude);
        this.distance = distance;
    }
}
