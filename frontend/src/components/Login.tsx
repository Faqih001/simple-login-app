import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import axios from 'axios';

// Login component for user login and validation
const Login = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Calculate age from date of birth string input and return age in years 
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  // Handle form submission and validation for user login and validation 
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const age = calculateAge(dob);

    // Validate age between 18 and 50 years old 
    if (age < 18 || age > 50) {
      setError('Age must be between 18 and 50.');
      return;
    }

    // Send login request to backend server with user name and password data 
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        name,
        password,
      });

      if (response.status === 200) {
        window.location.href = `/home?name=${name}&age=${age}`;
      }
    } catch (err) {
      setError('Authentication failed. Please check your credentials.');
    }
  };

  // Render login form with user name, date of birth, and password input fields and error message if any 
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      {error && (
        <Typography color="error" align="center" gutterBottom>
          {error}
        </Typography>
      )}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
        }}
      >
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Date of Birth"
          type="date"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;

