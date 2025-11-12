/**
 * main.js - Main Thread for Node.js Multithreading Demo
 * Author: Your Name Here
 * 
 * This program demonstrates Node.js Worker Threads for parallel processing
 * by calculating prime numbers using multiple threads.
 * 
 * References:
 * - Node.js Worker Threads: https://nodejs.org/api/worker_threads.html
 * - Tutorial: https://www.digitalocean.com/community/tutorials/how-to-use-multithreading-in-node-js
 */

const { Worker } = require('worker_threads');
const os = require('os');

// ============ Display Student Information ============
console.log('='.repeat(60));
console.log('Node.js Multithreading Demo - Prime Number Calculator');
console.log('Student Name: Qinyu Luo');
console.log('Programming Language: Node.js');
console.log('Topic: Multithreading with Worker Threads');
console.log('='.repeat(60));
console.log();

// ============ Configuration ============
const MAX_NUMBER = 100000;  // Find all primes up to this number
const NUM_THREADS = os.cpus().length;  // Use all available CPU cores

console.log(`System Information:`);
console.log(`- CPU Cores Available: ${NUM_THREADS}`);
console.log(`- Finding primes from 1 to ${MAX_NUMBER}`);
console.log();

/**
 * Run a worker thread to find primes in a range
 * @param {number} start - Range start
 * @param {number} end - Range end
 * @param {number} threadId - Thread ID
 * @returns {Promise} - Promise that resolves with results
 */
function runWorker(start, end, threadId) {
    return new Promise((resolve, reject) => {
        // Create worker thread
        const worker = new Worker('./worker.js', {
            workerData: { start, end, threadId }
        });

        // Listen for messages from worker (results)
        worker.on('message', resolve);
        
        // Listen for errors
        worker.on('error', reject);
        
        // Listen for worker exit
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}

/**
 * Calculate primes using multiple threads
 */
async function calculateWithMultiThreading() {
    console.log('Method 1: MULTITHREADING (Using Worker Threads)');
    
    const startTime = Date.now();
    
    // Divide work evenly among all threads
    const rangePerThread = Math.ceil(MAX_NUMBER / NUM_THREADS);
    const workers = [];
    
    for (let i = 0; i < NUM_THREADS; i++) {
        const start = i * rangePerThread + 1;
        const end = Math.min((i + 1) * rangePerThread, MAX_NUMBER);
        workers.push(runWorker(start, end, i + 1));
    }
    
    // Wait for all workers to complete
    const results = await Promise.all(workers);
    
    const endTime = Date.now();
    
    // Aggregate all results
    let allPrimes = [];
    console.log();
    results.forEach(result => {
        allPrimes = allPrimes.concat(result.primes);
    });
    
    // Sort primes (results may be out of order due to parallel computation)
    allPrimes.sort((a, b) => a - b);
    
    console.log();
    console.log(`Total primes found: ${allPrimes.length}`);
    console.log(`Total execution time: ${endTime - startTime}ms`);
    console.log(`First 10 primes: ${allPrimes.slice(0, 10).join(', ')}`);
    console.log(`Last 10 primes: ${allPrimes.slice(-10).join(', ')}`);
    console.log();
    
    return { count: allPrimes.length, time: endTime - startTime };
}

/**
 * Calculate primes using single thread (for comparison)
 */
function calculateSingleThreaded() {
    console.log('Method 2: SINGLE THREAD (For Comparison)');
    
    const startTime = Date.now();
    
    // Function to check if a number is prime
    function isPrime(num) {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) {
                return false;
            }
        }
        return true;
    }
    
    const primes = [];
    for (let i = 2; i <= MAX_NUMBER; i++) {
        if (isPrime(i)) {
            primes.push(i);
        }
    }
    
    const endTime = Date.now();
    
    console.log(`Total primes found: ${primes.length}`);
    console.log(`Total execution time: ${endTime - startTime}ms`);
    console.log(`First 10 primes: ${primes.slice(0, 10).join(', ')}`);
    console.log(`Last 10 primes: ${primes.slice(-10).join(', ')}`);
    console.log();
    
    return { count: primes.length, time: endTime - startTime };
}

/**
 * Main function
 */
async function main() {
    try {
        // Run multithreaded version
        const multiThreadResult = await calculateWithMultiThreading();
        
        // Run single-threaded version (for comparison)
        const singleThreadResult = calculateSingleThreaded();
        
        // Display performance comparison
        console.log('PERFORMANCE COMPARISON');
        console.log(`Multithreading Time:  ${multiThreadResult.time}ms`);
        console.log(`Single Thread Time:   ${singleThreadResult.time}ms`);
        
        const speedup = (singleThreadResult.time / multiThreadResult.time).toFixed(2);
        const improvement = (((singleThreadResult.time - multiThreadResult.time) / singleThreadResult.time) * 100).toFixed(1);
        
        console.log();
        if (multiThreadResult.time < singleThreadResult.time) {
            console.log(`Speedup: ${speedup}x faster`);
            console.log(`Performance Improvement: ${improvement}%`);
        } else {
            console.log(`Note: With small data sets, multithreading may be slower due to thread creation overhead`);
            console.log(`Tip: Increase the workload to see the advantages of multithreading`);
        }
        console.log();
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the program
main();