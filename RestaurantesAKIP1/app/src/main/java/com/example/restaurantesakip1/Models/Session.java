package com.example.restaurantesakip1.Models;

/**
 * Just a class to hold up the session data
 * it's, of course, a Singleton
 */
public class Session {

    public User user = null;
    public String token = null;

    private static Session session = new Session();

    private Session(){

    }

    public static Session getInstace(){
        return session;
    }
}
