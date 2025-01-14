/* ++++++++++ IMPORTS ++++++++++ */
import React, { useCallback, useState } from 'react';

/* ++++++++++ DROPZONE ++++++++++ */
import { useDropzone } from 'react-dropzone';

/* ++++++++++ MATERIAL-UI ++++++++++ */
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

/* +++++++++ AXIOS ++++++++++ */
import axios from 'axios';

const DropField: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    
    // Create preview URL for the image
    const previewUrl = URL.createObjectURL(selectedFile);
    setPreview(previewUrl);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false
  });

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const handleContinue = async () => {
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
    
        // CHANGE TO BACKEND URL WHEN WE HAVE
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Upload successful:', response.data);
      // Handle successful upload (e.g., navigate to results page)
    } catch (error) {
      console.error('Upload failed:', error);
      // Handle error (show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[75%] max-w-[1000px] h-[33%]">
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-solid rounded-lg text-center cursor-pointer h-full
            ${isDragActive || 'hover:border-[#66b2b2] hover:bg-[#f0f9f9]'} 
            ${isDragActive ? 'border-[#66b2b2] bg-[#f0f9f9]' : 'border-gray-300'}`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="space-y-4">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-h-48 mx-auto"
            />
            <p className="text-sm text-gray-500">Click or drag to change image</p>
          </div>
        ) : (
          <div className="space-y-2 h-full  flex flex-col items-center text-center justify-center">
            <p className="text-lg">Drag and drop your pet image here</p>
            <p className="text-sm text-gray-500">or click to select a file</p>
          </div>
        )}
      </div>

      {file && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <TableContainer component={Paper} elevation={0}>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell component="th" sx={{ fontWeight: 'bold', width: '30%' }}>
                    File Name
                  </TableCell>
                  <TableCell>{file.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" sx={{ fontWeight: 'bold' }}>
                    Size
                  </TableCell>
                  <TableCell>{formatFileSize(file.size)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" sx={{ fontWeight: 'bold' }}>
                    Type
                  </TableCell>
                  <TableCell>{file.type}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          
          <button
            onClick={handleContinue}
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md text-white
              ${isLoading 
                ? 'bg-[#b2d8d8] cursor-not-allowed' 
                : 'bg-[#66b2b2] hover:bg-[#539999]'
              } transition-colors`}
          >
            {isLoading ? 'Processing...' : 'Continue'}
          </button>
        </div>
      )}
    </div>
  );
};

export default DropField;