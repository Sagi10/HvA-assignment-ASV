package com.example.demo.models;

import com.example.demo.KlmSpringBootApplication;
import com.example.demo.controllers.RequestController;
import com.example.demo.controllers.UserController;
import com.example.demo.enums.Functions;
import com.example.demo.enums.PlaneTypes;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = KlmSpringBootApplication.class)
public class RequestTest {
    private User mechanic;
    private Request request;

    @Autowired
    private RequestController requestController;
    @Autowired
    private UserController userController;

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
        } catch (Exception e) {}
    }

    @Test
    public void updateTimeStamps_OnDatabaseEntry_UpdatesDateValues() {
        // Arrange
        Request[] requests = new Request[] { request };
        int dateTimeOffset = 30;

        // Act
        List<Long> requestIds = requestController.addNewRequestToUser(mechanic.getId(), requests);

        LocalDateTime insertionTime = LocalDateTime.now();
        request = requestController.getRequest(requestIds.get(0));

        // Assert
        assertNotNull(request);
        assertNotNull(request.getRequestCreated());
        assertNotNull(request.getRequestUpdated());

        long differenceCreated = Duration.between(request.getRequestCreated(), insertionTime).toSeconds();
        long differenceUpdated = Duration.between(request.getRequestUpdated(), insertionTime).toSeconds();
        assertTrue(differenceCreated <= dateTimeOffset);
        assertTrue(differenceUpdated <= dateTimeOffset);
    }
}