/**
 * worker.js - Worker Thread for Prime Number Calculation
 * Author: Your Name Here
 * 
 * This file runs in a separate thread to calculate prime numbers.
 * It receives data from the main thread and sends results back.
 * 
 * Reference: 
 * Node.js Worker Threads Documentation: https://nodejs.org/api/worker_threads.html
 */

// Import required modules from worker_threads
const { parentPort, workerData } = require('worker_threads');

/**
 * Check if a number is prime
 * @param {number} num - Number to check
 * @returns {boolean} - True if prime, false otherwise
 */
function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    // Only need to check up to square root
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) {
            return false;
        }
    }
    return true;
}

/**
 * Find all prime numbers in a range
 * @param {number} start - Range start
 * @param {number} end - Range end
 * @returns {Array} - Array of prime numbers
 */
function findPrimesInRange(start, end) {
    const primes = [];
    for (let i = start; i <= end; i++) {
        if (isPrime(i)) {
            primes.push(i);
        }
    }
    return primes;
}

// Get data from main thread
const { start, end, threadId } = workerData;

console.log(`[Worker ${threadId}] Starting calculation from ${start} to ${end}`);

// Record start time
const startTime = Date.now();

// Perform calculation
const primes = findPrimesInRange(start, end);

// Record end time
const endTime = Date.now();

// Send results back to main thread
parentPort.postMessage({
    threadId: threadId,
    primes: primes,
    count: primes.length,
    executionTime: endTime - startTime,
    range: { start, end }
});

console.log(`[Worker ${threadId}] Completed! Found ${primes.length} primes in ${endTime - startTime}ms`);