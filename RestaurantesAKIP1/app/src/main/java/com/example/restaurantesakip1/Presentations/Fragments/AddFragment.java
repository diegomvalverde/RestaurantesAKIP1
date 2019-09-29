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

import com.example.restaurantesakip1.R;

import java.util.ArrayList;
import java.util.List;

/**
 * A simple {@link Fragment} subclass.
 */
public class AddFragment extends Fragment {
    View myView;
    List<EditText> keys, values;
    List<TableRow> rowsOnScreen;
    int rowsAdded = 0;

    public AddFragment() {
        // Required empty public constructor
    }

    public void delelete(View v){
        String code = v.getTag().toString();
        keys.removeIf( e -> e.getTag().toString() == code );
        values.removeIf( e -> e.getTag().toString() == code );

        TableRow tRow;

        for (TableRow currentT : rowsOnScreen){
            if (currentT.getTag().toString() == code){
                tRow = currentT;
                tRow.setVisibility(View.GONE);
            }
        }

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

        tboxKey.setWidth(120);
        tboxKey.setHint("Día(s)");
        tboxKey.setTag(code);
        keys.add(tboxKey);

        tboxValue.setWidth(120);
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

        keys = new ArrayList<>();
        values = new ArrayList<>();
        rowsOnScreen = new ArrayList<>();

        return myView;
    }

}
