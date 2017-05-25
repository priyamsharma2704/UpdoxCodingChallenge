package primeWithInterface;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class primeMain {
	
	public static void main(String args[]) throws FileNotFoundException{
		primeNum p = new primeNum();		
		p.readRange();
		p.generate(p.startValue, p.endingValue);
		
	}

}
