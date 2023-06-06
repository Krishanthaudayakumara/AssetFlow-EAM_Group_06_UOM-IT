import React from 'react';
import { Alert } from 'react-bootstrap';

interface DeleteErrorProps {
    errorMessage: string | null;
    onResetError: () => void;
  }
  
  const DeleteError: React.FC<DeleteErrorProps> = ({ errorMessage, onResetError }) => {
    if (!errorMessage) {
      return null;
    }
  
    return (
      <Alert variant="danger" onClose={onResetError} dismissible style={{ marginLeft: '60px' }}>
        {errorMessage}
      </Alert>
    );
  };
  
  export default DeleteError;
  
