// Import the Express library to create an HTTP server
import express from 'express';
// Import the function to start the server
import startServer from './libs/boot';
// Import the function to inject routes into the server
import injectRoutes from './routes';
// Import the function to inject middleware into the server
import injectMiddlewares from './libs/middlewares';

// Create an instance of an Express application
const server = express();

// Inject middleware functions into the server
injectMiddlewares(server);
// Inject route handlers into the server
injectRoutes(server);
// Start the server
startServer(server);

// Export the server instance for use in other modules
export default server;
