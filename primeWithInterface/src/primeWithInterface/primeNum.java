package primeWithInterface;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Scanner;

public class primeNum implements PrimeNumberGenerator{
	static Scanner fin;	
	int startValue, endingValue;	
	
	
	/*Function to find the prime number between startValue and endingValue
	 * also swaps the range if startValue is greater than endingValue
	 * and if one of the range number is negative then throws a error message. 
	*/
	@Override
	public List<Integer> generate(int startValue, int endingValue) {
		// TODO Auto-generated method stub
		int i;
		List<Integer> primeNum = new ArrayList<Integer>();
		System.out.println("Starting Value = " + startValue );
		System.out.println("Ending Value = " + endingValue );
		if(startValue > endingValue && startValue > -1 && endingValue > -1) {
	            int temp = startValue;
	            startValue = endingValue;
	            endingValue = temp;
	    }
	    if(startValue < -1 || endingValue < -1)
	    {
	    	System.out.println("\nRange cannot have negative numbers");
	    	return null;
	    }
	    
	    for (i = startValue; i<=endingValue; i++){
	            if(isPrime(i)){
	            	primeNum.add(i);
	            }
	    }
	    Iterator<Integer> myListIterator = primeNum.iterator(); 
	    while (myListIterator.hasNext()) {
	        int num = myListIterator.next(); 	        
	        System.out.println(num);	        
	    }
		return null;
	}
/*
 * function to check whether a number is prime or not
 */
	@Override
	public boolean isPrime(int value) {
		// TODO Auto-generated method stub
		int j;
	    if( value == 2)
	            return true;
	    else if(value % 2 == 0)
	            return false;
	    else if(value == 1 )
	    	return false;

	    for (j = 3; j < value/2; j += 2)
	            if (value % j == 0)
	                    return false;
		return true;		
	}
/*
 * function to read the range values from the input file
 */
	public void readRange() throws FileNotFoundException {
		// TODO Auto-generated method stub
		fin = new Scanner(new File("input.txt"));
		this.startValue =  fin.nextInt();
		this.endingValue = fin.nextInt();
	}
}

