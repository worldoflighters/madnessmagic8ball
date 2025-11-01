# Linking Your Magic 8 Ball App to Farcaster

Your Magic 8 Ball mini app is now deployed! Follow these steps to link it to your Farcaster account and make it available as a mini app.

## Step 1: Get Your Deployed URL

1. Go to your Vercel dashboard
2. Copy your deployment URL (it looks like: `https://magic-8-ball-app-xxx.vercel.app`)

## Step 2: Update the Manifest File

The manifest file is already created at `public/.well-known/farcaster.json`. You just need to update the domain placeholder:

1. Find `"homepage": "https://your-domain.com"` in the manifest
2. Replace `your-domain.com` with your actual Vercel domain
3. Also update the image URLs to use your actual domain

Example:
\`\`\`json
{
  "homepage": "https://magic-8-ball-app-xxx.vercel.app",
  "iconUrl": "https://magic-8-ball-app-xxx.vercel.app/placeholder-logo.svg",
  ...
}
\`\`\`

## Step 3: Sign Your Manifest with Base

You have two options:

### Option A: Using Base Build Tool (Recommended)

1. Go to **[Base Developer Dashboard](https://www.base.org/ecosystem)**
2. Navigate to **Preview → Account Association**
3. Enter your mini app domain: `https://your-deployed-url.vercel.app`
4. Click **"Submit"** then **"Verify"**
5. Click **"Sign"** and follow the prompts to sign with your wallet
6. Copy the generated `accountAssociation` object
7. Add it to your `farcaster.json` file:

\`\`\`json
{
  "name": "Magic 8 Ball",
  "description": "...",
  "accountAssociation": {
    "header": "...",
    "payload": "...",
    "signature": "..."
  }
}
\`\`\`

8. Redeploy to Vercel

### Option B: Using CLI

1. Run in your project:
   \`\`\`bash
   npx create-onchain --manifest
   \`\`\`

2. Sign with your Farcaster custody wallet

3. Copy the environment variables and add them to your Vercel deployment

## Step 4: Verify Your Manifest

Once deployed, verify your manifest is accessible at:
\`\`\`
https://your-domain.com/.well-known/farcaster.json
\`\`\`

Visit this URL in your browser - you should see your manifest JSON.

## Step 5: Share Your App

Your app is now registered! Share the URL in Warpcast:
- Paste your deployment URL as a frame in a cast
- Users can click and interact with your Magic 8 Ball
- They can share their predictions with other users

## Testing

Before going live:
- Set `"noindex": true` in your manifest to prevent search engine indexing
- Test in Warpcast by sharing your URL
- Once verified, remove `noindex` and redeploy

## Troubleshooting

**"Origins don't match" error**: Make sure the domain in your manifest exactly matches your deployment URL.

**Manifest not found**: Verify the file is at `/.well-known/farcaster.json` and visit the URL directly to confirm it's publicly accessible.

**Account Association failed**: Make sure you're using the exact domain from your Vercel deployment URL.
