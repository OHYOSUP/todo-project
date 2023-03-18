const PAPRIKA_URL = "https://api.coinpaprika.com/v1";
const NOMAD_URL = "https://ohlcv-api.nomadcoders.workers.dev";

export async function fetchCoins() {
  return await fetch(`${PAPRIKA_URL}/coins`, {})
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export function fetchCoininfo(coinId: string) {
  return fetch(`${PAPRIKA_URL}/coins/${coinId}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
export function fetchCoinTickers(coinId: string) {
  return fetch(`${PAPRIKA_URL}/tickers/${coinId}`).then((res) => res.json());
}

export function fetchCoinHistory(coinId: string) {
  return fetch(
    `${NOMAD_URL}?coinId=${coinId}`
  ).then((res) => res.json())
}
