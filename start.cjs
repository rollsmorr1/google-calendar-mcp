const fs = require('fs');
const path = require('path');

// Define the path where the credentials file should be written
const filePath = path.join(__dirname, 'gcp-oauth.keys.json');

// Retrieve the JSON credentials from the environment variable
const credsContent = process.env.GOOGLE_OAUTH_CONTENT;

if (!credsContent) {
  console.error('Error: GOOGLE_OAUTH_CONTENT environment variable is not set.');
  process.exit(1);
}

// Write the credentials to gcp-oauth.keys.json
try {
  fs.writeFileSync(filePath, credsContent);
  console.log('Google OAuth credentials file created at:', filePath);
} catch (error) {
  console.error('Error writing credentials file:', error);
  process.exit(1);
}

// Now require your MCP server's main entry point to start the server.
// (Assuming your main server file is in build/index.js)
(async () => {
  await import('./build/index.js');
})();
