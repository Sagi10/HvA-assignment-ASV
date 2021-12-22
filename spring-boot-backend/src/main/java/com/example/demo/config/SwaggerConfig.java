package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class SwaggerConfig {

  public static final Contact CONTACT = new Contact("KLM group 4","http://hva.nl","");
  public static final ApiInfo API_INFO = new ApiInfo(
    "Project KLM - API documentation",
    "API documentation",
    "1.0",
    "urn:tos",
    CONTACT,
    "Apache 2.0",
    "http://www.apache.org/licenses/LICENSE-2.0");
  public static final Set<String> PRODUCES_AND_CONSUMES = new HashSet<>(Arrays.asList("application/json"));


  @Bean
  public Docket api() {
    return new Docket(DocumentationType.SWAGGER_2).apiInfo(API_INFO).produces(PRODUCES_AND_CONSUMES).consumes(PRODUCES_AND_CONSUMES);
  }
}
