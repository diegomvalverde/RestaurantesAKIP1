package com.example.restaurantesakip1.Presentations.Fragments;


import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.restaurantesakip1.R;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;

/**
 * A simple {@link Fragment} subclass.
 */
public class LocationFragment extends SupportMapFragment implements OnMapReadyCallback {


    public LocationFragment() {
        // Required empty public constructor
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
        LatLng latLng = new LatLng(36.679582, -5.444791);
        float zoom = 5;
        googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(latLng, zoom));
    }
}
