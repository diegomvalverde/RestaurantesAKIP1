package com.example.restaurantesakip1.Presentations;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

import com.example.restaurantesakip1.Data.RestaurantService;
import com.example.restaurantesakip1.Data.RetrofitClient;
import com.example.restaurantesakip1.Data.UserService;
import com.example.restaurantesakip1.Models.Restaurant;
import com.example.restaurantesakip1.Models.Session;
import com.example.restaurantesakip1.Models.User;
import com.example.restaurantesakip1.R;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RegisterActivity extends AppCompatActivity {

    EditText name, lastname, email, pass, confirmPass;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        name = findViewById(R.id.tbox_name);
        lastname = findViewById(R.id.tbox_lastname);
        email = findViewById(R.id.tbox_email);
        pass = findViewById(R.id.tbox_password);
        confirmPass = findViewById(R.id.tbox_confirmPass);
    }


    public void registerNewUser(View v){
        if (!isDataValid()){
            System.out.println("Dude what he fuck?");
            return;
        }

        String nameText = name.getText().toString();
        String lastnameText = lastname.getText().toString();
        String emailText = email.getText().toString();
        String passText = pass.getText().toString();

        User user = new User();
        user.name = nameText;
        user.email = emailText;
        user.lastName1 = lastnameText;
        user.lastName2 = "";
        user.password = passText;

        UserService service = RetrofitClient.getRetrofitInstance().create(UserService.class);

        Call<JSONObject> call = service.saveUser(user);

        call.enqueue(new Callback<JSONObject>() {
            @Override
            public void onResponse(Call<JSONObject> call, Response<JSONObject> response) {
                if (response.body() != null){
                    String operation = "";
                    try {
                        operation = (String) response.body().get("operation");
                    } catch (JSONException e) {
                        e.printStackTrace();
                        System.out.println(response.body().toString());
                    }
                    boolean result = operation.equals("sucessful");
                    if (! result)
                        System.out.println("Something went wrong");
                    else {
                        System.out.println("Uusario creado!");
                    }

                }
            }

            @Override
            public void onFailure(Call<JSONObject> call, Throwable t) {
                System.out.println("On failure statment");
            }
        });


    }


    public boolean isDataValid() {
        String nameText = name.getText().toString();
        String lastnameText = lastname.getText().toString();
        String emailText = email.getText().toString();
        String passText = pass.getText().toString();
        String passConfirmText = confirmPass.getText().toString();

        if (emailText.equals("")) return false;
        if (passText.equals("")) return false;
        if (passConfirmText.equals("")) return false;

        if (!(passText.equals(passConfirmText))){
            System.out.println("Pass muy diferente");
            return false;
        }


        return true;
    }


}
