import crypto from 'crypto';
import { MARVEL_API_BASE_URL, PAGE_SIZE } from '../config/apiConfig';

const publicKey = process.env.API_PUBLIC_KEY || '';
const privateKey = process.env.API_PRIVATE_KEY || '';

const generateHash = (timestamp: string) => {
  const stringToHash = timestamp + privateKey + publicKey;
  return crypto.createHash('md5').update(stringToHash).digest('hex');
};

/* https://developer.marvel.com/docs#!/public/getCreatorCollection_get_0 */
export const fetchMarvel = async <T>(
  endpoint: string,
  params: Record<string, string | number> = {}
) => {
  try {
    const ts = Date.now().toString();
    const hash = generateHash(ts);
    const queryParams = new URLSearchParams({
      ...Object.entries({ limit: PAGE_SIZE, ...params }).reduce(
        (acc, [key, value]) => {
          acc[key] = value.toString();
          return acc;
        },
        {} as Record<string, string>
      ),
      ts,
      apikey: publicKey,
      hash,
    });
    const url = `${MARVEL_API_BASE_URL}${endpoint}?${queryParams}`;
    return await fetch(url, {
      method: 'GET',
    }).then((response) =>
      response.status === 200 ? (response.json() as T) : null
    );
  } catch (error) {
    console.error('Error al consumir la API', error);
  }
};
