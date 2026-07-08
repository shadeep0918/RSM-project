package com.aurora.auroraweb.service;

import com.aurora.auroraweb.model.Product;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface ProductService {

 List<Product> getAllProducts();
    Optional<Product> getProductById(String id);
    Product addProduct(Product product, MultipartFile image) throws IOException;
    void deleteProduct(String id);

}
