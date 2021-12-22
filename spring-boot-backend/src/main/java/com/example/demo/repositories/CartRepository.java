package com.example.demo.repositories;

import com.example.demo.models.Cart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class CartRepository {

  @Autowired
  EntityManager entityManager;

  /**
   * This method will return all the Carts from the database
   *
   * @return
   */
  public List<Cart> findAll() {
    return this.findByQuery("All_carts", null);
  }

  /**
   * This method will find Carts by using queries
   *
   * @param jpqlName - the NamedQuery name
   * @param param    - the parameters for finding a specific Cart
   * @return
   */
  public List<Cart> findByQuery(String jpqlName, Object... param) {
    TypedQuery<Cart> query = this.entityManager.createNamedQuery(jpqlName, Cart.class);
    switch (jpqlName) {
      case "Find_by_type":
        query.setParameter("carttype", param[0]);
        break;
      case "Find_by_id":
        query.setParameter("id", param[0]);
        break;
    }
    return query.getResultList();
  }

  /**
   * This method will update the status of a Cart, this is an separate method because UPDATE & DELETE queries
   * don't make use of TypedQueries<E>
   *
   * @param jpqlName the name of the NamedQuery
   * @param param    the parameters given
   */
  public void updateStatus(String jpqlName, Object... param) {
    Query query = this.entityManager.createNamedQuery(jpqlName);
    query.setParameter("id", param[0]);
    query.setParameter("status", param[1]);
    query.executeUpdate();
  }

  /**
   * This method will add created cart to the database
   *
   * @param cart
   * @return
   */
  public Cart addCart(Cart cart) {
    this.entityManager.persist(cart);

    return cart;
  }

  public Cart findById(int id) {
    return this.findByQuery("Find_by_id", id).get(0);
  }

  /**
   * This method will remove a given Cart from the database
   *
   * @param id
   */
  public Cart deleteCart(int id) {
    Cart deleteCart = this.findById(id);
    entityManager.remove(deleteCart);
    return deleteCart;
  }
}
