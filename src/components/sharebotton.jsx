import React, { useState, useEffect, useRef } from 'react';

const ShareButton = () => {
  const [isShareSupported, setIsShareSupported] = useState(false);
  const clipboardItemRef = useRef(null);

  useEffect(() => {
    // Check if Web Share API is supported when the component mounts
    axiosSend();
    setIsShareSupported(!!navigator.share);
  }, []);

  // Function to download the image from the public folder and prepare it for sharing
  async function axiosSend() {
    // The image must be in the public directory
    const imageUrl = "/Astro.jpg"; // Ensure it's in public/assets/images

    try {
      // Fetch the image from the correct URL
      const response = await fetch(imageUrl);
      console.log('Image not found', imageUrl);

      if (!response.ok) {
        throw new Error('Image not found', imageUrl);
      }

      const blob = await response.blob(); // Convert the response into a blob
      clipboardItemRef.current = blob; // Save the blob to the clipboard item reference
      console.log('Image fetched and prepared:', response);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }

  // Function to share the image
  async function copyAndSend() {
    if (!clipboardItemRef.current) {
      console.error('No image blob available');
      return;
    }

    const title = 'popcall_instagram_story';
    const filesArray = [
      new File([clipboardItemRef.current], `${title}.jpg`, {
        type: 'image/jpeg',
        lastModified: new Date().getTime(),
      }),
    ];

    const shareData = {
      files: filesArray,
    };

    // Check if the browser can share the file
    if (navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        alert('Shared successfully!');
      } catch (error) {
        console.error('Sharing failed:', error);
      }
    } else {
      console.error('Sharing not supported');
    }
  }

  return (
    <div>
      {isShareSupported ? (
        <button style={{ color: 'white' }} onClick={copyAndSend}>
          Share to Instagram
        </button>
      ) : (
        <p>Sharing is not supported on this browser.</p>
      )}
    </div>
  );
};

export default ShareButton;
