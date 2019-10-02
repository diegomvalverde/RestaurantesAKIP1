package com.example.restaurantesakip1.Presentations.Fragments;


import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Spinner;

import com.example.restaurantesakip1.Data.RestaurantRepository;
import com.example.restaurantesakip1.Models.Comment;
import com.example.restaurantesakip1.Models.CommentsAdapter;
import com.example.restaurantesakip1.Models.Restaurant;
import com.example.restaurantesakip1.Models.SearchAdapter;
import com.example.restaurantesakip1.Models.Session;
import com.example.restaurantesakip1.R;

import java.util.Date;
import java.util.List;

/**
 * A simple {@link Fragment} subclass.
 */
public class CommentsFragment extends Fragment {
    private ListView lv_comments;
    private ArrayAdapter<Comment> commentsAdapter;
    private List<Comment> commentsHistory;

    private Restaurant restaurantData;
    private View myView;

    public CommentsFragment() {
        // Required empty public constructor  :p
    }

    public CommentsFragment(Restaurant restaurant) {
        this.restaurantData = restaurant;
        // Required empty public constructor
    }

    public void postComment(){
        Date date = new Date();
        EditText commentBox = myView.findViewById(R.id.tbox_comment);
        String body = commentBox.getText().toString();
        String user_id = Session.getInstace().user._id;

    }

    public void postReview(){
        Spinner scoreSpin = myView.findViewById(R.id.spin_reviewScore);
        Spinner precioSpin = myView.findViewById(R.id.spin_reviewPrices);

        String scoreStr = scoreSpin.toString();
        int score = 0;

        if (!scoreStr.equals("NA")){
            score = Integer.parseInt(scoreStr);
        }

        String precioStr = precioSpin.toString();
    }

    private void setupComments(View myView){
        this.lv_comments = myView.findViewById(R.id.lv_comments);

        if ( restaurantData.comments != null){
            this.commentsHistory = restaurantData.comments;
            this.commentsAdapter = new CommentsAdapter(getContext(), this.commentsHistory);
            this.lv_comments.setAdapter(this.commentsAdapter);
        }

    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View myView = inflater.inflate(R.layout.fragment_comments, container, false);
        this.myView = myView;
        setupComments(myView);
        return myView;
    }

}
