package com.example.restaurantesakip1.Presentations.Fragments;


import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.Toast;

import com.example.restaurantesakip1.Data.InteractionService;
import com.example.restaurantesakip1.Data.RestaurantRepository;
import com.example.restaurantesakip1.Data.RestaurantService;
import com.example.restaurantesakip1.Data.RetrofitClient;
import com.example.restaurantesakip1.Models.Comment;
import com.example.restaurantesakip1.Models.CommentsAdapter;
import com.example.restaurantesakip1.Models.Restaurant;
import com.example.restaurantesakip1.Models.Review;
import com.example.restaurantesakip1.Models.SearchAdapter;
import com.example.restaurantesakip1.Models.Session;
import com.example.restaurantesakip1.R;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

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

    public void loadUserOpinion(){
        Review myReview = null;

        for (Review currentReview : restaurantData.reviews){
            if (currentReview.userId.equals(Session.getInstace().user._id)){
                myReview = currentReview;
                break;
            }
        }
        System.out.println("Algun review hara match");
        if (myReview == null) return;

        System.out.println("Yes");

        Spinner scoreSpin = myView.findViewById(R.id.spin_reviewScore);
        Spinner precioSpin = myView.findViewById(R.id.spin_reviewPrices);

        String userScore = Integer.toString(myReview.score);
        String userPrice = myReview.price;

        for (int i = 0; i < 6; i++){
            if (scoreSpin.getItemAtPosition(i).toString().equals(userScore))
                scoreSpin.setSelection(i);
            else
                System.out.println(userScore + " " + scoreSpin.getItemAtPosition(i).toString());
        }

        for (int i = 0; i < 4; i++){
            if (precioSpin.getItemAtPosition(i).toString().equals(userPrice))
                precioSpin.setSelection(i);
        }

    }

    public CommentsFragment(Restaurant restaurant) {
        this.restaurantData = restaurant;
        // Required empty public constructor
    }

    public void postComment(){
        EditText commentBox = myView.findViewById(R.id.tbox_comment);
        String body = commentBox.getText().toString();

        if (body.equals("")){
            System.out.println("No se va a publicar");
            return;
        }

        System.out.println(body);

        Comment comment = new Comment();
        comment.comment = body;
        comment.date = new Date().toString();
        comment.userId = Session.getInstace().user._id;
        comment.restaurantId = this.restaurantData._id;

        InteractionService service = RetrofitClient.getRetrofitInstance().create(InteractionService.class);
        Call<ResponseBody> call = service.postComment("Bearer " + Session.getInstace().token, comment);

        call.enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                System.out.println("Pues se completo");
                System.out.println(response.raw().toString());
                JSONObject message;
                if (response.body() != null) {
                    try {
                        message = new JSONObject(response.body().string());
                        String status = (String) message.get("operation");
                        boolean sucessful = status.equals("sucessful");
                        if (sucessful) {
                            //clearData();
                            Toast.makeText(getContext(), "Se ha posteado el comentario" , Toast.LENGTH_SHORT ).show();
                        } else {
                            Toast.makeText(getContext(), "No se pudo publicar el comentario" , Toast.LENGTH_SHORT ).show();
                        }

                    } catch (IOException e) {
                        e.printStackTrace();
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }

                }
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                System.out.println("There was an error");
                System.out.println(t.getCause());
                Toast.makeText(getContext(), "Hubo un error en la conexion con el servidor." , Toast.LENGTH_SHORT ).show();
            }
        });

    }

    public void postReview(){
        Spinner scoreSpin = myView.findViewById(R.id.spin_reviewScore);
        Spinner precioSpin = myView.findViewById(R.id.spin_reviewPrices);

        String scoreStr = scoreSpin.getSelectedItem().toString();
        String priceStr = precioSpin.getSelectedItem().toString();
        int score = 0;

        if (scoreStr.equals("NA") || priceStr.equals("NA")){
            return;
            //score = Integer.parseInt(scoreStr);
        }

        int scoreValue = Integer.parseInt(scoreStr);
        Review review = new Review();
        review.price = priceStr;
        review.score = scoreValue;

        review.userId = Session.getInstace().user._id;
        review.restaurantId = restaurantData._id;

        InteractionService service = RetrofitClient.getRetrofitInstance().create(InteractionService.class);
        Call<ResponseBody> call = service.updateReview("Bearer " + Session.getInstace().token, review);

        call.enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                JSONObject message;
                if (response.body() != null) {
                    try {
                        message = new JSONObject(response.body().string());
                        String status = (String) message.get("operation");
                        boolean sucessful = status.equals("sucessful");
                        if (sucessful) {
                            //clearData();
                            Toast.makeText(getContext(), "Se ha actualizado su opinion." , Toast.LENGTH_SHORT ).show();
                        } else {
                            Toast.makeText(getContext(), "No se pudo actulizar su opinion." , Toast.LENGTH_SHORT ).show();
                        }

                    } catch (IOException e) {
                        e.printStackTrace();
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }

                }
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                System.out.println("There was an error");
                System.out.println(t.getCause());
                Toast.makeText(getContext(), "Hubo un error en la conexion con el servidor." , Toast.LENGTH_SHORT ).show();
            }
        });


    }

    private void setupComments(){
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
        Button btnPostReview = myView.findViewById(R.id.btn_postReview);
        Button btnPostComment = myView.findViewById(R.id.btn_publishComment);

        btnPostReview.setOnClickListener( v -> postReview());
        btnPostComment.setOnClickListener( v -> postComment());


        setupComments();
        loadUserOpinion();
        return myView;
    }

}
