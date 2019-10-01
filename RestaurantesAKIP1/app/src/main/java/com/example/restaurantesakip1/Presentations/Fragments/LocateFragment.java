package com.example.restaurantesakip1.Presentations.Fragments;


import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;

import androidx.fragment.app.Fragment;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

/**
 * A simple {@link Fragment} subclass.
 */
public class LocateFragment extends SupportMapFragment implements OnMapReadyCallback {
    GoogleMap map;
    LatLng point;
    private View.OnTouchListener mListener;

    public LocateFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = super.onCreateView(inflater, container, savedInstanceState);
        getMapAsync(this);

        return rootView;
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        map = googleMap;
        //map.set
        point = new LatLng(9.856290, -83.912560);
        map.moveCamera(CameraUpdateFactory.newLatLngZoom(point, 16));

        map.setOnMapClickListener(latLng -> {
            map.clear();
            point = latLng;
            map.addMarker(new MarkerOptions().position(point));

        });


    }
}
