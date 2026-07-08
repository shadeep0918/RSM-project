package com.aurora.auroraweb.service;

import com.aurora.auroraweb.model.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {

 List<Product> getAllProducts();
    Optional<Product> getProductById(String id);
    Product addProduct(Product product);
    void deleteProduct(String id);

}
