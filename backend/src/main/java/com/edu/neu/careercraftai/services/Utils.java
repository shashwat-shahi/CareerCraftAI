package com.edu.neu.careercraftai.services;

public class Utils {
    public int coverage(int a, int b, int x, int y) {

        int value = 0;                  // s1

        if (a > x) {                    // s2
            value = 1;    
            System.out.println("s3 executed") ;             // s3
        } 
        else {
            value = -1;                 // s4
        }
        
        if (b > y) {                    // s5
            value += 1;                 // s6
        } 
        else if (value * x <= -a) {     // s7
            value -= 1;                 // s8
        }
        
        return value;                   // s9
        
    }
}
