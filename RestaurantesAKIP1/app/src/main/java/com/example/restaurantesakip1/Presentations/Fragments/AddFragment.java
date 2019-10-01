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

import com.example.restaurantesakip1.Models.Restaurant;
import com.example.restaurantesakip1.R;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public void delelete(View v){
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

    //Literraly hurt me doing this
    //Basically a builder for restaurants
    public void createRestuarant(){
        String name = ((EditText) myView.findViewById(R.id.tbox_addName)).getText().toString();
        String number = ((EditText) myView.findViewById(R.id.tbox_addContact)).getText().toString();
        int contact = Integer.parseInt(number);
        String address = ((EditText) myView.findViewById(R.id.tbox_addAddress)).getText().toString();


        LocateFragment fragMap = (LocateFragment) getChildFragmentManager().findFragmentById(R.id.frag_locateRestaurant);
        System.out.println(fragMap.point);

        Map<String, String> schedule = new HashMap<>();

        int rows = rowsOnScreen.size();

        for (int i = 0; i < rows; i++){
            String key = this.keys.get(i).getText().toString();
            String value = this.values.get(i).getText().toString();
            schedule.put(key, value);
        }

        Restaurant newRestaurant = new Restaurant(0, name);
        System.out.println("Fine");
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

        tboxKey.setMinWidth(120);
        tboxKey.setMaxWidth(120);
        tboxKey.setHint("Día(s)");
        tboxKey.setTag(code);
        keys.add(tboxKey);


        tboxValue.setMinWidth(200);
        tboxValue.setMaxWidth(200);
        tboxValue.setHint("Horas");
        tboxValue.setTag(code);
        values.add(tboxValue);

        TextView txtDelete = new TextView(this.getContext() );
        txtDelete.setText("Eliminar");
        txtDelete.setClickable(true);
        txtDelete.setOnClickListener( (view) ->  delelete(view) );
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

        Button btn_save= myView.findViewById(R.id.btn_saveRestaurant);
        btn_save.setOnClickListener( (v) -> createRestuarant());

        keys = new ArrayList<>();
        values = new ArrayList<>();
        rowsOnScreen = new ArrayList<>();

        return myView;
    }
}
