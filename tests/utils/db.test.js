/* Disable ESLint rule for named exports default issues */
import dbClient from '../../utils/db';

// Test suite for the `dbClient` utility
describe('+ DBClient utility', () => {
  // Setup function to run before any tests
  before(function (done) {
    // Set a timeout for asynchronous operations
    this.timeout(10000);

    // Ensure collections are available and clear them before tests
    Promise.all([dbClient.usersCollection(), dbClient.filesCollection()])
      .then(([usersCollection, filesCollection]) => {
        // Clear both users and files collections
        Promise.all([usersCollection.deleteMany({}), filesCollection.deleteMany({})])
          .then(() => done()) // Call done() to signal that setup is complete
          .catch((deleteErr) => done(deleteErr)); // Pass error to done() if deletion fails
      }).catch((connectErr) => done(connectErr)); // Pass error to done() if connection fails
  });

  // Test to check if the database client is alive
  it('+ Client is alive', () => {
    expect(dbClient.isAlive()).to.equal(true); // Assert that the client is alive
  });

  // Test to check if the number of users is initially correct
  it('+ nbUsers returns the correct value', async () => {
    expect(await dbClient.nbUsers()).to.equal(0); // Assert that there are no users initially
  });

  // Test to check if the number of files is initially correct
  it('+ nbFiles returns the correct value', async () => {
    expect(await dbClient.nbFiles()).to.equal(0); // Assert that there are no files initially
  });
});
