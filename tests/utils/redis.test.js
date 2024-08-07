/* Disable ESLint rule for named exports default issues */
import { expect } from 'chai';
import redisClient from '../../utils/redis';

// Test suite for the `redisClient` utility
describe('+ RedisClient utility', () => {
  // Setup function to run before any tests
  before(function (done) {
    // Set a timeout for asynchronous operations
    this.timeout(10000);

    // Delay to ensure Redis client setup is complete
    setTimeout(done, 4000); // Wait for 4 seconds before signaling setup is complete
  });

  // Test to check if the Redis client is alive
  it('+ Client is alive', () => {
    expect(redisClient.isAlive()).to.equal(true); // Assert that the Redis client is alive
  });

  // Test to check setting and getting a value from Redis
  it('+ Setting and getting a value', async () => {
    await redisClient.set('test_key', 345, 10); // Set value '345' for 'test_key' with 10 seconds expiration
    expect(await redisClient.get('test_key')).to.equal('345'); // Assert that the retrieved value is '345'
  });

  // Test to check behavior for expired values in Redis
  it('+ Setting and getting an expired value', async () => {
    await redisClient.set('test_key', 356, 1); // Set value '356' for 'test_key' with 1 second expiration
    setTimeout(async () => {
      // After 2 seconds, the value should be expired
      expect(await redisClient.get('test_key')).to.not.equal('356'); // Assert that the value is no longer '356'
    }, 2000); // Wait for 2 seconds before checking
  });

  // Test to check behavior for deleted values in Redis
  it('+ Setting and getting a deleted value', async () => {
    await redisClient.set('test_key', 345, 10); // Set value '345' for 'test_key' with 10 seconds expiration
    await redisClient.del('test_key'); // Delete the key
    setTimeout(async () => {
      // After 2 seconds, the key should be deleted
      console.log('del: test_key ->', await redisClient.get('test_key')); // Log the retrieved value
      expect(await redisClient.get('test_key')).to.be.null; // Assert that the value is null
    }, 2000); // Wait for 2 seconds before checking
  });
});
