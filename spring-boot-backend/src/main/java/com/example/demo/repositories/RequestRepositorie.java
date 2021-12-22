package com.example.demo.repositories;

import com.example.demo.models.Cart;
import com.example.demo.models.Request;
import com.example.demo.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Component
@Repository
@Transactional
public class RequestRepositorie {

  @Autowired
  protected EntityManager entityManager;

  @Autowired
  protected UserRepositorie userRepositorie;

  //Find all requests
  public List<Request> findAll() {
    TypedQuery<Request> findAllMeldings = entityManager.createQuery("select r from Request r ", Request.class);
    return findAllMeldings.getResultList();
  }

  //find a request
  public Request findRequest(long id) {
    return entityManager.find(Request.class, id);
  }

  //delete a request
  public Request deleteRequest(long id) {
    Request deleteRequest = this.findRequest(id);
    entityManager.remove(deleteRequest);
    return deleteRequest;
  }

  public void updateRequest(long requestId, String status) {
    Request request = findRequest(requestId);
    request.setStatus(status);
    if (status.equals("Delivered"))
      request.setDeliveryTime(LocalDateTime.now());
    if (status.equals("Finished") || status.equals("Collect"))
      request.setCompletionTime(LocalDateTime.now());
    entityManager.merge(request);
  }

  public Request addRequestsToUser(long userId, Request request) {
    //find a user
    User user = userRepositorie.findUser(userId);
    //add the request to user and set the relations
    user.addMelding(request);
    request.setUser(user);

    //Adds 1 hour to the deadline since it somehow is 1 lower than it should be
    request.setDeadline(request.getDeadline().plusHours(1));
    return entityManager.merge(request);
//    return request;
  }

  public void addCartToRequest(int cartId, Long requestId) {
    Request request = this.findRequest(requestId);
    request.setSelectedWagon(cartId);
    entityManager.persist(request);
  }

  /*
  private long idCounter = 2;

  private List<Melding> meldingen = new ArrayList<>();

  public MeldingRepositorie() {
    this.meldingen.add(new Melding("F5", LocalDateTime.now(), PlaneTypes.Boeing737, WagonTypes.BANDENWAGEN, "test", LocalDateTime.now(), MeldingStatus.Afgerond));
    this.meldingen.add(new Melding( "F5", LocalDateTime.now(), PlaneTypes.AirbusA330, WagonTypes.SKYDROLWAGEN, "test", LocalDateTime.now(), MeldingStatus.Afgerond));
  }

  public List<Melding> findAll() {
    return this.meldingen;
  }

  //ADD a new melding and increment the id. This will be replaced later with JPA
  public Melding saveMelding(Melding newMelding) {
    if (newMelding.getId() == 0) {
      newMelding.setId(++idCounter);
    }
    this.meldingen.add(newMelding);
    return newMelding;
  }

  //Find a melding
  public Melding findMeldingByID(long id) {
    for (Melding melding : meldingen) {
      if (melding.getId() == id) {
        return melding;
      }
    }
    return null;
  }

  //DELETE a melding
  public Melding deleteMeldingByID(long id) {

    Iterator<Melding> iterator = meldingen.iterator();
    while (iterator.hasNext()) {
      Melding event = iterator.next();

      if (event.getId() == id) {
        iterator.remove();
        return event;
      }
    }
    return null;
  }
*/

}
