import React, { useState } from 'react';
import axios from 'axios';

import styles from './OrderBook.module.scss'

const OrderBook = () => {
  const [orderBook, setOrderBook] = useState(null);
  const [error, setError] = useState(null);

  const parseOrderBook = (text) => {

    const lines = text.split('\n');
    const bids = [];
    const asks = [];
  
    lines.forEach(line => {
      const parts = line.split(' ');
    //   console.log(parts);
      if (parts.length === 3) {
        const [type, price, quantity] = parts;
        if (type === '\tbid') {
          bids.push([price, quantity]);
        } else if (type === '\task') {
          asks.push([price, quantity]);
        }
      }
    });
  
    return { bids, asks };
  };
  

  const fetchOrderBook = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8081/orderbook', {
        "Symbol": "jasmyusdt"

      });

    //   console.log('Response data:', response.data);
      const text = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);

      const data = parseOrderBook(text);

    //   console.log(data);
      setOrderBook(data);
     


  
    } catch (err) {
      console.error('Error fetching order book:', err);
      setError(err);
    }
  };

  return (
   <div>
      <button onClick={fetchOrderBook}>Fetch Order Book</button>
      {error && <div>Error: {error.message}</div>}
      {orderBook ? (
        <div>
          <h2>Order Book</h2>
          <div className={styles.orderbook_flex}>
            <div>
                <h3>Bids</h3>
                <ul>
                {orderBook.bids && Array.isArray(orderBook.bids) ? (
                    orderBook.bids.map(([price, quantity], index) => (
                    <li key={index}>
                        Price: {price}, Quantity: {quantity}
                    </li>
                    ))
                ) : (
                    <li>No bids available</li>
                )}
                </ul>
            </div>
            <div>
                <h3>Asks</h3>
                <ul>
                {orderBook.asks && Array.isArray(orderBook.asks) ? (
                    orderBook.asks.map(([price, quantity], index) => (
                    <li key={index}>
                        Price: {price}, Quantity: {quantity}
                    </li>
                    ))
                ) : (
                    <li>No asks available</li>
                )}
                </ul>
            </div>

          </div>
        </div>
      ) : (
        <div>No data available. Click the button to fetch data.</div>
      )}
    </div>
);
};

export default OrderBook;
