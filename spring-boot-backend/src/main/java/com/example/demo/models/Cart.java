package com.example.demo.models;

import com.example.demo.enums.EquipmentStatus;
import com.example.demo.enums.CartTypes;

import javax.persistence.*;
import java.util.Objects;

@Entity
@NamedQueries({
  @NamedQuery(name = "All_carts", query = "SELECT c FROM Cart c"),
  @NamedQuery(name="Find_by_type", query = "SELECT c FROM Cart c WHERE c.carttype = :carttype"),
  @NamedQuery(name="Find_by_id", query="SELECT c FROM Cart c WHERE c.ID = :id"),
  @NamedQuery(name="Change_status", query = "UPDATE Cart c SET c.equipmentStatus = :status WHERE c.ID = :id")
})
public class Cart {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int ID;
  private String title;
  private double lat;
  private double lng;

  @Enumerated(EnumType.STRING)
  private CartTypes carttype;

  @Enumerated(EnumType.STRING)
  private EquipmentStatus equipmentStatus;

  protected Cart() {
  }

  public Cart(String title, double lat, double lng, CartTypes carttype, EquipmentStatus equipmentStatus) {
    this.title = title;
    this.lat = lat;
    this.lng = lng;
    this.carttype = carttype;
    this.equipmentStatus = equipmentStatus;
  }

  @Override
  public boolean equals(Object c) {
    if (this == c) return true;
    if (c == null || getClass() != c.getClass()) return false;
    Cart cart = (Cart) c;
    return ID == cart.ID;
  }

  @Override
  public int hashCode() {
    return this.getID();
  }

  public int getID() {
    return ID;
  }

  public void setID(int ID) {
    this.ID = ID;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public double getLat() {
    return lat;
  }

  public void setLat(double lat) {
    this.lat = lat;
  }

  public double getLng() {
    return lng;
  }

  public void setLng(double lng) {
    this.lng = lng;
  }

  public CartTypes getCarttype() {
    return carttype;
  }

  public void setCarttype(CartTypes carttype) {
    this.carttype = carttype;
  }

  public EquipmentStatus getEquipmentStatus() {
    return equipmentStatus;
  }

  public void setEquipmentStatus(EquipmentStatus equipmentStatus) {
    this.equipmentStatus = equipmentStatus;
  }
}
