package com.example.restaurantesakip1.Models;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.example.restaurantesakip1.R;

import java.util.List;

public class CommentsAdapter extends ArrayAdapter<Comment> {

    public CommentsAdapter(Context context, List<Comment> comments) {
        super(context, 0, comments);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // Get the data item for this position
        Comment comment = getItem(position);
        // Check if an existing view is being reused, otherwise inflate the view
        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(R.layout.item_restaurant, parent, false);
        }
        // Lookup view for data population

        TextView txtUsername = (TextView) convertView.findViewById(R.id.txt_itemUsername);
        TextView txtDate = (TextView) convertView.findViewById(R.id.txt_itemDatePosted);
        TextView txtBody = (TextView) convertView.findViewById(R.id.txt_itemCommentBody);



        txtUsername.setText( Integer.toString(comment.userId) );
        txtDate.setText(comment.date.toString());
        txtBody.setText(comment.body);





        // Populate the data into the template view using the data object

        // Return the completed view to render on screen
        return convertView;
    }
}
