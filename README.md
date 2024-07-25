# Invoice Management System
## Project Description
This is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application includes user authentication, a dashboard with basic analytics, CRUD operations for managing invoices, and PDF generation for invoices.

## Technologies Used
- MongoDB
- Express
- Reactjs
- Node.js
- JWT for authentication
- pdfkit for pdf generation
- Vercel for frontend deployment
- Render for backend deployment

## Setup instruction
### Backend 
1. Clone the repository: `git clone https://github.com/devilasura084/Invoices`
2. Navigate to the backend directory:`cd backend`
3. Install dependencies: `npm install`
4. Create a `.env` file
5. Start the server: `npm start`

### Frontend
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the developement server: `npm run dev`

## Api Documentation

### Authentication
- `POST /api/auth/signup`: `Register a new user`
- `POST /api/auth/signin`: `Login a existing user`

### INvoice Management
- `GET /api/invoices` : `Retrieve all invoices`
- `POST /api/invoices` : `Create a new invoices`
- `GET /api/invoices/:invoice_number` : `Retrieve a single invoice`
- `PUT /api/invoices/:invoice_number` : `Update a single invoice`
- `DELETE /api/invoices/:invoice_number` : `Delete a single invoice`

### PDF Generation
- `GET /api/invoices/:invoice_number/pdf` : `Generate a single invoice pdf`

## Deployement Instructions
### Backend
1. Deploy the backend on Render
2. Set up enviroment variables on Render

### Frontend
1. Deploy the Frontend on Vercel.
2. Update the API endpoint URLs in the frontend code

## Live URLs
- Frontend: [https://invoices-rvcx.vercel.app/]
- Backend: [https://invoices-v4b4.onrender.com]