package com.example.demo;

import com.example.demo.repositories.RequestRepositorie;
import com.example.demo.repositories.UserRepositorie;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class KlmSpringBootApplication implements CommandLineRunner {

  @Autowired
  private UserRepositorie userRepositorie;

  @Autowired
  private RequestRepositorie requestRepositorie;

  private Logger logger = LoggerFactory.getLogger(this.getClass());

  public static void main(String[] args) {
    SpringApplication.run(KlmSpringBootApplication.class, args);
  }

  @Override
  public void run(String... args) throws Exception {
  }
}
