package com.example.demo.controllers;

import com.example.demo.enums.CartTypes;
import com.example.demo.enums.EquipmentStatus;
import com.example.demo.models.Cart;
import com.example.demo.repositories.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carts")
public class CartController {
  @Autowired
  CartRepository cartRepository;

  @GetMapping()
  public List<Cart> getAllCarts(
    @RequestParam(required = false, name = "type") CartTypes cartType,
    @RequestParam(required = false, name = "id") Integer id) {

    if (cartType != null && !cartType.toString().isEmpty()) {
      return this.cartRepository.findByQuery("Find_by_type", cartType);
    } else if (id != null && !String.valueOf(id).isEmpty()) {
      return this.cartRepository.findByQuery("Find_by_id", id);
    }

    return this.cartRepository.findAll();
  }

  @PostMapping("/change-status")
  public void changeCartStatus(
    @RequestParam(required = false, name = "id") int id,
    @RequestParam(required = false, name = "status") EquipmentStatus status) {
    this.cartRepository.updateStatus("Change_status", id, status);
  }

  @PostMapping("/add-cart")
  public Cart addNewCart(@RequestBody Cart cart) {
    return this.cartRepository.addCart(cart);
  }

  @PostMapping("/remove-cart")
  public Cart deleteCart(@RequestBody Cart cart) {
    return this.cartRepository.deleteCart(cart.getID());
  }
}
