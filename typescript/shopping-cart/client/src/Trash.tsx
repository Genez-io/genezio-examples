import React, { MouseEventHandler } from 'react';
import { FaTrash } from 'react-icons/fa';

interface DeleteButtonProps {
  onClick: MouseEventHandler;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <button className="delete-button" onClick={onClick}>
      <FaTrash className="trash-icon" />
    </button>
  );
};

export default DeleteButton;
