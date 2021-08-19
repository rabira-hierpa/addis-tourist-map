# Addis Tourist map
A tourist guide map for Addis Ababa City

### Setup

Before getting started make sure to visit MongoDB Atlas and create a free cluster and define __MONGO_URL__ and __PORT__ in your `.env` file.

> Backend (Express.js)

```bash
git clone rabira-hierpa/addis-tourist-map
cd backend
npm i
```

> Frontend (React.js)
```bash
git clone rabira-hierpa/addis-tourist-map
cd frontend
npm i
```

### Dev

To run the development for the backend server run

```bash
cd backend
npm start # uses nodemone by default
```
For running the frontend run

```bash
npm start # runs the default create react app
```

> Make sure your __proxy__ in your frontend `package.json` file matches your __API__ port


