package com.example.demo.repositories;

import com.example.demo.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Component
@Repository
@Transactional
public class UserRepositorie {

  @Autowired
  protected EntityManager entityManager;

  //Find all users. Shows message that it can't resolve 'user' but it works.
  public List<User> findAllUsers() {
    TypedQuery<User> find_all_users = entityManager.createQuery("select u from User u", User.class);
    return find_all_users.getResultList();
  }

  //find a user
  public User findUser(long id) {
    return entityManager.find(User.class, id);
  }

  //insert or update a user
  public User save(User user) {
    if (user.getId() == 0) {
      entityManager.persist(user);
    } else {
      entityManager.merge(user);
    }
    return user;
  }

  //delete a user
  public User deleteUserById(long id) {
    User deleteUser = this.findUser(id);
    entityManager.remove(deleteUser);
    return deleteUser;
  }
}
