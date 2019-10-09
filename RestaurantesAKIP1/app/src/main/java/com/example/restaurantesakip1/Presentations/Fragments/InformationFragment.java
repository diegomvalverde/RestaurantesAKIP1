package com.example.restaurantesakip1.Presentations.Fragments;


import android.location.LocationManager;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;

import android.view.LayoutInflater;
import android.view.SurfaceControl;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Space;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;

import com.example.restaurantesakip1.Models.Restaurant;
import com.example.restaurantesakip1.Presentations.DetailedRestActivity;
import com.example.restaurantesakip1.R;

import org.w3c.dom.Text;

/**
 * A simple {@link Fragment} subclass.
 */
public class InformationFragment extends Fragment {
    private Restaurant restaurantData;

    public InformationFragment(Restaurant restaurant) {
        this.restaurantData = restaurant;
    }

    public InformationFragment() {
        // Required empty public constructor  :p
    }

    private void setupMap(View view){
        LocationFragment fragMap = (LocationFragment) getChildFragmentManager().findFragmentById(R.id.frag_mapLocation);
        fragMap.setPointingAt(restaurantData.latLng);
    }

    private void setupSchedule(View view){
        TableLayout tbSchedule = view.findViewById(R.id.table_schedule);
        TableRow bigRow = new TableRow(this.getContext());
        bigRow.addView( new Space(this.getContext()) );
        TableLayout tbDetail = new TableLayout(this.getContext());

        for ( String key : restaurantData.schedule.keySet() ){
            String times = restaurantData.schedule.get(key);
            TableRow tRow = new TableRow(this.getContext());

            tRow.addView( new Space(this.getContext()) );

            TextView txtDay = new TextView(this.getContext()); //view.findViewById(R.id.)
            txtDay.setText( key );

            TextView txtTime = new TextView(this.getContext()); //view.findViewById(R.id.)
            txtTime.setTextAlignment(View.TEXT_ALIGNMENT_TEXT_END);
            txtTime.setText( times );

            tRow.addView(txtDay);
            tRow.addView(txtTime);
            tbDetail.addView(tRow);
        }

        bigRow.addView( tbDetail );
        tbSchedule.addView(bigRow);

    }

    private void setupFoodTypes(View view){
        TableLayout tbFoodTypes = view.findViewById(R.id.table_foodTypes);


        //for (String type : restaurantData.foodTypes){
        String type = restaurantData.foodTypes;
            TableRow tRow = new TableRow(this.getContext());
            tRow.addView( new Space(this.getContext()) );
            TextView txtAddress = new TextView(this.getContext()); //view.findViewById(R.id.)
            txtAddress.setText( type );
            tRow.addView( txtAddress );
            tbFoodTypes.addView(tRow);
    }

    private void setupContact(View view){
        TableLayout tbContact = view.findViewById(R.id.table_contact);
        TableRow tRow = new TableRow(this.getContext());
        tRow.addView( new Space(this.getContext()) );

        TextView txtAddress = new TextView(this.getContext()); //view.findViewById(R.id.)
        txtAddress.setText( Integer.toString(restaurantData.phoneNumber));

        tRow.addView( txtAddress );
        tbContact.addView(tRow);
    }

    private void setupAddress(View view){
        TableLayout tbAddress = view.findViewById(R.id.table_address);
        TableRow tRow = new TableRow(this.getContext());
        tRow.addView( new Space(this.getContext()) );

        TextView txtAddress = new TextView(this.getContext()); //view.findViewById(R.id.)
        txtAddress.setText(restaurantData.address);

        tRow.addView( txtAddress );
        tbAddress.addView(tRow);
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View convertView = inflater.inflate(R.layout.fragment_information, container, false);

        setupAddress(convertView);
        setupContact(convertView);
        setupFoodTypes(convertView);
        setupSchedule(convertView);
        setupMap(convertView);

        return convertView;
    }

}
