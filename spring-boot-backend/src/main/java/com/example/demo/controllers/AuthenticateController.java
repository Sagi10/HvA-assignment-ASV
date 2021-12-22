  package com.example.demo.controllers;

  import com.example.demo.exceptions.AuthenticationException;
  import com.example.demo.exceptions.AuthorizationException;
  import com.example.demo.models.User;
  import com.example.demo.repositories.UserRepositorie;
  import com.example.demo.security.JWToken;
  import com.example.demo.security.PasswordEncoder;
  import com.fasterxml.jackson.databind.node.ObjectNode;
  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.http.HttpHeaders;
  import org.springframework.http.ResponseEntity;
  import org.springframework.web.bind.annotation.PostMapping;
  import org.springframework.web.bind.annotation.RequestBody;
  import org.springframework.web.bind.annotation.RestController;

  import javax.transaction.Transactional;

@RestController
@Transactional
public class AuthenticateController {

  @Autowired
  protected JWToken tokenGenerator;

  @Autowired
  protected PasswordEncoder passwordEncoder;

  @Autowired
  protected UserRepositorie userRepositorie;

  @PostMapping(value = "/authenticate/login", produces = "application/json")
  public ResponseEntity<User> authenticateUser(@RequestBody ObjectNode emailAndPassword) throws AuthorizationException {

    String userEmail = emailAndPassword.get("email").asText();
    String password = emailAndPassword.get("password").asText();

    // find the user with email and authenticate
    User user = this.userRepositorie.findUser(1001); // hard coded for now, but must extract the id from the email object

    if(user == null) {
      throw new AuthenticationException("Invalid user and/or password");
    }

    //Encode the password and check if it matches.
    String encodedPassword = passwordEncoder.encode(password);

    if(!user.validateEncodedPassword(encodedPassword)) {
      throw new AuthenticationException("Invalid user and/or password");
    }

    //TODO Generate a token that can be used by the user
    String tokenString = tokenGenerator.encode(user);

    return ResponseEntity.accepted()
      .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenString) //add the token to the header.
      .body(user);
  }

}
