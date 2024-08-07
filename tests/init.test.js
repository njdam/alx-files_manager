// Importing the `supertest` module for HTTP assertions
import supertest from 'supertest';
// Importing the `chai` module for assertion libraries
import chai from 'chai';
// Importing the API instance from the `server` module
import api from '../server';

// Assigning the imported API instance to a global variable for testing
global.app = api;
// Creating a `supertest` request object for the API instance
global.request = supertest(api);
// Assigning Chai's `expect` function to a global variable for easier assertions
global.expect = chai.expect;
// Assigning Chai's `assert` function to a global variable for assertion checks
global.assert = chai.assert;
