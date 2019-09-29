package com.example.restaurantesakip1.Data;

import org.json.JSONObject;

import java.util.List;

public interface Repository <T> {

    void add(T item);

    void add(Iterable<T> items);

    void update(T item);

    void remove(T item);

    List<T> query(JSONObject specification);
}
