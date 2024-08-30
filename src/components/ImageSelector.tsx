import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

interface ImageSelectorProps {
  onSelectImage: (image: string) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ onSelectImage }) => {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          'https://api.unsplash.com/photos/random',
          {
            params: {
              client_id: UNSPLASH_ACCESS_KEY,
              count: 4,
              orientation: 'portrait',
            },
          }
        );
        const fetchedImages = response.data.map((img: any) => `${img.urls.regular}?t=${Date.now()}`);
        setImages(fetchedImages);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  const handleSelectImage = async (image: string) => {
    try {
      onSelectImage(image);
    } catch (error) {
      console.error('Error converting image to base64:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700">Loading amazing images just for you...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {images.map((image, index) => (
        <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
          <div className="w-full h-64 bg-gray-200 animate-pulse" style={{ animation: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-semibold">
              Loading...
            </div>
            <img
              src={image}
              alt={`Option ${index + 1}`}
              className="w-full h-64 object-cover"
              onLoad={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.opacity = '1';
                target.parentElement?.classList.remove('animate-pulse');
                target.parentElement?.querySelector('div')?.remove();
              }}
              style={{ opacity: 0, transition: 'opacity 0.3s' }}
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => handleSelectImage(image)}
              className="bg-white text-black font-semibold py-2 px-4 rounded-full hover:bg-opacity-80 transition-colors duration-300"
            >
              Select Image
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageSelector;