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

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * A simple {@link Fragment} subclass.
 */
public class MapResultsFragment extends SupportMapFragment implements OnMapReadyCallback {

    GoogleMap myMap;
    List<MarkerOptions> markersOnMap; //I have no idea, most delete
    Map<String, Restaurant> restaurantMap; //Has a LatLang reference for each Restaurant

    public MapResultsFragment() {
        // Required empty public constructor
    }

    private void cleanMap(){
        for (MarkerOptions marker: markersOnMap){
            //marker.remove();
        }
        markersOnMap = new LinkedList<>();
    }

    public void pinPointRestaurants(List<Restaurant> result){
        myMap.clear();
        markersOnMap = new LinkedList<>();
        restaurantMap = new HashMap<>();


        for (Restaurant restaurant : result) {
            MarkerOptions marker = new MarkerOptions().position(restaurant.getLatLng());

            markersOnMap.add(marker);
            myMap.addMarker(marker);
            String key = restaurant.getLatLng().toString();
            restaurantMap.put(key, restaurant);
        }
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View rootView = super.onCreateView(inflater, container, savedInstanceState);
        getMapAsync(this);
        return rootView;
        //return inflater.inflate(R.layout.fragment_map_results, container, false);
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        //Ask Diego for help here
        System.out.println("I loaded");
        myMap = googleMap;
        markersOnMap = new LinkedList<>();
        googleMap.setOnMarkerClickListener(new GoogleMap.OnMarkerClickListener() {
            @Override
            public boolean onMarkerClick(Marker marker) {
                getActivity();

                SearchFragment parentFrag = ((SearchFragment) MapResultsFragment.this.getParentFragment());
                if (parentFrag != null)
                    parentFrag.showMoreInfo( restaurantMap.get( marker.getPosition().toString() ) );

                return false;
            }
        });
    }
}
