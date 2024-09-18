import React, { useState, useEffect, useRef } from 'react';

const ShareButton = () => {
  const [isShareSupported, setIsShareSupported] = useState(false);
  const clipboardItemRef = useRef < Blob | null > (null);

  useEffect(() => {
    // Check if Web Share API is supported when the component mounts
    axiosSend();
    setIsShareSupported(!!navigator.share);
  }, []);

  // Function to download the image from the URL and prepare it for sharing
  async function axiosSend() {
    const imageUrl = 'src/assets/images/Astro.jpg';

    try {
      // Fetch the image from the URL
      const response = await fetch(imageUrl);
      const blob = await response.blob(); // Convert the response into a blob
      const clipboardItem = new ClipboardItem({
        [blob.type]: blob
      });

      // Save the blob to the clipboard item reference
      clipboardItemRef.current = blob;
      console.log('Image fetched and prepared:', response);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }

  // Function to share the video or image
  async function copyAndSend() {
    // if (!clipboardItemRef.current) {
    //   return;
    // }

    const title = "popcall_instagram_story";

    // Prepare the file with the downloaded image
    const filesArray = [
      new File([clipboardItemRef.current], `${title}.jpg`, {
        type: "image/jpg", // Using 'png' as per the provided URL
        lastModified: new Date().getTime()
      })
    ];

    const shareData = {
      files: filesArray
    };

    // Check if sharing is supported
    if (navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        alert("Shared successfully!");
      } catch (error) {
        console.error("Sharing failed:", error);
      }
    } else {
      console.error("Sharing not supported");
    }
  }

  const shareContent = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Amazing Content!',
        text: 'Check out this amazing content!',
        url: 'https://yourwebsite.com/path-to-content',
      })
        .then(() => {
          console.log('Content successfully shared');
        })
        .catch((error) => {
          console.error('Error sharing content:', error);
        });
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  return (
    <div>
      {isShareSupported ? (
        <button
          style={{ color: 'white' }}
          onClick={copyAndSend}>Share to Instagram</button>
      ) : (
        <p>Sharing is not supported on this browser.</p>
      )}
    </div>
  );
};

export default ShareButton;
