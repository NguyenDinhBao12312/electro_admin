import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
const AddProduct = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [Img, setImage] = useState(null);
  const [type, setType] = useState('');

  const handleAddProduct = () => {
    const newProduct = {
      name: name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      Img: Img,
      type: type,
    };
  
    axios
      .post('http://localhost:5000/products/add', newProduct)
      .then((response) => {
        // Gọi hàm onAddProduct khi sản phẩm được thêm thành công
        onAddProduct(response.data);
        toast.success('Sản phẩm đã được thêm thành công.');
      })
      .catch((error) => {
        console.log(error);
      });
  
    // Đặt lại các trường nhập liệu về giá trị ban đầu
    setName('');
    setPrice('');
    setQuantity('');
    setImage(null);
    setType('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div id="layoutSidenav_content">
      <h2>Tạo sản phẩm mới</h2>
      <TextField
        label="Tên sản phẩm"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Đơn giá"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="number"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Số lượng tồn"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        type="number"
        fullWidth
        margin="normal"
      />
      <input type="file" onChange={handleImageChange} />
      <TextField
        label="Kiểu"
        value={type}
        onChange={(e) => setType(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddProduct}>
        Thêm
      </Button>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
