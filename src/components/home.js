import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, TextField } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      const data = response.data;
      setProducts(data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
    }
  };
  //Hàm thay đổi checkbox
  const handleCheckboxChange = async (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].buy = !updatedProducts[index].buy;
    setProducts(updatedProducts);

    if (!updatedProducts[index].buy) {
      try {
        const selectedItem = updatedProducts[index];
        const response = await axios.put(`http://localhost:5000/products/${selectedItem._id}`, selectedItem); // Thay đổi URL endpoint tùy thuộc vào API của bạn

        if (response.status === 200) {
          console.log('Cập nhật số lượng tồn thành công.');
        } else {
          console.log('Không tìm thấy mặt hàng hoặc không có thay đổi trong quá trình cập nhật.');
        }
      } catch (error) {
        console.error('Đã xảy ra lỗi trong quá trình cập nhật:', error);
      }
    }
  };

  // Hàm thay đổi sô lượng tồn
  const handleQuantityChange = (index, value) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = parseInt(value, 10);
    setProducts(updatedProducts);
  };
  //Hàm thay đổi giá
  const handlePriceChange = (index, value) => {
    const updatedProducts = [...products];
    updatedProducts[index].price = parseInt(value, 10);
    setProducts(updatedProducts);
  };

  // Calculate the total amount
  const getTotalAmount = () => {
    let total = 0;
    products.forEach((item) => {
      if (item.buy) {
        total += item.price * item.quantity;
      }
    });
    return total;
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
    }
  };
  

  const renderTableRows = () => {
    return products.map((item, index) => (
      <TableRow key={index}>
        <TableCell>
          <Checkbox checked={item.buy} onChange={() => handleCheckboxChange(index)} />
        </TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>
          <TextField
            type="number"
            value={item.quantity}
            disabled={!item.buy}
            onChange={(e) => handleQuantityChange(index, e.target.value)}
          />
        </TableCell>
        <TableCell>
          <TextField
            type="number"
            value={item.price}
            disabled={!item.buy}
            onChange={(e) => handlePriceChange(index, e.target.value)}
            VND
          />
        </TableCell>
        <TableCell>{item.price * item.quantity} vnđ</TableCell>
        <TableCell>
          <Link className='btn btn-danger'  onClick={() => deleteProduct(item._id)}>
            Xóa
          </Link>
        </TableCell>

      </TableRow>
    ));
  };

  return (
    <div>
      <TableContainer component={Paper} id="layoutSidenav_content">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Chọn</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Đơn giá</TableCell>
              <TableCell>Thành tiền</TableCell>
              <TableCell>Xóa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderTableRows()}
            <TableRow>
              <TableCell colSpan={6} style={{ backgroundColor: 'yellow' }}>
                Tổng Tiền: {getTotalAmount()} vnđ
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
