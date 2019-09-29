package com.example.restaurantesakip1.Models;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.example.restaurantesakip1.R;


import java.util.List;

public class SearchAdapter extends ArrayAdapter<Restaurant> {

    public SearchAdapter(Context context, List<Restaurant> restaurants) {
        super(context, 0, restaurants);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // Get the data item for this position
        Restaurant restaurant = getItem(position);
        // Check if an existing view is being reused, otherwise inflate the view
        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(R.layout.item_restaurant, parent, false);
        }
        // Lookup view for data population
        TextView txtName = convertView.findViewById(R.id.txt_itemRestName);
        TextView txtScore = convertView.findViewById(R.id.txt_itemRestScore);

        txtName.setText(restaurant.name);
        txtScore.setText(Float.toString(restaurant.getScore()));

        // Populate the data into the template view using the data object

        // Return the completed view to render on screen
        return convertView;
    }

}
