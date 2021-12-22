package com.example.demo.models;

import com.example.demo.enums.Functions;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  private String password;
  private String email, firstname, lastname;
  private Functions role;

  @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
  @JsonIgnore
  private List<Request> requestList = new ArrayList<>();

  protected User() {
  }

  //Constructor with no ID parameter. This will be generated.
  public User(String email, String password, String firstname, String lastname, Functions role) {
    this.email = email;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.role = role;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    User user = (User) o;
    return id == user.id;
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }

  public boolean validateEncodedPassword(String password) {
    return password.equals(password);
  }

  public long getId() {
    return id;
  }

  public List<Request> getRequestList() {
    return requestList;
  }

  public void addMelding(Request request) {
    this.requestList.add(request);
  }

  public void deleteMelding(Request request) {
    this.requestList.remove(request);
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getFirstname() {
    return firstname;
  }

  public void setFirstname(String firstname) {
    this.firstname = firstname;
  }

  public String getLastname() {
    return lastname;
  }

  public void setLastname(String lastname) {
    this.lastname = lastname;
  }

  public String getRole() {
    return role.toString();
  }

  public void setRole(Functions role) {
    this.role = role;
  }

  @Override
  public String toString() {
    return "User{" +
      "id=" + id +
      ", username='" + email + '\'' +
      ", password='" + password + '\'' +
      ", firstname='" + firstname + '\'' +
      ", lastname='" + lastname + '\'' +
      '}';
  }
}
