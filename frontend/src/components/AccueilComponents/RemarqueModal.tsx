import React from "react";
import ReactStars from "react-rating-stars-component";
import { Modal } from "antd";

interface RemarquesProps {
  open: boolean;
  onCancel: () => void;
}
export const RemarqueModal: React.FC<RemarquesProps> = ({ open, onCancel }) => {
  return (
    <Modal open={open} footer={null} onCancel={onCancel}>
      {/* <ReactStars count={5} size={24} activeColor="#ffd700" /> */}
    </Modal>
  );
};
