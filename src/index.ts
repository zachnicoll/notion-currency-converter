import {Cashify} from 'cashify';
import {addCurrencyRow, deleteBlock, getAllDBRows} from './util/notion';
import {getRates} from './util/currency';

const WANTED_CURRENCIES = ['JPY', 'EUR', 'USD'];

const deleteExistingCurrencyRows = async (): Promise<void> => {
  // Get rows from DB in Notion
  const existingRows = await getAllDBRows();

  // Extract Block IDs
  const blockIDs = existingRows.map(row => row.id);

  // Delete all Blocks with given IDs
  const deleteBlockOperations = blockIDs.map(deleteBlock);
  await Promise.all(deleteBlockOperations);
};

const createCurrencyConversionRows = async (rates: Rates): Promise<void> => {
  const cashify = new Cashify({rates});

  // Filter out currencies we're not interested in
  const wantedCurrencies = Object.keys(rates).filter(symbol =>
    WANTED_CURRENCIES.includes(symbol)
  );

  const addCurrencyOperations = wantedCurrencies.map(async symbol => {
    const symbolToAUD = cashify.convert(1, {
      from: symbol,
      to: 'AUD',
      base: 'USD',
    });

    const AUDToSymbol = cashify.convert(1, {
      from: 'AUD',
      to: symbol,
      base: 'USD',
    });

    // Add a row to the DB in Notion with currency conversion info
    await addCurrencyRow(symbol, symbolToAUD, AUDToSymbol);
  });

  await Promise.all(addCurrencyOperations);
};

/**
 * Program entry point.
 *
 * Deletes all rows from the given Notion DB, then replaces
 * them with currency conversion data.
 */
const main = async (): Promise<void> => {
  await deleteExistingCurrencyRows();

  const rates = await getRates();
  await createCurrencyConversionRows(rates);
};

main();
