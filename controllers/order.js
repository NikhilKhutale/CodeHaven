import { db } from "../db.js";

export const addOrders = (req, res) => {
  const q = `UPDATE orders_table SET payment_status = ? WHERE order_id =?`;
  db.query(q, [req.body.payment_status, req.body.orderId], (err, data) => {
    if (err) {
      return res.status(500).json(err)
    } else {
      return res.status(200).json("Status updated successfully")
    }
  })
}


export const userOrders = (req, res) => {

  const user_id = req.params.user_id;

  const orderQuery = 'SELECT * FROM order_table WHERE user_id = ?';
  db.query(orderQuery, [user_id], (err, orders) => {
    if (err) {
      return;
    }

    let counter = 0;

    if (orders.length > 0) {
      orders.forEach((order, index) => {
        const orderItemsQuery = 'SELECT * FROM order_items WHERE order_id = ?';
        db.query(orderItemsQuery, [order.order_id], (err, orderItems) => {
          if (!err) {
            const promises = orderItems.map((orderItem) => {
              return new Promise((resolve, reject) => {
                const productQuery = 'SELECT * FROM products_table WHERE id = ?';
                db.query(productQuery, [orderItem.product_id], (err, product) => {
                  if (!err) {
                    orderItem.product = product[0];
                    resolve();
                  } else {
                    reject(err);
                  }
                });
              });
            });

            Promise.all(promises)
              .then(() => {
                orders[index].order_items = orderItems;
                counter++;

                if (counter === orders.length) {
                  return res.status(200).json(orders);
                }
              })
              .catch((error) => {
                return
              });
          } else {
            return
          }
        });
      })
    } else {
      return res.status(200).json([])
    };
  });
}

export const placeOrder = async (req, res) => {

  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const orderTrackingNumber = `ORDER-${timestamp}-${randomString}`;

  const { user_id, cart, cartTotal, paymentOption, addData, shippingMethod, coupon } = req.body;

  const createOrderQuery = 'INSERT INTO order_table (user_id, total_amount, status, payment_method, shipping_address, shipping_method, tracking_number, coupon_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const orderValues = [!user_id ? 0 : user_id, cartTotal, 'processing', paymentOption.paymentOption, JSON.stringify(addData), shippingMethod, orderTrackingNumber, coupon];

  db.query(createOrderQuery, orderValues, (err, data) => {
    if (err) {
      console.log(err);

      return res.status(500).json({ error: 'Failed to create order' });
    }
    const orderId = data.insertId;

    const createOrderItemsQuery = 'INSERT INTO order_items (order_id, product_id, quantity, price, size, color) VALUES (?, ?, ?, ?, ?, ?)';
    for (const item of cart) {
      const { id, quantity, currPrice, size, color } = item;
      const orderItemValues = [orderId, id, quantity, currPrice, size, color];

      db.query(createOrderItemsQuery, orderItemValues, (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'Failed to create order' });
        }
      });
    }
  });

  return res.status(201).json({ orderTrackingNumber });
}


export const adminOrders = (req, res) => {

  const user_id = req.params.user_id;

  const orderQuery = 'SELECT * FROM order_table';
  db.query(orderQuery, [user_id], (err, orders) => {
    if (err) {
      return;
    }

    let counter = 0;

    orders.forEach((order, index) => {
      const orderItemsQuery = 'SELECT * FROM order_items WHERE order_id = ?';
      db.query(orderItemsQuery, [order.order_id], (err, orderItems) => {
        if (!err) {
          const promises = orderItems.map((orderItem) => {
            return new Promise((resolve, reject) => {
              const productQuery = 'SELECT * FROM products_table WHERE id = ?';
              db.query(productQuery, [orderItem.product_id], (err, product) => {
                if (!err) {
                  orderItem.product = product[0];
                  resolve();
                } else {
                  reject(err);
                }
              });
            });
          });

          Promise.all(promises)
            .then(() => {
              orders[index].order_items = orderItems;

              const userQuery = 'SELECT fname, lname, email, mobileNo FROM users_table WHERE id = ?';
              db.query(userQuery, [order.user_id], (err, user) => {
                if (!err) {
                  orders[index].user = user[0];

                  counter++;
                  if (counter === orders.length) {
                    return res.status(200).json(orders);
                  }
                } else {
                  console.log(err);
                }
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log(err);
        }
      });
    });
  });
};