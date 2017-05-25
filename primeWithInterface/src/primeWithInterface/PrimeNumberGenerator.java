package primeWithInterface;

import java.util.List;

public interface PrimeNumberGenerator {
	List<Integer> generate(int startValue, int endingValue);
	boolean isPrime(int value);

}
