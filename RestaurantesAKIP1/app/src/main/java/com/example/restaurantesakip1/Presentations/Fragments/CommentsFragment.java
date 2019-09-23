package com.example.restaurantesakip1.Presentations.Fragments;


import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.example.restaurantesakip1.Data.RestaurantRepository;
import com.example.restaurantesakip1.Models.Comment;
import com.example.restaurantesakip1.Models.CommentsAdapter;
import com.example.restaurantesakip1.Models.Restaurant;
import com.example.restaurantesakip1.Models.SearchAdapter;
import com.example.restaurantesakip1.R;

import java.util.List;

/**
 * A simple {@link Fragment} subclass.
 */
public class CommentsFragment extends Fragment {
    private ListView lv_comments;
    private ArrayAdapter<Comment> commentsAdapter;
    private List<Comment> commentsHistory;

    private Restaurant restaurantData;

    public CommentsFragment(Restaurant restaurant) {
        this.restaurantData = restaurant;
        // Required empty public constructor
    }

    private void setupComments(View myView){
        this.lv_comments = myView.findViewById(R.id.lv_comments);

        this.commentsHistory = restaurantData.comments;

        this.commentsAdapter = new CommentsAdapter(getContext(), this.commentsHistory);

        this.lv_comments.setAdapter(this.commentsAdapter);

        //this.lv_comments.setOnItemClickListener( (adapterView, view, i, l) -> openDetailedInfo(i));
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View myView = inflater.inflate(R.layout.fragment_comments, container, false);
        setupComments(myView);
        return myView;
    }

}
