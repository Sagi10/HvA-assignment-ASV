package com.example.demo.controllers;

import com.example.demo.exceptions.RequestNotFoundException;
import com.example.demo.models.Request;
import com.example.demo.repositories.RequestRepositorie;
import com.example.demo.repositories.UserRepositorie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@Transactional
public class RequestController {
  private int CHANGEDS_REQUEST_TIMEOUT_INTERVAL = 10;

  @Autowired
  private RequestRepositorie requestRepositorie;
  @Autowired
  private UserRepositorie userRepositorie;

  //GET all requests
  @GetMapping("/open-requests")
  public List<Request> getAllRequests() {
    return requestRepositorie.findAll();
  }

  //FIND a request
  @GetMapping("/open-requests/{requestId}")
  public Request getRequest(@PathVariable long requestId) {
    Request requestByID = requestRepositorie.findRequest(requestId);
    if (requestByID == null) {
      throw new RequestNotFoundException("Melding met id: " + requestId + " is niet gevonden.");
    }
    return requestByID;
  }

  //find recently changed requests
  @GetMapping("/open-requests/changed-requests/{userId}")
  public List<Request> getChangedRequests(@PathVariable long userId) {
    LocalDateTime comparingDate = LocalDateTime.now().minusSeconds(CHANGEDS_REQUEST_TIMEOUT_INTERVAL);
    List<Request> allReqests = getAllRequests();
    List<Request> changedRequests = new ArrayList<>();

    //User id of 0 means that the current user is a runner
    if (userId == 0) {
      for (Request request : allReqests) {
        if (request.getRequestCreated().compareTo(comparingDate) > 0 ||
          (request.getRequestUpdated() != null &&
            request.getRequestUpdated().compareTo(comparingDate) > 0)) {
          changedRequests.add(request);
        }
      }
    } else {
      for (Request request : allReqests) {
        if (request.getUser().getId() == userId && (request.getRequestCreated().compareTo(comparingDate) > 0 ||
          (request.getRequestUpdated() != null &&
            request.getRequestUpdated().compareTo(comparingDate) > 0))) {
          changedRequests.add(request);
        }
      }
    }
    return changedRequests;
  }

  //CREATED a new request with the current user
  @PostMapping("/users/{userID}/open-requests")
  public List<Long> addNewRequestToUser(@PathVariable long userID, @RequestBody Request[] newRequests) {
    ArrayList<Long> requestIds = new ArrayList<>();

    for (Request request : newRequests) {
      //adding the request to the user
      Request saveRequest = this.requestRepositorie.addRequestsToUser(userID, request);
      requestIds.add(saveRequest.getId());
    }

    return requestIds;
  }

  @PostMapping("/open-requests/update-request/{requestId}")
  public void updateRequest(@PathVariable long requestId, @RequestBody String status) {
    requestRepositorie.updateRequest(requestId, status);
  }

  @PostMapping("/add-cart-to-request/{requestId}/{cartId}")
  public void addCartToRequest(@PathVariable int cartId, @PathVariable Long requestId) {
    requestRepositorie.addCartToRequest(cartId, requestId);
  }

  //DELETE a request
  @DeleteMapping("/open-requests/{requestId}")
  public void deleteRequestById(@PathVariable long requestId) {
    Request request = requestRepositorie.deleteRequest(requestId);
    if (request == null) {
      throw new RequestNotFoundException("Melding met id: " + requestId + " kan niet worden verwijderd, omdat deze niet is gevonden");
    }
  }

}
