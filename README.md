MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY_USER=your_jwt_secret
PORT=8080
```

5. Create `.env` file in `/client`:

```
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_SOCKET_URL=http://localhost:8080
```

### Running the app

Start the server:

```bash
cd server
npm start
```

Start the client:

```bash
cd client
npm start
```

App will be available at `http://localhost:3000`
