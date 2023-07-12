import React, { useState } from 'react';
import { Avatar, Grid, Paper, TextField } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (alert()) {
      axios
        .get('https://data.mongodb-api.com/app/data-xwgpf/endpoint/admin/login', { email, password })
        .then((resp) => {
          if (resp.data.length === 0) {
            toast.error('Please Enter valid email');
          } else {
            const userData = resp.data[0]; // Truy cập vào phần tử đầu tiên trong mảng
            toast.success('Success');
            localStorage.setItem('token', userData.token);
            localStorage.setItem('name', userData.name); // Lưu tên người dùng vào localStorage
            navigate('/');
          }
        })
        .catch((err) => {
          toast.error('Login ' + err.message);
        });
    }
  };

  const alert = () => {
    let result = true;
    if (email === '' || email === null) {
      result = false;
      toast.warn('Please enter email', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (password === '' || password === null) {
      result = false;
      toast.warn('Please enter Password', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    return result;
  };

  const paperStyle = { padding: 20, height: '70vh', width: 300, margin: '20px auto' };
  const avatarStyle = { backgroundColor: 'aqua' };
  const top = { marginTop: '20px' };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Admin</h2>
        </Grid>
        <Box component='form' noValidate sx={{ mt: 1 }} name='form1' id='form1' method='post'>
          <TextField
            label='email'
            placeholder='Enter email'
            variant='standard'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            fullWidth
            required
          />
          <TextField
            label='password'
            placeholder='Enter password'
            variant='standard'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            fullWidth
            required
          />
          <ToastContainer />
          <Button type='submit' style={top} variant='outlined' onClick={submit} fullWidth>
            Login
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
};

export default LogAdmin;
