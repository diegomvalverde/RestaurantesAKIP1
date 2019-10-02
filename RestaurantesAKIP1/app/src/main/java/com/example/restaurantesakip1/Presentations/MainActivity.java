package com.example.restaurantesakip1.Presentations;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import com.example.restaurantesakip1.Data.RestaurantService;
import com.example.restaurantesakip1.Data.RetrofitClient;
import com.example.restaurantesakip1.Data.UserService;
import com.example.restaurantesakip1.Models.Restaurant;
import com.example.restaurantesakip1.Models.Session;
import com.example.restaurantesakip1.Models.User;
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.login.LoginManager;
import com.facebook.login.LoginResult;

import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.common.SignInButton;
import com.google.android.gms.tasks.Task;

import com.example.restaurantesakip1.R;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity {

    CallbackManager callbackManager;
    GoogleSignInClient mGoogleSignInClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestEmail()
                .build();

        mGoogleSignInClient = GoogleSignIn.getClient(this, gso);

        SignInButton singInButton = findViewById(R.id.sign_in_button);
        singInButton.setOnClickListener( (view) -> googleSingIn());

        callbackManager = CallbackManager.Factory.create();
        LoginManager.getInstance().registerCallback(callbackManager,
                new FacebookCallback<LoginResult>() {

                    @Override
                    public void onSuccess(LoginResult loginResult) {
                        System.out.println("Login good");
                        loginResult.getAccessToken();
                        acceptSingIn();
                    }

                    @Override
                    public void onCancel() {
                        System.out.println("Login cancel");
                    }

                    @Override
                    public void onError(FacebookException exception) {
                        System.out.println("Login bad");
                    }
                });
    }

    public void applicationSigIn(View v){
        acceptSingIn();
    }


    public void acceptSingIn(){
        String email = "diegomendez12@gmail.com";
        String pass = "123";

        UserService service = RetrofitClient.getRetrofitInstance().create(UserService.class);
        Call<User> call = service.getUser(email, pass);

        call.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                Session session = Session.getInstace();
                session.user = response.body();
                session.token = response.body().token;
                System.out.println("Done");

                Intent myIntent = new Intent(MainActivity.this, SearchActivity.class);
                MainActivity.this.startActivity(myIntent);
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                System.out.println("Something went wrong");
                System.out.println(t.getCause());
            }

        });


    }

    public void googleSingIn(){
        System.out.println("GButton pressed");
        Intent signInIntent = mGoogleSignInClient.getSignInIntent();
        startActivityForResult(signInIntent, 1);
    }

    @Override
    public void onStart() {
        super.onStart();
        GoogleSignInAccount account = GoogleSignIn.getLastSignedInAccount(this);
        //updateUI(account);
        System.out.println(account == null);

        //if (account != null) acceptSingIn();
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {

        super.onActivityResult(requestCode, resultCode, data);

        System.out.println(requestCode);

        // Result returned from launching the Intent from GoogleSignInClient.getSignInIntent(...);
        if (requestCode == 1) {
            // The Task returned from this call is always completed, no need to attach
            // a listener.
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            handleSignInResult(task);
        } else {
            callbackManager.onActivityResult(requestCode, resultCode, data);
        }
    }

    private void handleSignInResult(Task<GoogleSignInAccount> completedTask) {
        try {
            GoogleSignInAccount account = completedTask.getResult(ApiException.class);
            System.out.println(account.getEmail());
            System.out.println(account.getId());
            acceptSingIn();

            // Signed in successfully, show authenticated UI.
            //updateUI(account);
        } catch (ApiException e) {
            System.out.println("Some error");
            // The ApiException status code indicates the detailed failure reason.
            // Please refer to the GoogleSignInStatusCodes class reference for more information.
            Log.w("TAG", "signInResult:failed code=" + e.getStatusCode());
            //updateUI(null);
        }
    }
}
