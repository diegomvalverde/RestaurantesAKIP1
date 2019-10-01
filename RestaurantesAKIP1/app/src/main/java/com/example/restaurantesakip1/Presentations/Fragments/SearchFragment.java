package com.example.restaurantesakip1.Presentations.Fragments;

import android.content.Intent;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;

import androidx.fragment.app.Fragment;

import com.example.restaurantesakip1.Data.RestaurantRepository;
import com.example.restaurantesakip1.Data.RestaurantService;
import com.example.restaurantesakip1.Data.RetrofitClient;
import com.example.restaurantesakip1.Models.Restaurant;
import com.example.restaurantesakip1.Models.SearchAdapter;
import com.example.restaurantesakip1.Presentations.DetailedRestActivity;
import com.example.restaurantesakip1.R;

import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 */
public class SearchFragment extends Fragment {

    public ListView lv_search;
    public List<Restaurant> restaurantsResults;
    public ArrayAdapter<Restaurant> searchAdapter;
    public EditText searchBar;
    public boolean resultsInList;


    public SearchFragment() {
        // Required empty public constructor
    }

    public void showResults(List<Restaurant> restaurants){
        //List results
        this.restaurantsResults = restaurants;
        this.searchAdapter.clear();
        this.searchAdapter.addAll(restaurants);
        this.searchAdapter.notifyDataSetChanged();

        //Map results
        MapResultsFragment fragMap = (MapResultsFragment) getChildFragmentManager().findFragmentById(R.id.frag_mapResults);
        if (fragMap == null){
            System.out.println("Here we got an error");
        } else
            fragMap.pinPointRestaurants(restaurants);
    }

    public void showMoreInfo(Restaurant restaurant){
        System.out.println(restaurant.name);
        //Set some values
    }



    public void openDetailedInfo(int index){
        Restaurant restaurant = this.restaurantsResults.get(index);
        Intent intent = new Intent(this.getContext(), DetailedRestActivity.class);
        intent.putExtra("RESTAURANT_ID", restaurant.id);
        this.startActivity(intent);
    }

    public void setupSpinners(){

    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View myView = inflater.inflate(R.layout.fragment_search, container, false);

        this.searchBar = myView.findViewById(R.id.tbox_searchBar);
        this.lv_search = myView.findViewById(R.id.lv_searchResults);

        this.searchBar.setOnKeyListener((view, keyCode, event) -> {
            if ((event.getAction() == KeyEvent.ACTION_DOWN) &&
                    (keyCode == KeyEvent.KEYCODE_ENTER)) {
                // Perform action on key press
                performSearch();
                return true;
            }
            return false;
        });


        this.restaurantsResults = RestaurantRepository.getInstace().localDB;
        //this.restaurantsResults = new ArrayList<>();

        this.searchAdapter = new SearchAdapter(this.getContext(), this.restaurantsResults);
        this.lv_search.setAdapter(this.searchAdapter);

        this.lv_search.setOnItemClickListener( (adapterView, view, i, l) -> openDetailedInfo(i));

        return myView;
    }


    public void performSearch(){
        RestaurantService service = RetrofitClient.getRetrofitInstance().create(RestaurantService.class);
        Call<List<Restaurant>> call = service.getAllRestaurants();

        call.enqueue(new Callback<List<Restaurant>>() {
            @Override
            public void onResponse(Call<List<Restaurant>> call, Response<List<Restaurant>> response) {
                showResults(response.body());
            }

            @Override
            public void onFailure(Call<List<Restaurant>> call, Throwable t) {
                System.out.println("Something went wrong");
                System.out.println(t.getCause());
            }
        });

    }

    public String filterThings(){
        return "";
    }

}