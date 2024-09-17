import React, { useState, useEffect } from 'react';

const ShareButton = () => {
 const [isShareSupported, setIsShareSupported] = useState(false);

 useEffect(() => {
  // Check if Web Share API is supported when the component mounts
  setIsShareSupported(!!navigator.share);
 }, []);

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
   {/* <h1>Share Content</h1> */}
   {isShareSupported ? (
    <button
     style={{ color: 'white' }}
     onClick={shareContent}>Share to Instagram</button>
   ) : (
    <p>Sharing is not supported on this browser.</p>
   )}
  </div>
 );
};

export default ShareButton;
