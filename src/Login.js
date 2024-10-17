import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated hook
import axios from 'axios';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, Text } from '@chakra-ui/react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Updated hook

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                username,
                password,
            });
            console.log('Login response:', response.data); // Log the response to confirm token presence

            // Store the token in local storage
            localStorage.setItem('token', response.data.data.access_token);
            navigate('/'); // Use navigate to redirect
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <VStack spacing={4} align="center" mt="10%">
            <Heading>Login</Heading>
            <Box width="300px">
                <form onSubmit={handleLogin}>
                    <FormControl id="username" mb={3}>
                        <FormLabel>Username</FormLabel>
                        <Input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl id="password" mb={3}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </FormControl>
                    {error && <Text color="red.500">{error}</Text>}
                    <Button type="submit" colorScheme="teal" width="100%">
                        Login
                    </Button>
                </form>
            </Box>
        </VStack>
    );
};

export default Login;
