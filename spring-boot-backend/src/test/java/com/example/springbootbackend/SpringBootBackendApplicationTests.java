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
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(classes = KlmSpringBootApplication.class)
class SpringBootBackendApplicationTests {

    @Autowired
    private RequestController requestController;
    @Autowired
    private UserController userController;
    private User mechanic;

    @BeforeEach
    public void setup() {
        assertNotNull(requestController);
        assertNotNull(userController);

        mechanic = new User("Gooder Mechanic", "Fancy password", "Gooder",
                "Mechanic", Functions.MECHANIC);

        userController.createUser(mechanic);

        if (userController.getAllUsers().size() == 0) {
            throw new NullPointerException("No users added, tests can't function");
        }
    }

    @Test
    @DisplayName("User Story 1")
    public void addSingleNewRequestToUser() {
        //Arrange
        Request request = new Request("C2", LocalDateTime.now(), PlaneTypes.AIRBUSA330200, "PH_AKB",
                "Nitrogen Cart", 0, "Left", "Pending", null);

        //Act
        // Add a new request to the user
        List<Long> requestList = requestController.addNewRequestToUser(mechanic.getId(), new Request[]{request});

        //Assert
        // Check if the request is added by checking the list size.
        assertNotNull(requestList);
        assertEquals(9, requestController.getAllRequests().size());
    }


    @Test
    @DisplayName("User Story 2")
    void deleteRequestById() {
        //Arrange
        //The request with id:501 is retrieved from the data.sql file.
        Request requestToBeDeleted = requestController.getRequest(501);

        //Act
        // Delete the request with the ID: 501
        requestController.deleteRequestById(requestToBeDeleted.getId());

        //Assert
        // Check if the size is decremented
        assertEquals(8, requestController.getAllRequests().size());
        // Make a request for the ID: 501 (that was deleted).
        RequestNotFoundException exception =
                assertThrows(RequestNotFoundException.class, () -> requestController.getRequest(501));
        // Check if the exception is thrown when the request with ID:501 is requested.
        assertEquals("Melding met id: 501 is niet gevonden.", exception.getMessage());
    }

    @Test
    @DisplayName("User Story 3")
    void getRequestsOverviewMechanic() {
        //Arrange
        Request request1 = new Request("C2", LocalDateTime.now(), PlaneTypes.AIRBUSA330200, "PH_AKB",
                "Nitrogen Cart", 0, "Left", "Pending", null);
        Request request2 = new Request("B5", LocalDateTime.now(), PlaneTypes.AIRBUSA330300, "PH_AKB",
                "Tires Cart", 0, "Right", "Pending", null);

        //Act
        // Add a request that is made by the mechanic
        requestController.addNewRequestToUser(mechanic.getId(), new Request[]{request1});
        // Add a request to another mechanic with userId 1001.
        requestController.addNewRequestToUser(1001, new Request[]{request2});

        //Assert
        // Check if the list of the mechanic is still 1 since we only want to let the mechanics see there own requests.
        assertEquals(1, requestController.getChangedRequests(mechanic.getId()).size());
    }
}
