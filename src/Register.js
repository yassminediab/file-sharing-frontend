import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import axios from 'axios';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, Text } from '@chakra-ui/react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Use useNavigate

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/auth/register', {
                username,
                password,
            });
            navigate('/login'); // Redirect to login after successful registration
        } catch (error) {
            setError('Registration failed. Try again.');
        }
    };

    return (
        <VStack spacing={4} align="center" mt="10%">
            <Heading>Register</Heading>
            <Box width="300px">
                <form onSubmit={handleRegister}>
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
                        Register
                    </Button>
                </form>
            </Box>
        </VStack>
    );
};

export default Register;
