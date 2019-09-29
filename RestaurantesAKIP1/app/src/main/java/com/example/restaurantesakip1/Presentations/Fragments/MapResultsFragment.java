package com.example.restaurantesakip1.Presentations.Fragments;


import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.restaurantesakip1.Models.Restaurant;
import com.example.restaurantesakip1.R;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;

import java.util.LinkedList;
import java.util.List;

/**
 * A simple {@link Fragment} subclass.
 */
public class MapResultsFragment extends SupportMapFragment implements OnMapReadyCallback {

    GoogleMap myMap;
    List<Marker> markersOnMap;


    public MapResultsFragment() {
        // Required empty public constructor
    }

    private void cleanMap(){
        for (Marker marker: markersOnMap){
            marker.remove();
        }
        markersOnMap = new LinkedList<>();
    }

    public void pinPointRestaurants(List<Restaurant> restaurantList){
        
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_map_results, container, false);
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        //Ask Diego for help here
        //myMap = googleMap;
        //markersOnMap = new LinkedList<>();
    }
}
