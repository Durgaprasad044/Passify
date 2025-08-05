import React from 'react';
import { QrCode, Camera, Upload } from 'lucide-react';
import Modal from './Modal';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess?: (data: string) => void;
}

const QRScannerModal: React.FC<QRScannerModalProps> = ({
  isOpen,
  onClose,
  onScanSuccess
}) => {
  const handleScanSuccess = (data: string) => {
    onScanSuccess?.(data);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="QR Code Scanner"
      maxWidth="max-w-lg"
    >
      <div className="space-y-6">
        {/* Scanner Area */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
          <QrCode size={64} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Position the QR code within the frame to scan
          </p>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8">
            <div className="text-gray-400 text-sm">
              Camera preview would appear here
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            className="btn btn-secondary flex items-center justify-center space-x-2"
            onClick={() => {
              // Simulate camera scan
              setTimeout(() => {
                handleScanSuccess('DEMO_QR_CODE_DATA');
              }, 1000);
            }}
          >
            <Camera size={16} />
            <span>Use Camera</span>
          </button>
          
          <button
            className="btn btn-secondary flex items-center justify-center space-x-2"
            onClick={() => {
              // Simulate file upload
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.onchange = () => {
                setTimeout(() => {
                  handleScanSuccess('DEMO_UPLOADED_QR_CODE');
                }, 500);
              };
              input.click();
            }}
          >
            <Upload size={16} />
            <span>Upload Image</span>
          </button>
        </div>

        {/* Instructions */}
        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
          <p><strong>Instructions:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Hold your device steady</li>
            <li>Ensure good lighting</li>
            <li>Keep the QR code within the frame</li>
            <li>Wait for automatic detection</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default QRScannerModal;