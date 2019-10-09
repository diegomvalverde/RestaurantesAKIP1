package com.example.restaurantesakip1.Models;

import com.google.android.gms.maps.model.LatLng;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;

public class Filter {
    @SerializedName("name")
    String name = "";

    @SerializedName("stars")
    int stars = -1;

    @SerializedName("price")
    String price = "";

    @SerializedName("foodTypes")
    String foodType = "";

    @SerializedName("distance")
    List<Double> distance  = new ArrayList<>();;

}
