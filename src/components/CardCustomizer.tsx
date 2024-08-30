import React from 'react';

interface CardCustomizerProps {
  image: string;
  userName: string;
  thankYouMessage: string;
  onNameChange: (name: string) => void;
  onMessageChange: (message: string) => void;
  messageFontSize: number;
  messageFontColor: string;
  nameFontSize: number;
  nameFontColor: string;
  onMessageFontSizeChange: (size: number) => void;
  onMessageFontColorChange: (color: string) => void;
  onNameFontSizeChange: (size: number) => void;
  onNameFontColorChange: (color: string) => void;
}

const CardCustomizer: React.FC<CardCustomizerProps> = ({
  image,
  userName,
  thankYouMessage,
  onNameChange,
  onMessageChange,
  messageFontSize,
  messageFontColor,
  nameFontSize,
  nameFontColor,
  onMessageFontSizeChange,
  onMessageFontColorChange,
  onNameFontSizeChange,
  onNameFontColorChange
}) => {
  return (
    <div className="my-8 max-w-md mx-auto p-4 bg-gray-100 rounded-xl shadow-md">
      <div className="space-y-4">
        <input
          type="text"
          value={userName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter your name"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
        <textarea
          value={thankYouMessage}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Enter your thank you message"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 resize-none h-24"
        />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Message Font Size</label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="16"
              max="48"
              value={messageFontSize}
              onChange={(e) => onMessageFontSizeChange(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-sm font-medium">{messageFontSize}px</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Message Font Color</label>
          <input
            type="color"
            value={messageFontColor}
            onChange={(e) => onMessageFontColorChange(e.target.value)}
            className="w-full h-10 rounded-md cursor-pointer"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Name Font Size</label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="12"
              max="36"
              value={nameFontSize}
              onChange={(e) => onNameFontSizeChange(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-sm font-medium">{nameFontSize}px</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Name Font Color</label>
          <input
            type="color"
            value={nameFontColor}
            onChange={(e) => onNameFontColorChange(e.target.value)}
            className="w-full h-10 rounded-md cursor-pointer"
          />
        </div>
      </div>
      <div className="mt-6 relative rounded-lg overflow-hidden shadow-2xl" style={{ aspectRatio: '4/5' }}>
        <img src={image} alt="Selected background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-between p-6">
          <div className="text-center w-full" style={{ fontSize: `${messageFontSize}px`, color: messageFontColor, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            {thankYouMessage}
          </div>
          <div className="text-center w-full" style={{ fontSize: `${nameFontSize}px`, color: nameFontColor, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
            {userName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCustomizer;
