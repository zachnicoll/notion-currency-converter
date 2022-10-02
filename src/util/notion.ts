import {Client} from '@notionhq/client';
import {QueryDatabaseResponse} from '@notionhq/client/build/src/api-endpoints';
import config from './config';

const notionClient = new Client({auth: config.NOTION_KEY});
const databaseId = config.NOTION_DB_ID;

export const addCurrencyRow = async (
  symbol: string,
  symbolToAUD: number,
  AUDToSymbol: number
): Promise<void> => {
  await notionClient.pages.create({
    parent: {database_id: databaseId},
    properties: {
      Symbol: {
        title: [
          {
            text: {
              content: symbol,
            },
          },
        ],
      },
      'Symbol To AUD': {
        number: symbolToAUD,
      },
      'AUD To Symbol': {
        number: AUDToSymbol,
      },
    },
  });
};

export const getAllDBRows = async (): Promise<
  QueryDatabaseResponse['results']
> => {
  const response = await notionClient.databases.query({
    database_id: databaseId,
  });
  return response.results;
};

export const deleteBlock = async (id: string): Promise<void> => {
  await notionClient.blocks.delete({block_id: id});
};
