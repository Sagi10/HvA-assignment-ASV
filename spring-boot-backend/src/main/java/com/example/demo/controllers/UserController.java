package com.example.demo.controllers;

import com.example.demo.exceptions.UserNotFoundException;
import com.example.demo.models.User;
import com.example.demo.repositories.UserRepositorie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.transaction.Transactional;
import java.net.URI;
import java.util.List;

@RestController
@Transactional
public class UserController {

  @Autowired
  private UserRepositorie userRepositorie; // creates an instance of the userDaoService

  //GET all users
  @GetMapping("/users")
  public List<User> getAllUsers() {
    return userRepositorie.findAllUsers();
  }

  //FIND a specific user
  @GetMapping("/users/{id}")
  public User getUser(@PathVariable long id) {
    User user = userRepositorie.findUser(id);
    if (user == null) {
      throw new UserNotFoundException("User met de id: " + id + " is niet gevonden.");
    }
    return user;
  }

  //CREATE a new user
  @PostMapping("/users")
  public ResponseEntity<Object> createUser(@RequestBody User user) {
    User newUser = userRepositorie.save(user);

    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("{id}").buildAndExpand(newUser.getId()).toUri();
    return ResponseEntity.created(uri).build();
  }

  //DELETE a user
  @DeleteMapping("/users/{id}")
  public void deleteUserById(@PathVariable long id) {
    User event = userRepositorie.deleteUserById(id);
    if (event == null) {
      throw new UserNotFoundException("User met id: " + id + " kan niet worden verwijderd, omdat deze niet is gevonden");
    }
  }

}
