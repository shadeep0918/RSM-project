package com.aurora.auroraweb.service;

import com.aurora.auroraweb.model.Product;
import com.aurora.auroraweb.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    @Override
    public Product addProduct(Product product, MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            // 1. Create the uploads directory if it doesn't exist
            String uploadDir = "uploads/";
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // 2. Generate a unique random file name so images don't overwrite each other
            String originalFileName = StringUtils.cleanPath(image.getOriginalFilename());
            String newFileName = UUID.randomUUID().toString() + "_" + originalFileName;

            // 3. Save the physical file to your computer
            Path filePath = uploadPath.resolve(newFileName);
            Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // 4. Save the new URL path to the MongoDB database
            product.setImageUrl("/uploads/" + newFileName);
        }

        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }
}