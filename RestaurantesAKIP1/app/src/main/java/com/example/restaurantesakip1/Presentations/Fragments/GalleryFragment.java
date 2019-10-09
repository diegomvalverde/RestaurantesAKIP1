package com.example.restaurantesakip1.Presentations.Fragments;


import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.example.restaurantesakip1.Models.Restaurant;
import com.example.restaurantesakip1.R;

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.net.URL;

import static android.app.Activity.RESULT_OK;

/**
 * A simple {@link Fragment} subclass.
 */
public class GalleryFragment extends Fragment {
    public Restaurant restaurantData;
    LinearLayout imagesContainer;

    public GalleryFragment(Restaurant restaurant) {
        restaurantData = restaurant;
    }

    public GalleryFragment() {
        // Required empty public constructor  :p
    }

    private void setupGallery(View myView){
        imagesContainer = myView.findViewById(R.id.linl_restaurantGallery);
        System.out.println((restaurantData == null) + " Im i null?");

        for (String url : restaurantData.imagesUrls){
            try {
                new GetPhotosTask().execute(url); // Drawable.createFromStream(is, "src name");
            } catch (Exception e) {
                System.out.println("I tried");
                System.out.println(e.toString());
            }
        }
    }

    private void selectPhoto(){
        Intent photoPickerIntent = new Intent(Intent.ACTION_PICK);
        photoPickerIntent.setType("image/*");
        startActivityForResult(photoPickerIntent, RESULT_OK);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View myView = inflater.inflate(R.layout.fragment_gallery, container, false);
        setupGallery(myView);

        ImageButton btn = myView.findViewById(R.id.btn_addPhotos);
        btn.setOnClickListener( v -> selectPhoto());
        return myView;
    }

    @Override
    public void onActivityResult(int reqCode, int resultCode, Intent data) {
        super.onActivityResult(reqCode, resultCode, data);


        if (resultCode == RESULT_OK) {
            try {
                final Uri imageUri = data.getData();
                final InputStream imageStream = getActivity().getContentResolver().openInputStream(imageUri);
                final Bitmap selectedImage = BitmapFactory.decodeStream(imageStream);
            //)//;
            } catch (FileNotFoundException e) {
                e.printStackTrace();
                //Toast.makeText(PostImage.this, "Something went wrong", Toast.LENGTH_LONG).show();
            }

        }else {
            //Toast.makeText(PostImage.this, "You haven't picked Image",Toast.LENGTH_LONG).show();
        }
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
