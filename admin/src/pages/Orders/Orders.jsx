import React, { useEffect, useState, useCallback } from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = useCallback(async () => {
    const response = await axios.get(`${url}/api/order/list`)
    console.log('Response:', response.data)
    if (response.data.success) {
      setOrders(response.data.data)
      console.log('Orders:', response.data.data)
    } else {
      toast.error('Error fetching orders')
    }
  }, [url])

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders()
      toast.success('Status updated')
    } else {
      toast.error('Error updating status')
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [fetchAllOrders])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <button onClick={fetchAllOrders} style={{marginBottom: '20px', padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px'}}>Refresh Orders</button>
      <div className="order-list">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="order-table">
            <div className="order-table-header">
              <b>Order ID</b>
              <b>Customer</b>
              <b>Items</b>
              <b>Amount</b>
              <b>Status</b>
              <b>Action</b>
            </div>
            {orders.map((order, index) => (
              <div key={index} className='order-table-row'>
                <p>#{order._id?.slice(-6)}</p>
                <div>
                  <p>{order.address?.firstName} {order.address?.lastName}</p>
                  <p>{order.address?.phone}</p>
                </div>
                <p>{order.items.length} items</p>
                <p>${order.amount}</p>
                <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <button onClick={() => alert(`Order details: ${JSON.stringify(order, null, 2)}`)}>View Details</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders