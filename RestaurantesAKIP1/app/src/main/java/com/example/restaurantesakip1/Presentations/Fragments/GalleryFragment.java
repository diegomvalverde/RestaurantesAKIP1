package com.example.restaurantesakip1.Presentations.Fragments;


import android.graphics.drawable.Drawable;
import android.os.AsyncTask;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.example.restaurantesakip1.Models.Restaurant;
import com.example.restaurantesakip1.R;

import java.io.InputStream;
import java.net.URL;

/**
 * A simple {@link Fragment} subclass.
 */
public class GalleryFragment extends Fragment {
    private Restaurant restaurantData;
    LinearLayout imagesContainer;

    public GalleryFragment(Restaurant restaurant) {
        // Required empty public constructor  :p
        restaurantData = restaurant;
    }

    public GalleryFragment() {
        // Required empty public constructor  :p
    }

    private void setupGallery(View myView){
        imagesContainer = myView.findViewById(R.id.linl_restaurantGallery);

        for (String url : restaurantData.imagesUrls){
            try {
                new GetPhotosTask().execute(url); // Drawable.createFromStream(is, "src name");
            } catch (Exception e) {
                System.out.println("I tried");
                System.out.println(e.toString());
            }
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View myView = inflater.inflate(R.layout.fragment_gallery, container, false);
        setupGallery(myView);
        return myView;
    }


    private class GetPhotosTask extends AsyncTask<String, Void, Drawable>{

        @Override
        protected Drawable doInBackground(String... urls) {

            try {
                InputStream is = (InputStream) new URL(urls[0]).getContent();
                Drawable d = Drawable.createFromStream(is, "src name");
                return d;

            } catch (Exception e) {
                System.out.println("I tried");
                System.out.println(e.toString());
                return null;
            }
        }

        protected void onPostExecute(Drawable result) {
            //pd.dismiss();
            if (result == null) return;

            ImageView imageView = new ImageView(getContext());
            imageView.setImageDrawable(result);

            imagesContainer.addView(imageView);
        }
    }

}
