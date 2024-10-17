const Order = require('../modules/ordermodule');

const createOrder = async (data) => {
  const { userId, items, totalAmount } = data; 
  const newOrder = new Order({ userId, items, totalAmount });
  try {
    const savedOrder = await newOrder.save();
    return savedOrder;
  } catch (error) {
    throw new Error(error.message); 
  }
};

const getAllOrders = async () => {
  try {
    return await Order.find().populate('userId', 'name');
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateOrder = async (id, data) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, data, { new: true }).populate('userId', 'name');
    if (!updatedOrder) throw new Error('Order not found');
    return updatedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteOrder = async (id) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) throw new Error('Order not found');
    return { message: 'Order deleted successfully' };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createOrder, getAllOrders, updateOrder, deleteOrder };
