package com.example.restaurantesakip1.Presentations.Fragments;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationManager;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.TableRow;
import android.widget.TextView;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;

import com.example.restaurantesakip1.Data.RestaurantRepository;
import com.example.restaurantesakip1.Data.RestaurantService;
import com.example.restaurantesakip1.Data.RetrofitClient;
import com.example.restaurantesakip1.Models.Filter;
import com.example.restaurantesakip1.Models.Restaurant;
import com.example.restaurantesakip1.Models.SearchAdapter;
import com.example.restaurantesakip1.Models.Session;
import com.example.restaurantesakip1.Presentations.DetailedRestActivity;
import com.example.restaurantesakip1.R;

import java.util.ArrayList;
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
    public View myView;
    public Double latitude, longitude;
    public boolean resultsInList;


    public SearchFragment() {
        // Required empty public constructor
    }

    public void showResults(List<Restaurant> restaurants) {
        //List results
        System.out.println(restaurants.size());
        this.restaurantsResults = restaurants;
        this.searchAdapter.clear();
        this.searchAdapter.addAll(restaurants);
        this.searchAdapter.notifyDataSetChanged();

        //Map results
        MapResultsFragment fragMap = (MapResultsFragment) getChildFragmentManager().findFragmentById(R.id.frag_mapResults);
        if (fragMap == null) {
            System.out.println("Here we got an error");
        } else
            fragMap.pinPointRestaurants(restaurants);
    }

    public void showMoreInfo(Restaurant restaurant) {
        //System.out.println(restaurant.name);
        TableRow tRow = myView.findViewById(R.id.table_seeMoreInfo);
        tRow.setVisibility(View.VISIBLE);

        TextView name = myView.findViewById(R.id.txt_ResNameMarker);
        name.setText(restaurant.name);
        TextView score = myView.findViewById(R.id.txt_ResScoreMarker);
        score.setText(Float.toString(restaurant.stars));


        Button seeMore = myView.findViewById(R.id.btn_seeMoreMarker);
        seeMore.setOnClickListener((v) -> openDetailedInfo(restaurant));
    }


    public void openDetailedInfo(Restaurant restaurant) {
        Intent intent = new Intent(this.getContext(), DetailedRestActivity.class);
        intent.putExtra("RESTAURANT_ID", restaurant._id);
        this.startActivity(intent);
    }

    public void setupSpinners() {

    }

    public void toggleView(String tag) {
        TableRow tRow = myView.findViewById(R.id.table_seeMoreInfo);
        ListView listView = myView.findViewById(R.id.lv_searchResults);
        LinearLayout mapContent = myView.findViewById(R.id.ll_mapContent);


        if (tag.equals("Map")) {
            listView.setVisibility(View.GONE);
            mapContent.setVisibility(View.VISIBLE);
            //Show map
        } else if (tag.equals("List")) {
            //Show list
            listView.setVisibility(View.VISIBLE);
            tRow.setVisibility(View.GONE);
            mapContent.setVisibility(View.GONE);
        }
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View myView = inflater.inflate(R.layout.fragment_search, container, false);
        this.myView = myView;

        this.searchBar = myView.findViewById(R.id.tbox_searchBar);
        this.searchBar.setOnKeyListener((view, keyCode, event) -> {
            if ((event.getAction() == KeyEvent.ACTION_DOWN) &&
                    (keyCode == KeyEvent.KEYCODE_ENTER)) {
                performSearch();
                return true;
            }
            return false;
        });

        this.lv_search = myView.findViewById(R.id.lv_searchResults);

        this.restaurantsResults = new ArrayList<>();
        this.searchAdapter = new SearchAdapter(this.getContext(), this.restaurantsResults);
        this.lv_search.setAdapter(this.searchAdapter);
        this.lv_search.setOnItemClickListener((adapterView, view, i, l) -> openDetailedInfo(restaurantsResults.get(i)));

        ImageButton listView = myView.findViewById(R.id.btn_viewList);
        ImageButton mapView = myView.findViewById(R.id.btn_viewMap);

        listView.setOnClickListener(v -> toggleView("List"));
        mapView.setOnClickListener(v -> toggleView("Map"));

        LocationManager locManager = (LocationManager) getActivity().getSystemService(Context.LOCATION_SERVICE);

        boolean network_enabled = locManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);

        Location location = null;

        if (network_enabled) {

            //location = locManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);

            try {
                location = locManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
            } catch (SecurityException e) {
                //dialogGPS(this.getContext()); // lets the user know there is a problem with the gps
            }

            if(location!=null){
                longitude = location.getLongitude();
                latitude = location.getLatitude();
            }
        }

        return myView;
    }


    public void performSearch(){
        RestaurantService service = RetrofitClient.getRetrofitInstance().create(RestaurantService.class);
        Filter f = filterThings();
        Call<List<Restaurant>> call = service.filterRestaurants("Bearer " + Session.getInstace().token, f);

       // Call<List<Restaurant>> call = service.getAllRestaurants("Bearer " + Session.getInstace().token);
        System.out.println("Helloooooooooooooooooo");

        call.enqueue(new Callback<List<Restaurant>>() {
            @Override
            public void onResponse(Call<List<Restaurant>> call, Response<List<Restaurant>> response) {
                if (response.body() == null){
                    System.out.println("Its a null");
                    System.out.println(response.raw().toString());
                    System.out.println("Dude");
                } else {
                    System.out.println("Not null dude");
                    System.out.println(response.raw().toString());
                    showResults(response.body());
                }
            }

            @Override
            public void onFailure(Call<List<Restaurant>> call, Throwable t) {
                System.out.println("Esto fallo");
                System.out.println(t.getCause());
                System.out.println();
            }
        });
    }

    public Filter filterThings(){
        Filter f = new Filter();
        Spinner foodType = myView.findViewById(R.id.spin_foodType);
        Spinner score =  myView.findViewById(R.id.spin_filterScore);
        Spinner price =  myView.findViewById(R.id.spin_price);

        String foodTStr = foodType.getSelectedItem().toString();
        String scoreStr = score.getSelectedItem().toString();
        String priceStr = price.getSelectedItem().toString();

        if (!foodTStr.equals("Cualquiera")){
            f.foodType = foodTStr;
        }

        if (!scoreStr.equals("Cualquiera")){
            f.stars = Integer.parseInt(scoreStr);
        }

        if (!priceStr.equals("Cualquiera")){
            f.price = priceStr;
        }

        return f;
    }

}