import React, { useRef, useEffect, useState } from 'react';

interface DownloadCardProps {
  image: string;
  userName: string;
  thankYouMessage: string;
  messageFontSize: number;
  messageFontColor: string;
  nameFontSize: number;
  nameFontColor: string;
}

const DownloadCard: React.FC<DownloadCardProps> = ({
  image,
  userName,
  thankYouMessage,
  messageFontSize,
  messageFontColor,
  nameFontSize,
  nameFontColor
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      canvas.width = 800;
      canvas.height = 1000;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw thank you message
      ctx.fillStyle = messageFontColor;
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.font = `bold ${messageFontSize}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillText(thankYouMessage, canvas.width / 2, 80);
      ctx.strokeText(thankYouMessage, canvas.width / 2, 80);

      // Draw user name
      ctx.fillStyle = nameFontColor;
      ctx.font = `${nameFontSize}px Arial`;
      ctx.fillText(userName, canvas.width / 2, canvas.height - 40);
      ctx.strokeText(userName, canvas.width / 2, canvas.height - 40);

      setIsImageLoaded(true);
    };
    img.src = image;
  }, [image, userName, thankYouMessage, messageFontSize, messageFontColor, nameFontSize, nameFontColor]);

  const handleDownload = () => {
    if (!isImageLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `${thankYouMessage.replace(/\s+/g, '_')}_${userName.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="my-8 text-center">
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <button
        onClick={handleDownload}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow-md hover:shadow-lg"
        disabled={!isImageLoaded}
      >
        Download Your Card
      </button>
    </div>
  );
};

export default DownloadCard;