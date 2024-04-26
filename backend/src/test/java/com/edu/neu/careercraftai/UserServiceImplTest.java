package com.edu.neu.careercraftai;

import static org.mockito.Mockito.*;

import java.util.Optional;

import com.edu.neu.careercraftai.services.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import com.edu.neu.careercraftai.entity.AspirationEntity;
import com.edu.neu.careercraftai.entity.UserEntity;
import com.edu.neu.careercraftai.models.ResponseModel;
import com.edu.neu.careercraftai.models.UserDetails;
import com.edu.neu.careercraftai.repositories.AspirationRepository;
import com.edu.neu.careercraftai.repositories.UserRepository;
import com.google.gson.Gson;

import static org.junit.jupiter.api.Assertions.*;

class UserServiceImplTest {

    private UserServiceImpl userService;

    private UserRepository userRepository = mock(UserRepository.class);
    private AspirationRepository aspirationRepository = mock(AspirationRepository.class);
    private Gson gson = mock(Gson.class);

    @BeforeEach
    void setUp() {
        userService = new UserServiceImpl();
        userService.userRepository = userRepository;
        userService.aspirationRepository = aspirationRepository;
        userService.gson = gson;
    }

    @Test
    void testCreateUser_Success() {
        UserDetails userDetails = new UserDetails();
        userDetails.setEmailId("test@example.com");
        userDetails.setFirstName("John");
        userDetails.setLastName("Doe");

        UserEntity newUser = new UserEntity();
        newUser.setId(1);
        newUser.setEmailId("test@example.com");
        newUser.setFirstName("John");
        newUser.setLastName("Doe");

        when(userRepository.save(any(UserEntity.class))).thenReturn(newUser);

        ResponseModel response = userService.createUser(userDetails);

        assertEquals(HttpStatus.OK, response.getResponseStatus());
        assertEquals("New user created successfullfy.", response.getResponseMessage());
        assertEquals(newUser, response.getResponseBody());
    }

    @Test
    void testUpdateUser_Success() {
        UserDetails userDetails = new UserDetails();
        userDetails.setFirstName("Updated John");
        userDetails.setLastName("Updated Doe");
        userDetails.setResumeLink("updated_resume_link");
        userDetails.setAspiration(1);

        UserEntity existingUser = new UserEntity();
        existingUser.setId(1);
        existingUser.setEmailId("test@example.com");
        existingUser.setFirstName("John");
        existingUser.setLastName("Doe");

        UserEntity updatedUser = new UserEntity();
        updatedUser.setId(1);
        updatedUser.setEmailId("test@example.com");
        updatedUser.setFirstName("Updated John");
        updatedUser.setLastName("Updated Doe");
        updatedUser.setResumeLink("updated_resume_link");

        when(userRepository.findById(1)).thenReturn(Optional.of(existingUser));
        when(aspirationRepository.findById(1)).thenReturn(Optional.of(new AspirationEntity()));
        when(userRepository.save(any(UserEntity.class))).thenReturn(updatedUser);

        ResponseModel response = userService.updateUser(1, userDetails);

        assertEquals(HttpStatus.OK, response.getResponseStatus());
        assertEquals("User updated successfullfy.", response.getResponseMessage());
        assertEquals(updatedUser, response.getResponseBody());
    }

    @Test
    void testGetUser_Success() {
        UserEntity existingUser = new UserEntity();
        existingUser.setId(1);
        existingUser.setEmailId("test@example.com");
        existingUser.setFirstName("John");
        existingUser.setLastName("Doe");

        when(userRepository.findById(1)).thenReturn(Optional.of(existingUser));

        ResponseModel response = userService.getUser(1);

        assertEquals(HttpStatus.OK, response.getResponseStatus());
        assertEquals("User fetched successfullfy.", response.getResponseMessage());
        assertEquals(gson.toJson(existingUser), response.getResponseBody());
    }

    @Test
    void testGetUser_NotFound() {
        when(userRepository.findById(1)).thenReturn(Optional.empty());

        ResponseModel response = userService.getUser(1);

        assertEquals(HttpStatus.NOT_FOUND, response.getResponseStatus());
        assertEquals("User does not exist", response.getResponseMessage());
        assertNull(response.getResponseBody());
    }

    @Test
    void testDeleteUser_Success() {
        ResponseModel response = userService.deleteUser(1);

        assertEquals(HttpStatus.OK, response.getResponseStatus());
        assertEquals("User deleted successfullfy.", response.getResponseMessage());
    }

    @Test
    void testIsUserPresent_True() {
        when(userRepository.findByEmailId("test@example.com")).thenReturn(Optional.of(new UserEntity()));

        assertTrue(userService.isUserPresent("test@example.com"));
    }

    @Test
    void testIsUserPresent_False() {
        when(userRepository.findByEmailId("test@example.com")).thenReturn(Optional.empty());

        assertFalse(userService.isUserPresent("test@example.com"));
    }

    @Test
    void testGetUserByEmail_Exists() {
        UserEntity existingUser = new UserEntity();
        existingUser.setId(1);
        existingUser.setEmailId("test@example.com");
        existingUser.setFirstName("John");
        existingUser.setLastName("Doe");

        when(userRepository.findByEmailId("test@example.com")).thenReturn(Optional.of(existingUser));

        assertEquals(existingUser, userService.getUserByEmail("test@example.com"));
    }

    @Test
    void testGetUserByEmail_NotExists() {
        when(userRepository.findByEmailId("test@example.com")).thenReturn(Optional.empty());

        assertNull(userService.getUserByEmail("test@example.com"));
    }

}
