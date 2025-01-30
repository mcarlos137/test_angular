export const REMOTE_FEED_SNAPSHOT = 'book_ui_1_snapshot';
export const REMOTEL_FEED_DELTA = 'book_ui_1';

export const REMOTE_XBT_PRODUCT_ID = 'PI_XBTUSD';
export const REMOTE_ETH_PRODUCT_ID = 'PI_ETHUSD';
export const LOCAL_BTC_PRODUCT_ID = 'binance.BTC-USDT';
export const LOCAL_ETH_PRODUCT_ID = 'binance.ETH-USDT';

export const REMOTE_XBT_CURRENCY_CODE = 'REMOTE XBTUSD';
export const REMOTE_ETH_CURRENCY_CODE = 'REMOTE ETHUSD';
export const LOCAL_BTC_CURRENCY_CODE = 'LOCAL BTC-USDT';
export const LOCAL_ETH_CURRENCY_CODE = 'LOCAL ETH-USDT';

export const PRODUCTS: { code: string; id: string, source: string }[] = [
  {
    id: REMOTE_XBT_PRODUCT_ID,
    code: REMOTE_XBT_CURRENCY_CODE,
    source: 'REMOTE'
  },
  {
    id: REMOTE_ETH_PRODUCT_ID,
    code: REMOTE_ETH_CURRENCY_CODE,
    source: 'REMOTE'
  },
  /*{
    id: LOCAL_BTC_PRODUCT_ID,
    code: LOCAL_BTC_CURRENCY_CODE,
    source: 'LOCAL'
  },*/
  {
    id: LOCAL_ETH_PRODUCT_ID,
    code: LOCAL_ETH_CURRENCY_CODE,
    source: 'LOCAL'
  },
];

export const TRANSLATION = {
  title: 'Order book',
  spread: 'Spread',
  total: 'Total',
  size: 'Size',
  price: 'Price',
  toggleFeed: 'Toggle feed',
  reconnect: 'Click to reconnect',
  paused: 'Paused due to inactivity',
  pair: 'Pair',
  availablePairs: 'Available pairs',
};