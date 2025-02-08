# Bike Store Backend v2

This is the backend for the Bike Store application. It provides a RESTful API for managing bikes, customers, and orders.

## Installation Guide

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/RanokRaihan/bike-store-backend-v2.git
   ```
2. Navigate to the project directory:
   ```sh
   cd bike-store-backend-v2
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the root directory and add the following environment variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/bikestore
   ```
5. Start the server:
   ```sh
   npm start
   ```

The server should now be running on `http://localhost:3000`.

## API Endpoints

For detailed information about the API endpoints, please refer to the `postman.json` file included in the project. You can import this file into Postman to explore and test the available endpoints.
