# How to Deploy to Render

This project is configured for **Render Blueprints**, which allows you to deploy both the Frontend and Backend automatically.

## Prerequisites
1. Push your latest code to GitHub.
2. Sign up or Log in to [Render.com](https://render.com).

## Deployment Steps

### Method 1: Automatic Deployment (Blueprints) - Recommended
This method uses the `render.yaml` file to set up everything for you.

1. Go to your **Render Dashboard**.
2. Click **New +** and select **Blueprint**.
3. Connect your **GitHub Account** and select your repository (`online-job-portal`).
4. Give your blueprint a name (e.g., `job-portal`).
5. Click **Apply**.
6. Render will detect the `render.yaml` file and ask for Environment Variables.

### Environment Variables
You will need to provide these values in the Render Dashboard when prompted:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your MongoDB Connection String (e.g., `mongodb+srv://...`) |
| `JWT_SECRET` | A secure random string (e.g., `mysecretkey123`) |

>**Note:** For `MONGODB_URI`, ensure you use the **Standard Connection String** (starts with `mongodb://` or has `0.0.0.0/0` whitelisted) if you encounter IP issues, as Render servers have dynamic IPs.

### Method 2: Manual Deployment
If Blueprints don't work, you can deploy services manually:

**1. Backend (Web Service)**
*   **Build Command:** `npm install`
*   **Start Command:** `node index.js`
*   **Root Directory:** `server`
*   **Environment Variables:** Add `MONGODB_URI`, `JWT_SECRET`, and `PORT` (set to `10000`).

**2. Frontend (Static Site)**
*   **Build Command:** `npm install && npm run build`
*   **Publish Directory:** `dist/client/browser`
*   **Root Directory:** `client`
*   **Rewrite Rules:** Add a Rewrite Rule: `Source: /*`, `Destination: /index.html`.

## After Deployment
1. Get your **Backend URL** (e.g., `https://job-portal-backend.onrender.com`).
2. Update your **Frontend** code to point to this URL:
    *   Open `client/src/environments/environment.prod.ts`.
    *   Change `apiUrl` to your new Backend URL.
    *   Push changes to GitHub.
    *   Render will auto-deploy the Frontend update.
