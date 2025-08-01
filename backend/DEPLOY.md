## Deployment

### Deploying to Netlify

1. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Initialize your site (from the backend directory):
   ```bash
   netlify init
   ```

4. Deploy to Netlify:
   ```bash
   netlify deploy
   ```

5. When ready for production:
   ```bash
   netlify deploy --prod
   ```

### Environment Variables

Set the following environment variables in your Netlify site settings:

- `NODE_ENV`: Set to 'production'

### Testing Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the Netlify dev server:
   ```bash
   netlify dev
   ```

   This will start the local development server with Netlify Functions support.

### API Endpoints

After deployment, your endpoints will be available at:

- GET `/.netlify/functions/intern` - Get intern details
- GET `/.netlify/functions/leaderboard` - Get leaderboard data

The redirects in netlify.toml will make these available at:

- GET `/api/intern`
- GET `/api/leaderboard`

### Frontend Integration

Update your frontend environment variables to point to your Netlify deployment:

```env
VITE_API_BASE_URL=https://your-netlify-site.netlify.app/api
```
