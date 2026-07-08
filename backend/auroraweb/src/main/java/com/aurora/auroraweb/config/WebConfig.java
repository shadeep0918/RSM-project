package com.aurora.auroraweb.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // This is a much safer way to link the folder on Windows!
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }
}