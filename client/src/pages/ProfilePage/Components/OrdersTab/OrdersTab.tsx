import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import "./OrdersTab.css"

interface Order {
  id: number;
  product_name: string;
  quantity: number;
  unit: string;
  total_amount: number;
  status: "delivered" | "processing" | "cancelled" | "pending";
  created_at: string;
}

interface Props {
  orders: Order[];
}

const OrdersTab: React.FC<Props> = ({ orders }) => (
  <div className="pr-content-box">
    <h3>My orders <span className="pr-section-count">({orders.length})</span></h3>
    {orders.length === 0 ? (
      <div className="pr-empty-state">
        <FaShoppingBag size={32} color="#ccc" />
        <p>No orders yet.</p>
      </div>
    ) : (
      <table className="pr-orders-table">
        <thead>
          <tr>
            <th>#</th><th>Product</th><th>Quantity</th>
            <th>Amount</th><th>Date</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.product_name}</td>
              <td>{order.quantity} {order.unit}</td>
              <td>{order.total_amount.toLocaleString()} FCFA</td>
              <td>{new Date(order.created_at).toLocaleDateString()}</td>
              <td>
                <span className={`pr-order-status pr-status-${order.status}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

export default OrdersTab;