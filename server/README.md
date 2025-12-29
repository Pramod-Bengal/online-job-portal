# Job Portal Server

Backend API server for the Online Job Portal application.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure MongoDB Connection

Create a `.env` file in the `server` directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/job_portal?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

**For detailed MongoDB setup instructions, see [MONGODB_SETUP.md](../MONGODB_SETUP.md)**

### 3. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/top` - Get top/featured jobs
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create a new job (requires authentication)

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Applications
- `POST /api/applications` - Apply for a job

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/job_portal` |
| `PORT` | Server port | `5000` |
| `JWT_SECRET` | Secret key for JWT tokens | Required |

## Project Structure

```
server/
├── config/          # Configuration files (database, etc.)
├── controllers/     # Request handlers
├── middleware/      # Custom middleware (auth, etc.)
├── models/          # Mongoose models
├── routes/          # API routes
└── index.js         # Server entry point
```

