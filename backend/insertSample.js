import 'dotenv/config'
import mongoose from 'mongoose'
import orderModel from './models/orderModel.js'
import { connectDB } from './config/db.js'

const insertSampleOrders = async () => {
  await connectDB()
  const sampleOrders = [
    {
      userId: 'sampleUser1',
      items: [
        { name: 'Pizza', price: 10, quantity: 2 },
        { name: 'Burger', price: 5, quantity: 1 }
      ],
      amount: 25,
      address: {
        firstName: 'John',
        lastName: 'Doe',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        zipcode: '10001',
        phone: '123-456-7890'
      },
      status: 'Food Processing'
    },
    {
      userId: 'sampleUser2',
      items: [
        { name: 'Salad', price: 8, quantity: 1 },
        { name: 'Pasta', price: 12, quantity: 1 }
      ],
      amount: 20,
      address: {
        firstName: 'Jane',
        lastName: 'Smith',
        street: '456 Elm St',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        zipcode: '90210',
        phone: '987-654-3210'
      },
      status: 'Out for delivery'
    }
  ]

  try {
    await orderModel.insertMany(sampleOrders)
    console.log('Sample orders inserted')
  } catch (error) {
    console.log('Error inserting sample orders:', error)
  } finally {
    mongoose.connection.close()
  }
}

insertSampleOrders()