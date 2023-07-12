require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const { ObjectId } = require('mongoose').Types;

const app = express();
app.use(express.json());
app.use(cors());

const uri = process.env.MONGODB_URI;

const dbName1 = 'LogAdmin';
const dbName2 = process.env.MONGODB_DBNAME;
const dbName3 = process.env.MONGODB_SECOND;

const db1 = mongoose.createConnection(`${uri}${dbName1}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
db1.on('error', console.error.bind(console, `Lỗi kết nối tới cơ sở dữ liệu ${dbName1}:`));
db1.once('open', () => {
  console.log(`Đã kết nối tới cơ sở dữ liệu: ${dbName1}`);
});

const db2 = mongoose.createConnection(`${uri}${dbName2}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
db2.on('error', console.error.bind(console, `Lỗi kết nối tới cơ sở dữ liệu ${dbName2}:`));
db2.once('open', () => {
  console.log(`Đã kết nối tới cơ sở dữ liệu: ${dbName2}`);
});

const db3 = mongoose.createConnection(`${uri}${dbName3}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
db3.on('error', console.error.bind(console, `Lỗi kết nối tới cơ sở dữ liệu ${dbName3}:`));
db3.once('open', () => {
  console.log(`Đã kết nối tới cơ sở dữ liệu: ${dbName3}`);
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
});
const Product = db2.model('Product', productSchema);

app.get('/products', async (req, res) => {
  try {
    // Lấy danh sách sản phẩm từ collection "products"
    const products = await Product.find();

    // Trả về danh sách sản phẩm cho máy khách React
    res.json(products);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    res.status(500).json({ error: 'Lỗi khi lấy danh sách sản phẩm' });
  }
});

app.post('/products/add', async (req, res) => {
  try {
    const { name, price, quantity, Img, type } = req.body;
    const product = await Product.create({ name, price, quantity, Img, type });
    res.status(201).json(product);
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm:', error);
    res.status(500).json({ error: 'Lỗi khi thêm sản phẩm' });
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    const product = await Product.findByIdAndUpdate(id, { name, price, quantity }, { new: true });
    res.json(product);
  } catch (error) {
    console.error('Lỗi khi cập nhật sản phẩm:', error);
    res.status(500).json({ error: 'Lỗi khi cập nhật sản phẩm' });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Đã xóa sản phẩm thành công' });
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error);
    res.status(500).json({ error: 'Lỗi khi xóa sản phẩm' });
  }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  } 
});
const User = db3.model('User', userSchema, 'register');

app.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    // Trả về danh sách sản phẩm cho máy khách React
    res.json(users);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách user:', error);
    res.status(500).json({ error: 'Lỗi khi lấy danh sách user' });
  }
});

app.delete('/users/delete', async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user', error);
    res.status(500).json({ error: 'Error deleting user' });
  }
});

// Khởi chạy server
app.listen(5000, () => {
  console.log('Đã khởi động server');
});
