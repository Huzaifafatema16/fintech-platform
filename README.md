# Fintech Platform Project

## Prerequisites
- Docker and Docker Compose installed
- Node.js and npm installed
- Git installed

## Setup Instructions

### Backend Setup
1. Clone the Repository:
  ```bash
   git clone https://github.com/Huzaifafatema16/fintech-platform

2. Setup Docker Containers:

Create a docker-compose.yml file:
version: '3.7'
services:
  postgres:
    image: postgres:latest
    restart: always
    environment:
      POSTGRES_PASSWORD: Password
      POSTGRES_USER: postgres
      POSTGRES_DB: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data

  hasura:
    image: hasura/graphql-engine:latest
    ports:
      - "8080:8080"
    depends_on:
      - postgres
    environment:
      HASURA_GRAPHQL_DATABASE_URL: postgres://postgres:Password@postgres:5432/postgres
      HASURA_GRAPHQL_ENABLE_CONSOLE: "true" # set to "false" in production

volumes:
  postgres-data:

3. Start Docker Containers:
  run this command in cmd
    docker-compose up -d

4. Configure Hasura:

  Access the Hasura console at http://localhost:8080.
  Navigate to the Data tab and create the required tables (accounts and transactions) using the Hasura console or migrations.

5. Environment Variables:
Create a .env file in the root directory of your project and add the following:

  DATABASE_URL=postgres://postgres:Password@localhost:5432/postgres

6. Install Backend Dependencies:

    Terminal
    Copy code and run
      cd backend
      npm install

7. Run the Backend Server
    npm start

8. Frontend Setup

  Navigate to the Frontend Directory:
  cd frontend

  Install Frontend Dependencies:
  npm install

  Run the Frontend Server:
  npx http-server
  Access the Frontend Application
  
9. Detailed API Documentation

  Endpoint: POST /api/transaction
  Description: Processes a transaction (deposit or withdrawal) for a specified account.


  Request Body:
  json
  Copy code
  {
    "account_id": 1,
    "amount": 100.00,
    "type": "deposit"
  }
  Responses: you will get this
  200 OK
  json
  {
    "message": "Deposit successful",
    "account": {
      "id": 1,
      "name": "John Doe",
      "balance": 200.00,
      "createdAt": "2024-07-27T12:34:56Z",
      "updatedAt": "2024-07-27T12:34:56Z"
    },
    "transaction": {
      "id": 1,
      "account_id": 1,
      "amount": 100.00,
      "type": "deposit",
      "createdAt": "2024-07-27T12:34:56Z"
    }
  }
  400 Bad Request
  json
  Copy code
  {
    "errors": [
      {
        "msg": "Amount must be a positive number",
        "param": "amount",
        "location": "body"
      }
    ]
  }
  404 Not Found
  json
  Copy code
  {
    "message": "Account not found"
  }
  500 Internal Server Error
  json
  Copy code
  {
    "message": "Error processing transaction"
  }

  NOTE: [you have only this account id = 3 ,8 ,9,10] if you enter other than this you will get the above error message ["Account Not Found "]

10. Design Decisions
-Use of Hasura:

Hasura is used to simplify the management and querying of the PostgreSQL database, providing a real-time GraphQL API out-of-the-box.
This choice leverages Hasura's powerful features like automatic API generation and built-in authorization.

-Docker for Containerization:

Docker ensures consistency across different development environments and simplifies the deployment process.
Using Docker Compose allows easy management of multiple services (PostgreSQL and Hasura).

-Sequelize ORM:

Sequelize is used for database interactions in the Node.js backend, providing a robust and flexible ORM for defining models and handling database operations.

11. Assumptions
-Local Development:

Assumes a local development setup with Docker running on the host machine.
The frontend and backend servers are both running locally on different ports.

-Database Initialization:

Assumes that the PostgreSQL database and Hasura are properly set up and running via Docker.
The required tables (accounts and transactions) are created and managed through Hasura.  