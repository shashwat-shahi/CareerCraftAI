package com.edu.neu.careercraftai;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.boot.test.context.SpringBootTest;

import com.edu.neu.careercraftai.services.Utils;

@SpringBootTest
class CareerCraftAiApplicationTests {

    Utils myClass = new Utils();

	// Test 1
	@ParameterizedTest
    @DisplayName("Test coverage of statements S1, S2, S3, S5, S6, S9")
    @CsvSource({
            "10, 15, 12, 18, 2", // a > x, b > y
    }) 
    public void test1Coverage(int x, int y, int a, int b, int expectedValue) {
        int result = myClass.coverage(a, b, x, y);
        assertEquals(expectedValue, result);
    }

	// Test 2
	@ParameterizedTest
	@DisplayName("Test coverage of statements S1, S2, S3, S5, S7, S8, S9")
    @CsvSource({
            "-10, -15, -9, -17, 0", // a > x, b <= y, value * x <= -a
    }) 
    public void test2Coverage(int x, int y, int a, int b, int expectedValue) {
        int result = myClass.coverage(a, b, x, y);
        assertEquals(expectedValue, result);
    }

	// Test 3
	@ParameterizedTest
    @DisplayName("Test coverage of statements S1, S2, S3, S5, S7, S9")
    @CsvSource({
            "10, 15, 12, 11, 1", // a > x, b <= y, value * x > -a
    }) 
    public void test3Coverage(int x, int y, int a, int b, int expectedValue) {
        int result = myClass.coverage(a, b, x, y);
        assertEquals(expectedValue, result);
    }

	// Test 4
	@ParameterizedTest
    @DisplayName("Test coverage of statements S1, S2, S4, S5, S6, S9")
    @CsvSource({
            "10, 15, 7, 18, 0", // a <= x, b > y
    }) 
    public void test4Coverage(int x, int y, int a, int b, int expectedValue) {
        int result = myClass.coverage(a, b, x, y);
        assertEquals(expectedValue, result);
    }

	// Test 5
	@ParameterizedTest
    @DisplayName("Test coverage of statements S1, S2, S4, S5, S7, S8, S9")
    @CsvSource({
            "-10, -15, -12, -17, -2", // a <= x, b <= y, value * x <= -a
    }) 
    public void test5Coverage(int x, int y, int a, int b, int expectedValue) {
        int result = myClass.coverage(a, b, x, y);
        assertEquals(expectedValue, result);
    }

}
