import React, { useState } from 'react';
import ImageSelector from './components/ImageSelector';
import CardCustomizer from './components/CardCustomizer';
import DownloadCard from './components/DownloadCard';
import './styles/App.css'

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [thankYouMessage, setThankYouMessage] = useState<string>('Thank You');
  const [messageFontSize, setMessageFontSize] = useState(48);
  const [messageFontColor, setMessageFontColor] = useState('#FFFFFF');
  const [nameFontSize, setNameFontSize] = useState(36);
  const [nameFontColor, setNameFontColor] = useState('#FFFFFF');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Thank You Card Generator</h1>
      {!selectedImage ? (
        <>
          <p className="text-lg text-center mb-6 text-gray-600">Choose an image for your card:</p>
          <ImageSelector onSelectImage={setSelectedImage} />
        </>
      ) : (
        <>
          <CardCustomizer
            image={selectedImage}
            userName={userName}
            thankYouMessage={thankYouMessage}
            onNameChange={setUserName}
            onMessageChange={setThankYouMessage}
            messageFontSize={messageFontSize}
            messageFontColor={messageFontColor}
            nameFontSize={nameFontSize}
            nameFontColor={nameFontColor}
            onMessageFontSizeChange={setMessageFontSize}
            onMessageFontColorChange={setMessageFontColor}
            onNameFontSizeChange={setNameFontSize}
            onNameFontColorChange={setNameFontColor}
          />
          <DownloadCard
            image={selectedImage}
            userName={userName}
            thankYouMessage={thankYouMessage}
            messageFontSize={messageFontSize}
            messageFontColor={messageFontColor}
            nameFontSize={nameFontSize}
            nameFontColor={nameFontColor}
          />
        </>
      )}
    </div>
  );
};

export default App;