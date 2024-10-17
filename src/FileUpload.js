import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Box, VStack, Icon, Button, Text, Alert, AlertIcon, Input } from '@chakra-ui/react';
import { FaCloudUploadAlt } from 'react-icons/fa';

const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [uploadStatus, setUploadStatus] = useState(null);

    const onDrop = (acceptedFiles) => {
        console.log('Files selected:', acceptedFiles); // Log selected files
        setFiles(acceptedFiles); // Set files in state
    };

    const handleUpload = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setUploadStatus({ type: 'error', message: 'You must be logged in to upload files.' });
            return;
        }

        if (files.length === 0) {
            setUploadStatus({ type: 'error', message: 'Please select files to upload.' });
            return;
        }

        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append('file', file); // Append each file to FormData
            console.log(`Appending file[${index}]:`, file); // Log file details
        });

        try {
            const response = await axios.post('http://localhost:3000/api/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            setUploadStatus({ type: 'success', message: 'File(s) uploaded successfully!' });
            console.log('Upload response:', response.data); // Log response for debugging
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setUploadStatus({ type: 'error', message: 'Unauthorized. Please log in again.' });
                localStorage.removeItem('token');
            } else {
                setUploadStatus({ type: 'error', message: 'Failed to upload file(s).' });
                console.error('Upload error:', error.response || error.message); // Log error details
            }
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        console.log('Files selected via file input:', selectedFiles);
        setFiles(selectedFiles);
    };

    return (
        <Box p={6} maxW="500px" mx="auto" textAlign="center">
            {/* Drag-and-drop area */}
            <Box
                {...getRootProps()}
                p={6}
                border="2px dashed"
                borderColor={isDragActive ? 'teal.300' : 'gray.300'}
                borderRadius="md"
                cursor="pointer"
                bg={isDragActive ? 'teal.50' : 'gray.50'}
            >
                <input {...getInputProps()} />
                <VStack spacing={3}>
                    <Icon as={FaCloudUploadAlt} boxSize={12} color="teal.500" />
                    <Text fontSize="lg" color="gray.600">
                        {isDragActive ? "Drop files here..." : "Drag and drop files here or click to upload"}
                    </Text>
                </VStack>
            </Box>

            {/* Alternative File Input */}
            <Input
                type="file"
                multiple
                mt={4}
                onChange={handleFileChange} // Handle file selection via file input
            />

            {/* Upload button */}
            <Button
                mt={4}
                colorScheme="teal"
                onClick={handleUpload}
            >
                Upload Files
            </Button>

            {/* Upload status messages */}
            {uploadStatus && (
                <Alert status={uploadStatus.type} mt={4}>
                    <AlertIcon />
                    {uploadStatus.message}
                </Alert>
            )}
        </Box>
    );
};

export default FileUpload;
