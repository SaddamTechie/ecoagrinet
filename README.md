# EcoAgriNet

Live Project Link : https://ecoagrinet.vercel.app/

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://ecoagrinet.vercel.app/)

### [![Home Screenshot](./screenshots/hero.png)](https://ecoagrinet.vercel.app/)

**EcoAgriNet** is a full-stack web application empowering smallholder farmers with real-time data, community support, and a direct marketplace to enhance sustainability and profitability. Built as a capstone project, it aligns with UN Sustainable Development Goals (SDG 2: Zero Hunger, SDG 13: Climate Action) by leveraging modern technologies like React, Node.js, MongoDB, and FastAPI-powered AI.

[Pitch Deck](https://docs.google.com/presentation/d/1w239WsvWlp7TPVGegHD9jwU7jWzd9abE3K7Pp7PN-zU/edit?usp=sharing)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Python AI Service Setup](#python-ai-service-setup)
- [Usage](#usage)
- [Architecture](#architecture)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Project Overview

EcoAgriNet addresses key challenges in agriculture:

- Lack of access to real-time weather and market data.
- Inefficient buyer-farmer connections.
- Unsustainable farming practices.

It provides a **Dashboard** for data-driven decisions, a **Forum** for community engagement, and a **Marketplace** for direct trade, all secured with JWT authentication and enhanced by AI crop recommendations.

---

## Features

- **Dashboard**:
  - Real-time weather via OpenWeatherMap with dynamic location input.
  - AI-driven crop recommendations (Python/FastAPI).
  - Static market price placeholders (expandable).
- **Forum**:
  - Full CRUD for posts (create, read, update, delete).
  - Comments and likes (posts and comments), restricted to authenticated users.
  - Share posts as links; edit/delete visible only to owners.
  - Sign-in popup for unauthenticated interactions.
- **Marketplace**:
  - Full CRUD for listings, restricted to owners.
  - Buyer-farmer direct connections.
- **Authentication**:
  - JWT-based login/register with role support (farmer/buyer).
  - Token expiration handling with auto-logout and notification.
- **Profile**: User details and logout functionality.

---

## Technology Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **AI Service**: Python, FastAPI, Scikit-Learn
- **APIs**: OpenWeatherMap (weather), JWT (auth)
- **Tools**: Axios, Express-Validator, Joblib

---

## Project Structure

```
ecoagrinet/
├── frontend/ # React frontend
│ ├── src/
│ │ ├── components/ # Dashboard, Forum, Marketplace, etc.
│ │ ├── App.jsx #
│ │ ├── index.css # Root styling
│ │ ├── main.jsx
│ │ ├── .env
│ │ ├── .gitignore
│ │ ├── eslint.config.js
│ │ ├── index.html # Entry file
│ │ ├── package.json
│ │ └── vite.config.js
│ └── package.json
├── backend/ # Node.js backend
│ ├── config/ # Database config
│ ├── controllers/ # Auth, Dashboard, Forum, Marketplace
│ ├── models/ # User, Post, Listing schemas
│ ├── routes/ # API endpoints
│ ├── middleware/ # Auth middleware
│ ├── server.js # Entry point
│ ├── .env # Environment variables
│ ├── .gitignore
│ └── package.json
├── python-service/ # FastAPI AI service
│ ├── data/ # Crop dataset (crop_data.csv)
│ ├── models/ # Trained model (crop_model.pkl)
│ ├── .gitignore
│ ├── main.py # FastAPI app
│ ├── train_model.py # Model training script
│ └── requirements.txt
└── README.md # This file
```

---

## Setup Instructions

### Prerequisites

- **Node.js**: v16+ (for backend and frontend)
- **MongoDB**: Local or cloud instance (e.g., MongoDB Atlas)
- **Python**: 3.8+ (for AI service)
- **Git**: For cloning the repository

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
   Install dependencies:
   ```bash
    npm install
   ```
   Create a .env file:

```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/ecoagrinet
    JWT_SECRET=your_jwt_secret_key_here
    WEATHER_API_KEY=your_openweathermap_api_key_here
```

    Get WEATHER_API_KEY from OpenWeatherMap.

2. Start the server:

   ```bash
       node server.js
   ```

   Runs on http://localhost:5000.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file:

   ```env
      VITE_API_URL=http://localhost:5000 # Backend url,change when deploying
   ```

4. Start the app:
   ```bash
    npm start
   ```
   Runs on http://localhost:5173.

### Python AI Service Setup

1. Navigate to the Python service directory:
   ```bash
    cd python-service
   ```
2. Set up a virtual environment:

   ```bash
    python -m venv venv
    source venv/bin/activate # On Linux
    venv\Scripts\activate # On Windows
   ```

3. Install dependencies:

   ```bash
    pip install -r requirements.txt
   ```

4. Prepare the dataset:
   Add data/crop_data.csv (see sample in code section).

5. Train the model:

   ```bash
       python train_model.py
   ```

   Generates models/crop_model.pkl.

6. Start the FastAPI service:

```bash
    uvicorn main:app --reload --port 5001
```

Runs on http://localhost:5000.

---

### Usage

1. Start All Services:

- Backend (node server.js)
- Frontend (npm start)
- Python Service (uvicorn main:app --port 5000)

2. Access the App:

- Open http://localhost:3000 in a browser.

3. User Flow:

- Unauthenticated: See Landing page, register/login.
- Authenticated: Access Dashboard, Forum, Marketplace, Profile.
- Dashboard: Input location, view weather and crop recommendations.
- Forum: Create/edit posts, comment, like (posts/comments), share.
- Marketplace: List/edit products, browse listings.

---

### Architecture

- Frontend: React with Tailwind CSS, communicates with backend via Axios.
- Backend: Node.js/Express serves APIs, connects to MongoDB, and calls Python service.
- Python Service: FastAPI handles AI predictions, trained with Scikit-Learn.

Data Flow:

```
 User inputs location → Backend fetches weather → Python predicts crop → Frontend displays.
```

---

### Future Enhancements

- Real Market Data: Integrate agricultural market price APIs.
- Mobile App: Extend to React Native for wider reach.
- Advanced AI: Use larger datasets, add pest detection.
- Notifications: Real-time alerts for weather changes or new listings.

### Contributing

1. Fork the repository.
2. Create a feature branch (git checkout -b feature/new-feature).
3. Commit changes (git commit -m "Add new feature").
4. Push to the branch (git push origin feature/new-feature).
5. Open a pull request.

---

### Acknowledgments

- OpenWeatherMap: Weather data API.
- FastAPI & Scikit-Learn: Enabling AI integration.
- Inspiration: Smallholder farmers and sustainability goals.
