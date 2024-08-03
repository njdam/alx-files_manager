# Files Manager Backend

This is a backend application built with Node.js and Express.js to manage files. It provides endpoints for uploading, downloading, and managing files stored in a MongoDB database.

## Features

- Upload files
- List files
- Download files
- Delete files

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Redis (optional)
- Multer (for file uploads)
- Mongoose (for MongoDB interaction)
- Kue (for background processing)

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB and Redis installed and running

### Installation

1. Clone the repository:

	```bash
	git clone https://github.com/njdam/alx-files_manager.git
	```

2. Install dependencies:

	```bash
	cd alx-files_manager
	npm install
	```

3. Start the server:

	```bash
	npm start
	```
The server will start running at `http://localhost:3000`.

## Usage

### Uploading Files

To upload a file, send a POST request to `/upload` endpoint with the file attached as a form-data field named `file`.

### Listing Files

To list all files, send a GET request to `/files`.

### Downloading Files

To download a file, send a GET request to `/files/:filename`, where `:filename` is the name of the file to download.

### Deleting Files

To delete a file, send a DELETE request to `/files/:filename`, where `:filename` is the name of the file to delete.

## License

This project is licensed under the ISC License.
