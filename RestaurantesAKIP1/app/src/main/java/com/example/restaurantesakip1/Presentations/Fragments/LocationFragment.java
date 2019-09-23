package com.example.restaurantesakip1.Presentations.Fragments;


import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.restaurantesakip1.Data.RestaurantRepository;
import com.example.restaurantesakip1.Models.Restaurant;
import com.example.restaurantesakip1.R;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

/**
 * A simple {@link Fragment} subclass.
 */
public class LocationFragment extends SupportMapFragment implements OnMapReadyCallback {
    private LatLng pointingAt = null;

    public LocationFragment() {

    }

    public void setPointingAt(LatLng latLng){
        pointingAt = latLng;
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        // Inflate the layout for this fragment
        //View v = inflater.inflate(R.layout.fragment_location, container, false);
        View rootView = super.onCreateView(inflater, container, savedInstanceState);
        getMapAsync(this);

        return rootView;

    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        if (pointingAt == null)
            pointingAt = new LatLng(36.679582, -5.444791);

        float zoom = 20;
        googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(pointingAt, zoom));
        googleMap.addMarker(new MarkerOptions().position(pointingAt));
    }
}
