# Deployment Guide

This repo contains two frontend apps and one backend app:
- `frontEnd/` - customer-facing website
- `admin/` - admin dashboard
- `backend/` - Express API server

## Railway - Backend
1. Create a new Railway project.
2. Set the project root to `backend`.
3. Set `Start Command` to:
   - `npm start`
4. Add environment variables in Railway:
   - `MONGODB_URI` = your MongoDB connection string
   - `JWT_SECRET` = a strong secret string
5. Railway will provide a public backend URL like `https://your-backend.up.railway.app`.

## Vercel - Frontend
1. Create a new Vercel project.
2. Select the `frontEnd` directory as the project root.
3. Set the build command to:
   - `npm run build`
4. Set the output directory to:
   - `dist`
5. Add environment variable in Vercel:
   - `VITE_API_URL` = `https://your-backend.up.railway.app`
6. Deploy.

## Vercel - Admin (optional)
1. Create a separate Vercel project for the `admin` folder.
2. Use the same build command and output dir.
3. Set `VITE_API_URL` to your Railway backend URL.

## Local development
- Backend: `cd backend && npm install && npm run dev`
- Frontend: `cd frontEnd && npm install && npm run dev`
- Admin: `cd admin && npm install && npm run dev`

## Notes
- The frontend apps now read `VITE_API_URL` from environment.
- If you use `localhost` during development, leave `VITE_API_URL=http://localhost:4000`.
- For production, point `VITE_API_URL` to Railway backend.
