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
	
	@Override
	public List<Integer> generate(int startValue, int endingValue) {
		// TODO Auto-generated method stub
		//System.out.println("inside GENERATE start= "+startValue+" " + "end = "+endingValue+"\n");
		int i;
		List<Integer> primeNum = new ArrayList<Integer>();
		//System.out.println(start+" " + end+"\n");
	    if(startValue > endingValue) {
	            int temp = startValue;
	            startValue = endingValue;
	            endingValue = temp;
	    }
	    int count = 0;
	    System.out.println(startValue+" " + endingValue+"\n");
	    for (i = startValue; i<=endingValue; i++){
	            if(isPrime(i)){
	                    //System.out.println(i);
	                    count++;
	                    primeNum.add(i);
	            }
	    }
	    System.out.println("count= "+count);
	    Iterator<Integer> myListIterator = primeNum.iterator(); 
	    while (myListIterator.hasNext()) {
	        int num = myListIterator.next(); 	        
	        System.out.println(num);	        
	    }
		return null;
	}

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

	    for (j = 3; j < Math.sqrt(value); j += 2)
	            if (value % j == 0)
	                    return false;
		return true;
		
	}

	public void readRange() throws FileNotFoundException {
		// TODO Auto-generated method stub
		fin = new Scanner(new File("input.txt"));
		this.startValue =  fin.nextInt();
		this.endingValue = fin.nextInt();
		System.out.println("start= "+this.startValue+" " + "end = "+this.endingValue+"\n");
	}
	
	

}

