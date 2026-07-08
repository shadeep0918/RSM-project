package com.aurora.auroraweb.repository;

import com.aurora.auroraweb.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product,String> {

}
