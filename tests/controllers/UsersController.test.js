/* eslint-disable import/no-named-as-default */
// Import the database client from the utils directory
import dbClient from '../../utils/db';

// Test suite for UserController
describe('+ UserController', () => {
  // Mock user data for testing
  const mockUser = {
    email: 'beloxxi@blues.com',
    password: 'melody1982',
  };

  // Setup before running any tests
  before(function (done) {
    // Increase timeout for the setup process
    this.timeout(10000);
    // Connect to the users collection and delete any existing user with the mock email
    dbClient.usersCollection()
      .then((usersCollection) => {
        usersCollection.deleteMany({ email: mockUser.email })
          .then(() => done()) // Call done() to proceed with tests if deletion is successful
          .catch((deleteErr) => done(deleteErr)); // Call done() with error if deletion fails
      }).catch((connectErr) => done(connectErr)); // Call done() with error if connection fails
    // Additional timeout to ensure the async operation completes
    setTimeout(done, 5000);
  });

  // Test suite for POST requests to /users endpoint
  describe('+ POST: /users', () => {
    // Test case: Fails when email is missing but password is provided
    it('+ Fails when there is no email and there is password', function (done) {
      // Increase timeout for this test case
      this.timeout(5000);
      // Send a POST request to /users with only the password
      request.post('/users')
        .send({
          password: mockUser.password,
        })
        .expect(400) // Expect a 400 Bad Request status code
        .end((err, res) => {
          if (err) {
            return done(err); // Return error if request fails
          }
          // Verify the response body contains the correct error message
          expect(res.body).to.deep.eql({ error: 'Missing email' });
          done(); // Call done() to indicate test completion
        });
    });

    // Test case: Fails when password is missing but email is provided
    it('+ Fails when there is email and there is no password', function (done) {
      // Increase timeout for this test case
      this.timeout(5000);
      // Send a POST request to /users with only the email
      request.post('/users')
        .send({
          email: mockUser.email,
        })
        .expect(400) // Expect a 400 Bad Request status code
        .end((err, res) => {
          if (err) {
            return done(err); // Return error if request fails
          }
          // Verify the response body contains the correct error message
          expect(res.body).to.deep.eql({ error: 'Missing password' });
          done(); // Call done() to indicate test completion
        });
    });

    // Test case: Succeeds when both email and password are provided
    it('+ Succeeds when the new user has a password and email', function (done) {
      // Increase timeout for this test case
      this.timeout(5000);
      // Send a POST request to /users with both email and password
      request.post('/users')
        .send({
          email: mockUser.email,
          password: mockUser.password,
        })
        .expect(201) // Expect a 201 Created status code
        .end((err, res) => {
          if (err) {
            return done(err); // Return error if request fails
          }
          // Verify the response body contains the correct email and a user ID
          expect(res.body.email).to.eql(mockUser.email);
          expect(res.body.id.length).to.be.greaterThan(0);
          done(); // Call done() to indicate test completion
        });
    });

    // Test case: Fails when the user already exists
    it('+ Fails when the user already exists', function (done) {
      // Increase timeout for this test case
      this.timeout(5000);
      // Send a POST request to /users with already existing email and password
      request.post('/users')
        .send({
          email: mockUser.email,
          password: mockUser.password,
        })
        .expect(400) // Expect a 400 Bad Request status code
        .end((err, res) => {
          if (err) {
            return done(err); // Return error if request fails
          }
          // Verify the response body contains the correct error message for existing user
          expect(res.body).to.deep.eql({ error: 'Already exist' });
          done(); // Call done() to indicate test completion
        });
    });
  });

});
