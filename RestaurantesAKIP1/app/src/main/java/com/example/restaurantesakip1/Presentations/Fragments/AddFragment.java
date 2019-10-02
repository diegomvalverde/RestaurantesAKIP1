package com.example.restaurantesakip1.Presentations.Fragments;


import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Space;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;

import com.example.restaurantesakip1.Data.RestaurantService;
import com.example.restaurantesakip1.Data.RetrofitClient;
import com.example.restaurantesakip1.Models.Restaurant;
import com.example.restaurantesakip1.Models.Session;
import com.example.restaurantesakip1.R;
import com.google.android.gms.maps.GoogleMap;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 */
public class AddFragment extends Fragment {
    View myView;
    List<EditText> keys, values;
    List<TableRow> rowsOnScreen;
    int rowsAdded = 0;
    GoogleMap map;

    public AddFragment() {
        // Required empty public constructor
    }

    public void deleleteRow(View v){
        String code = v.getTag().toString();
        keys.removeIf( e -> e.getTag().toString().equals(code));
        values.removeIf( e -> e.getTag().toString().equals(code));

        TableRow tRow = null;

        for (TableRow currentT : rowsOnScreen){
            if (currentT.getTag().toString().equals(code)){
                tRow = currentT;
            }
        }

        if (tRow != null){
            rowsOnScreen.remove(tRow);
            TableLayout tbSchedule = myView.findViewById(R.id.tab_addSchedule);
            tbSchedule.removeView(tRow);
        }
    }

    public void clearData(){
        EditText name = myView.findViewById(R.id.tbox_addName);
        name.setText("");
        EditText number = myView.findViewById(R.id.tbox_addContact);
        number.setText("");
        EditText address = myView.findViewById(R.id.tbox_addAddress);
        address.setText("");
        LocateFragment fragMap = (LocateFragment) getChildFragmentManager().findFragmentById(R.id.frag_locateRestaurant);
        if (fragMap != null) {
            fragMap.map.clear();
            fragMap.point = null;
        }

        TableLayout tbSchedule = myView.findViewById(R.id.tab_addSchedule);

        for (TableRow currentT : rowsOnScreen){
            tbSchedule.removeView(currentT);
        }
        rowsOnScreen = new ArrayList<>();
        keys = new ArrayList<>();
        values = new ArrayList<>();
    }

    private int isDataValid(){
        String name = ((EditText) myView.findViewById(R.id.tbox_addName)).getText().toString();
        int errors = 0;
        if (name.equals("")){
            System.out.println("Debe de ingresar un nombre.");
            errors++;
        }

        String number = ((EditText) myView.findViewById(R.id.tbox_addContact)).getText().toString();

        if (number.equals("")){
            System.out.println("Debe de ingresar un contacto.");
            errors++;
        }

        String address = ((EditText) myView.findViewById(R.id.tbox_addAddress)).getText().toString();

        if (address.equals("")){
            System.out.println("Debe de ingresar una dirección.");
            errors++;
        }

        LocateFragment fragMap = (LocateFragment) getChildFragmentManager().findFragmentById(R.id.frag_locateRestaurant);
        if (fragMap == null || fragMap.point == null){
            System.out.println("Debe de ingresar una dirección.");
            errors++;
        }

        return errors;
    }

    //Literraly hurt me doing this
    //Basically a builder for restaurants
    public void createRestuarant(){
        if (isDataValid() > 0){
            //Los errores ya se muestran en esta función
            return;
        }
        String name = ((EditText) myView.findViewById(R.id.tbox_addName)).getText().toString();
        String number = ((EditText) myView.findViewById(R.id.tbox_addContact)).getText().toString();
        String address = ((EditText) myView.findViewById(R.id.tbox_addAddress)).getText().toString();
        LocateFragment fragMap = (LocateFragment) getChildFragmentManager().findFragmentById(R.id.frag_locateRestaurant);
        List<Double> location = new ArrayList<>();
        location.add(fragMap.point.latitude);
        location.add(fragMap.point.longitude);

        Map<String, String> schedule = new HashMap<>();

        int rows = rowsOnScreen.size();

        for (int i = 0; i < rows; i++){
            String key = this.keys.get(i).getText().toString();
            String value = this.values.get(i).getText().toString();
            schedule.put(key, value);
        }

        Restaurant restaurant = new Restaurant(0, name);
        restaurant.contact = number;
        restaurant.address = address;
        restaurant.schedule = schedule;
        restaurant.location = location;

        RestaurantService service = RetrofitClient.getRetrofitInstance().create(RestaurantService.class);
        Call<JSONObject> call = service.saveRestaurant("Bearer " + Session.getInstace().token, restaurant);

        call.enqueue(new Callback<JSONObject>() {
            @Override
            public void onResponse(Call<JSONObject> call, Response<JSONObject> response) {
                System.out.println("Created");
                clearData();
                if (response.body() != null)
                    System.out.println(response.body().toString());
            }

            @Override
            public void onFailure(Call<JSONObject> call, Throwable t) {
                System.out.println("There was an error");
                System.out.println(t.getCause());
            }
        });
    }


    public void addRowToSchedule(View v){
        String code = "row" + rowsAdded++;

        TableLayout tbSchedule = myView.findViewById(R.id.tab_addSchedule);
        TableRow tRow = new TableRow(this.getContext());
        tRow.setTag(code);
        rowsOnScreen.add(tRow);

        tRow.addView( new Space(this.getContext()) );

        EditText tboxKey = new EditText(this.getContext() );
        EditText tboxValue = new EditText(this.getContext() );

        tboxKey.setMinWidth(300);
        tboxKey.setMaxWidth(300);
        tboxKey.setHint("Día(s)");
        tboxKey.setTag(code);
        keys.add(tboxKey);


        tboxValue.setMinWidth(300);
        tboxValue.setMaxWidth(300);
        tboxValue.setHint("Horas");
        tboxValue.setTag(code);
        values.add(tboxValue);

        TextView txtDelete = new TextView(this.getContext() );
        txtDelete.setText("Eliminar");
        txtDelete.setClickable(true);
        txtDelete.setOnClickListener( (view) ->  deleleteRow(view) );
        txtDelete.setTag(code);

        tRow.addView(tboxKey);
        tRow.addView(tboxValue);
        tRow.addView(txtDelete);

        tbSchedule.addView(tRow);
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        myView = inflater.inflate(R.layout.fragment_add, container, false);

        Button btn_addRows = myView.findViewById(R.id.btn_addScheduleRow);
        btn_addRows.setOnClickListener( (v) -> addRowToSchedule(v));

        Button btn_save = myView.findViewById(R.id.btn_saveRestaurant);
        btn_save.setOnClickListener( (v) -> createRestuarant());

        keys = new ArrayList<>();
        values = new ArrayList<>();
        rowsOnScreen = new ArrayList<>();

        return myView;
    }
}
