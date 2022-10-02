declare namespace NodeJS {
  export interface ProcessEnv {
    NOTION_KEY: string;
    NOTION_DB_ID: string;
    OPEN_EXR_APP_ID: string;
  }
}

declare namespace API {
  export type OpenExrResponse = {
    base: string;
    rates: Rates;
  };
}

type Rates = Record<string, number>;

interface Currency {
  symbol: string;
  value?: number;
}

interface CurrencyConversionPair {
  from: Currency;
  to: Currency;
}
