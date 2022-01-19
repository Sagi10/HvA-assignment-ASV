package com.example.demo.controllers;

import com.example.demo.KlmSpringBootApplication;
import com.example.demo.enums.CartTypes;
import com.example.demo.enums.EquipmentStatus;
import com.example.demo.enums.Functions;
import com.example.demo.enums.PlaneTypes;
import com.example.demo.models.Cart;
import com.example.demo.models.Request;
import com.example.demo.models.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = KlmSpringBootApplication.class)
public class RequestControllerTest {
    private User mechanic;
    private Request request;
    private Cart nitrogenCart;

    @Autowired
    private RequestController requestController;
    @Autowired
    private UserController userController;
    @Autowired
    private CartController cartController;

    @BeforeEach
    public void setUp() {
        User user = new User("jdeboer@klm.nl", "Strong password",
                "Jan", "de Boer", Functions.MECHANIC);
        request = new Request("C2", LocalDateTime.now().plusMinutes(30), PlaneTypes.AIRBUSA330200, "PH_AKB",
                "Nitrogen Cart", 0, "Left", "Pending", null);

        // Ensure that there is a mechanic in the database.
        userController.createUser(user);
        mechanic = userController.getAllUsers()
                .stream()
                .filter(i -> i.getEmail().equals(user.getEmail()))
                .collect(Collectors.toList()).get(0);
    }

    @AfterEach
    public void tearDown() {
        try {
            // Remove any and all changes to the database.
            if (mechanic != null && mechanic.getId() > 0) userController.deleteUserById(mechanic.getId());
            if (request != null && request.getId() > 0) requestController.deleteRequestById(request.getId());
            if (nitrogenCart != null && nitrogenCart.getID() > 0) cartController.deleteCart(nitrogenCart);
        } catch (Exception e) {}
    }

    @Test
    public void getAllRequests_WithAtLeastOneRequest_ReturnsAllRequests() {
        // Arrange
        Request[] requests = new Request[] { request };

        // Act
        List<Long> requestIds = requestController.addNewRequestToUser(mechanic.getId(), requests);
        List<Request> retrievedRequests = requestController.getAllRequests();
        request = requestController.getRequest(requestIds.get(0));

        // Assert
        assertNotNull(retrievedRequests);
        assertFalse(retrievedRequests.isEmpty());
        assertTrue(retrievedRequests.contains(request));
    }

    @Test
    public void addCartToRequest_WithValidCart_AddsCartIdToRequest() {
        // Arrange
        Request[] requests = new Request[] { request };
        Cart cart = new Cart("Nitrogen Cart", 52.302916, 4.761736, CartTypes.NITROGENCART, EquipmentStatus.AVAILABLE);

        // Act
        // Create a new nitrogen cart and request
        nitrogenCart = cartController.addNewCart(cart);
        List<Long> requestIds = requestController.addNewRequestToUser(mechanic.getId(), requests);

        // Add a cart to the request and retrieve the updated request.
        requestController.addCartToRequest(nitrogenCart.getID(), requestIds.get(0));
        request = requestController.getRequest(requestIds.get(0));

        // Assert
        assertNotNull(request);
        assertEquals(request.getSelectedWagon(), nitrogenCart.getID());
    }
}