package com.edu.neu.careercraftai;

import com.edu.neu.careercraftai.domain.entities.AuthorEntity;
import com.edu.neu.careercraftai.repositories.AuthorRepository;
import com.edu.neu.careercraftai.services.impl.AuthorServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthorServiceImplTest {

    @Mock
    private AuthorRepository authorRepository;

    @InjectMocks
    private AuthorServiceImpl authorService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void save() {
        AuthorEntity authorEntity = new AuthorEntity();
        authorEntity.setId(1L);
        authorEntity.setName("Test Author");

        when(authorRepository.save(authorEntity)).thenReturn(authorEntity);

        AuthorEntity savedAuthor = authorService.save(authorEntity);

        assertNotNull(savedAuthor);
        assertEquals("Test Author", savedAuthor.getName());
        verify(authorRepository, times(1)).save(authorEntity);
    }

    @Test
    void findAll() {
        List <AuthorEntity> authors = new ArrayList<>();
        AuthorEntity author1 = new AuthorEntity();
        author1.setId(1L);
        author1.setName("Author 1");
        authors.add(author1);
        AuthorEntity author2 = new AuthorEntity();
        author2.setId(2L);
        author2.setName("Author 2");
        authors.add(author2);

        when(authorRepository.findAll()).thenReturn(authors);

        List         <AuthorEntity> foundAuthors = authorService.findAll();

        assertNotNull(foundAuthors);
        assertEquals(2, foundAuthors.size());
        assertEquals("Author 1", foundAuthors.get(0).getName());
        assertEquals("Author 2", foundAuthors.get(1).getName());
        verify(authorRepository, times(1)).findAll();
    }

    @Test
    void findOne() {
        AuthorEntity authorEntity = new AuthorEntity();
        authorEntity.setId(1L);
        authorEntity.setName("Test Author");

        when(authorRepository.findById(1L)).thenReturn(Optional.of(authorEntity));

        Optional         <AuthorEntity> foundAuthor = authorService.findOne(1L);

        assertTrue(foundAuthor.isPresent());
        assertEquals("Test Author", foundAuthor.get().getName());
        verify(authorRepository, times(1)).findById(1L);
    }

    @Test
    void isExists() {
        when(authorRepository.existsById(1L)).thenReturn(true);

        assertTrue(authorService.isExists(1L));
        verify(authorRepository, times(1)).existsById(1L);
    }

    @Test
    void partialUpdate_existingAuthor() {
        AuthorEntity existingAuthor = new AuthorEntity();
        existingAuthor.setId(1L);
        existingAuthor.setName("Existing Author");

        AuthorEntity updatedAuthor = new AuthorEntity();
        updatedAuthor.setId(1L);
        updatedAuthor.setName("Updated Author");

        when(authorRepository.findById(1L)).thenReturn(Optional.of(existingAuthor));
        when(authorRepository.save(existingAuthor)).thenReturn(updatedAuthor);

        AuthorEntity result = authorService.partialUpdate(1L, updatedAuthor);

        assertEquals("Updated Author", result.getName());
        verify(authorRepository, times(1)).findById(1L);
        verify(authorRepository, times(1)).save(existingAuthor);
    }

    @Test
    void partialUpdate_nonExistingAuthor() {
        AuthorEntity updatedAuthor = new AuthorEntity();
        updatedAuthor.setId(1L);
        updatedAuthor.setName("Updated Author");

        when(authorRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> authorService.partialUpdate(1L, updatedAuthor));

        verify(authorRepository, times(1)).findById(1L);
    }

    @Test
    void delete() {
        authorService.delete(1L);
        verify(authorRepository, times(1)).deleteById(1L);
    }
}
