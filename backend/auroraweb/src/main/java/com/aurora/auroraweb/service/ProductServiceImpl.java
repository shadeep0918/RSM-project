package com.aurora.auroraweb.service;

import com.aurora.auroraweb.model.Product;
import com.aurora.auroraweb.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();

    }

    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);

    }


    public Product addProduct(Product product) {
        return productRepository.save(product);

    }

    public void deleteProduct(String id) {

        productRepository.deleteById(id);

    }}
