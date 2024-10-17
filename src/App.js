import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Login from './Login';
import Register from './Register';
import FileUpload from './FileUpload';

function App() {
    return (
        <ChakraProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<FileUpload />} />
                </Routes>
            </Router>
        </ChakraProvider>
    );
}

export default App;
