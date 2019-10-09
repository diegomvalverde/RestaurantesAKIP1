package com.example.restaurantesakip1.Models;

import com.google.android.gms.maps.model.LatLng;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;

public class Filter {
    @SerializedName("name")
    public String name = "";

    @SerializedName("stars")
    public int stars = -1;

    @SerializedName("price")
    public String price = "";

    @SerializedName("foodType")
    public String foodType = "";

    @SerializedName("distance")
    public List<Double> distance  = new ArrayList<>();;

}
