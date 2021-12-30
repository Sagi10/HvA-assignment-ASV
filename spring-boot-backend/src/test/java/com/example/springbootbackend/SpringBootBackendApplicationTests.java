package com.example.springbootbackend;

import com.example.demo.KlmSpringBootApplication;
import com.example.demo.controllers.RequestController;
import com.example.demo.controllers.UserController;
import com.example.demo.enums.Functions;
import com.example.demo.enums.PlaneTypes;
import com.example.demo.exceptions.RequestNotFoundException;
import com.example.demo.models.Request;
import com.example.demo.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(classes = KlmSpringBootApplication.class)
class SpringBootBackendApplicationTests {

  /**
   * Arrange
   */
  @Autowired
  private RequestController requestController;

  @Autowired
  private UserController userController;

  private User mechanic;
  private Request request7;
  private Request request8;

  /**
   * Act
   */
  @BeforeEach
  public void setup() {
    assertNotNull(requestController);
    assertNotNull(userController);

    mechanic = new User("Gooder Mechanic", "Fancy password", "Gooder",
            "Mechanic", Functions.MECHANIC);
    // The test starts off with 6 standard requests from the data.sql file.
    request7 = new Request("C2", LocalDateTime.now(), PlaneTypes.AIRBUSA330200, "PH_AKB",
            "Nitrogen Cart", 0, "Left", "Pending", null);
    request8 = new Request("B5", LocalDateTime.now(), PlaneTypes.AIRBUSA330300, "PH_AKB",
            "Tires Cart", 0, "Right", "Pending", null);

    userController.createUser(mechanic);

    if (userController.getAllUsers().size() == 0) {
      throw new NullPointerException("No users added, tests can't function");
    }
  }

  /**
   * Assert
   * User Story 1: Check if the request that is sent by the mechanic is successfully added to the user.
   */
  @Test
  public void addSingleNewRequestToUser() {
    // Conformance, The size of the list is incremented with 1 when a new request is made.
    // Ordering, the values dont have to be in order when a new request is made by the mechanic
    // Range, a range requests is reasonable and realistic.
    // Reference, this is NOT the case. This code does not reference something that is not under control.
    // Existence, the values exist in a real life situation.
    // Cardinality, the values are exactly enough
    // Time, everything is in order. First get the size, and a new requests, and check if the list is incremented.
    assertEquals(8, requestController.getAllRequests().size());
    // Add a new request to the user
    requestController.addNewRequestToUser(mechanic.getId(), new Request[]{request7});
    // Check if the request is added by checking the list size.
    assertEquals(9, requestController.getAllRequests().size());
  }

  /**
   * Assert
   * User Story 2: Check if the request is correctly deleted when this is submitted by the mechanic.
   * throws exception that the request doesn't exist after deleting the request
   */
  @Test
  void deleteRequestById() {
    // Conformance,  The size of the list is incremented with 1 when a new request is made.
    // Ordering, in this case the set of values does not have to be order.
    // Range, a range is reasonable and realistic.
    // Reference, this is NOT the case. This code does not reference something that is not under control.
    // Existence, the values exist in a real life situation.
    // Cardinality, the values are exactly enough
    // Time, everything is in order. Check the current size, delete a request, check the size and
    // check if the correct exception is thrown.

    // Get all the requests.
    assertEquals(9, requestController.getAllRequests().size());
    // Delete the request with the ID: 501
    requestController.deleteRequestById(501);
    // Check if the size is decremented
    assertEquals(8, requestController.getAllRequests().size());
    // Make a request for the ID: 501 (that was deleted).
    RequestNotFoundException exception =
            assertThrows(RequestNotFoundException.class, () -> requestController.getRequest(501));
    // Check if the exception is thrown when the request with ID:501 is requested.
    assertEquals("Melding met id: 501 is niet gevonden.", exception.getMessage());
  }

  /**
   * Assert
   * User Story 3: Check if requests that are made by a specific
   * mechanic are the same requests that are shown in the overview lists.
   */
  @Test
  void getRequestsOverviewMechanic() {
    // Conformance, The size of the list is incremented with 1 when a new request is made.
    // Ordering, the values are returned in order. Shortest deadlines first.
    // Range, a range is reasonable and realistic
    // Reference, this is NOT the case. This code does not reference something that is not under control.
    // Existence, the values exist in a real life situation.
    // Cardinality, the values are exactly enough.
    // Time, everything is in order. check the size, add a new requests for two differents mechanics
    // and check if the not both requests are added to the same mechanic.

    //Check if the list of the mechanic is empty
    assertEquals(0, requestController.getChangedRequests(mechanic.getId()).size());
    // Add a request that is made by the mechanic
    requestController.addNewRequestToUser(mechanic.getId(), new Request[]{request7});
    // Add a request to an other mechanic with userId 1001.
    requestController.addNewRequestToUser(1001, new Request[]{request8});
    // Check if the list of the mechanic is still 1 since we only want to let the mechanics see there own requests.
    assertEquals(1, requestController.getChangedRequests(mechanic.getId()).size());
  }
}
