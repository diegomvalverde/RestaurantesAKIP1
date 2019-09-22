package com.example.restaurantesakip1.Data;

public interface Repository <T> {

    void add(T item);

    void add(Iterable<T> items);

    void update(T item);

    void remove(T item);
}
