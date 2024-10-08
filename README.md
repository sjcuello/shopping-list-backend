# Shopping List Backend

This is the backend for the shopping list app. 

## How to run the app
__Note:__ You need to have NodeJS (v20) installed in your machine to run this app. Also a Postgres (v15) database is required.

1. Clone the repository
    ```bash
    git clone https://github.com/sjcuello/shopping-list-backend.git
    ```
2. Enter the project directory
    ```bash
    cd shopping-list-backend
    ```
3. Copy the `.env.example` file and rename it to `.env`:
    ```bash
    cp .env.example .env
    ```
4. Install the dependencies
    ```bash
    npm install
    ```
5. Generate the database
    ```bash
    npx prisma generate
    ```
6. Run the migrations
    ```bash
    npx prisma migrate dev
    ```
7. Start the server
    ```bash
    npm run dev
    ```
### Accessing the server
The server will be running on `http://localhost:3000`
The documentation will be available on `http://localhost:3000/docs`


## Technologies Used
- NodeJS
- Express
- Prisma
- Postgres
- TypeScript
- Swagger
- Joi