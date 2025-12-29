# MongoDB Setup Guide

This guide will help you connect your job portal application to MongoDB Atlas (cloud database) or a local MongoDB instance.

## Option 1: MongoDB Atlas (Cloud - Recommended)

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account (if you don't have one)
3. Complete the registration process

### Step 2: Create a Cluster
1. After logging in, click **"Build a Database"** or **"Create"** button
2. Choose the **FREE (M0) tier** (perfect for development)
3. Select your preferred cloud provider and region (choose closest to you)
4. Click **"Create Cluster"**
5. Wait 3-5 minutes for the cluster to be created

### Step 3: Create Database User
1. In the left sidebar, go to **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication method
4. Enter a username and a strong password (save these credentials!)
5. Under **"Database User Privileges"**, select **"Atlas admin"** or **"Read and write to any database"**
6. Click **"Add User"**

### Step 4: Whitelist Your IP Address
1. In the left sidebar, go to **"Network Access"**
2. Click **"Add IP Address"**
3. For development, click **"Allow Access from Anywhere"** (adds 0.0.0.0/0)
   - **Note**: For production, use specific IP addresses for security
4. Click **"Confirm"**

### Step 5: Get Your Connection String
1. Go back to **"Database"** (or **"Clusters"**) in the left sidebar
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** as the driver and **"4.1 or later"** as the version
5. Copy the connection string (it looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Configure Your Application
1. In the `server` folder, create a `.env` file (copy from `.env.example`):
   ```bash
   cd server
   cp .env.example .env
   ```

2. Open the `.env` file and replace the connection string:
   ```env
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/job_portal?retryWrites=true&w=majority
   ```
   
   **Important**: 
   - Replace `YOUR_USERNAME` with your database username
   - Replace `YOUR_PASSWORD` with your database password
   - Replace `cluster0.xxxxx` with your actual cluster name
   - Add `/job_portal` before the `?` to specify the database name

3. Update other variables if needed:
   ```env
   PORT=5000
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   ```

### Step 7: Test the Connection
1. Make sure you're in the `server` directory
2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

4. You should see a message like:
   ```
   MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
   Server is running on port 5000
   ```

## Option 2: Local MongoDB Installation

### Step 1: Install MongoDB Locally
1. Download MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Install MongoDB following the installation wizard
3. Start MongoDB service (varies by OS):
   - **Windows**: MongoDB should start automatically as a service
   - **Mac**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

### Step 2: Configure Your Application
1. Create `.env` file in the `server` folder:
   ```env
   MONGODB_URI=mongodb://localhost:27017/job_portal
   PORT=5000
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   ```

2. Start the server:
   ```bash
   npm start
   ```

## Troubleshooting

### Connection Issues

**Error: "MongoServerError: bad auth"**
- Check your username and password in the connection string
- Make sure there are no special characters that need URL encoding

**Error: "MongoNetworkError: connection timeout"**
- Check your IP address is whitelisted in MongoDB Atlas
- Check your internet connection
- Verify the connection string is correct

**Error: "MongoParseError: Invalid connection string"**
- Make sure the connection string format is correct
- Check for any typos or missing parts
- Ensure the database name is included (e.g., `/job_portal`)

### URL Encoding Special Characters
If your password contains special characters, you need to URL encode them:
- `@` becomes `%40`
- `#` becomes `%23`
- `$` becomes `%24`
- `%` becomes `%25`
- etc.

Example:
```
Password: P@ssw0rd#123
Encoded: P%40ssw0rd%23123
```

### Verify Connection
You can verify your connection by:
1. Checking the server console for "MongoDB Connected" message
2. Creating a test job through the API
3. Checking your MongoDB Atlas dashboard to see if data appears

## Next Steps

Once connected:
1. Your application will automatically create collections (tables) when you first save data
2. You can view your data in MongoDB Atlas by clicking **"Browse Collections"**
3. You can also use MongoDB Compass (desktop app) to manage your database

## Security Best Practices

1. **Never commit `.env` file to Git** - It's already in `.gitignore`
2. **Use strong passwords** for database users
3. **Restrict IP access** in production (don't use 0.0.0.0/0)
4. **Rotate JWT secrets** regularly in production
5. **Use environment variables** for all sensitive data

## Need Help?

- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com/
- MongoDB University: https://university.mongodb.com/
- MongoDB Community Forums: https://developer.mongodb.com/community/forums/
