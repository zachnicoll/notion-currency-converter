import {config} from 'dotenv';

const configVars = ['NOTION_KEY', 'NOTION_DB_ID', 'OPEN_EXR_APP_ID'];

function checkEnv(): void {
  // Load .env
  config();

  // Make sure we're not missing any env vars
  for (const configVar of configVars) {
    if (!process.env[configVar])
      throw new Error(`Missing config variable ${configVar}!`);
  }
}

checkEnv();

export default process.env;
