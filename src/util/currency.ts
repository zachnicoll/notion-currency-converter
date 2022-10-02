import config from './config';
import axios from 'axios';

const appId = config.OPEN_EXR_APP_ID;

const openExchangeAxiosInstance = new axios.Axios({
  baseURL: 'https://openexchangerates.org/api',
});

/**
 * Fetches the current currency rates information from openexchangerates.org.
 * Currencies are returned relative to USD; this must be taken into account
 * when converting later.
 */
export async function getRates(): Promise<Rates> {
  const res = await openExchangeAxiosInstance.get<string>(
    `/latest.json?app_id=${appId}`
  );

  const data = JSON.parse(res.data) as API.OpenExrResponse;
  const rates = data.rates;

  return rates;
}
