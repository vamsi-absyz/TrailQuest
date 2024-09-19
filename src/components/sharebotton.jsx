import React, { useState, useEffect, useRef } from 'react';
import Astro from '../../public/Astro.jpg'
import Bobcat from "../../public/Bobcat.jpg"
import Dog from "../../public/Dog.jpg"
import Einstien from "../../public/Einstien.jpg"
import Elephant from "../../public/Ruth-Elephant.jpg"
import Cookies from "js-cookie";
const ShareButton = ({modalData}) => {
  const [isShareSupported, setIsShareSupported] = useState(false);
  const clipboardItemRef = useRef(null);
  const capitalizeFirstLetter = (name) =>
    name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
  const name = capitalizeFirstLetter(Cookies.get("name"));
  const message= `${name}, we’ve found the perfect mascot to match`;

  const imageMapping = {
   Astro: "/Astro.jpg",
    Bobcat:"/Bobcat.jpg",
    Dog:"/Dog.jpg",
    Einstien:'/Einstien.jpg',
    Elephant:"/Ruth-Elephant.jpg"
  };

  useEffect(() => {
    // Check if Web Share API is supported when the component mounts
    axiosSend();
    setIsShareSupported(!!navigator.share);
  }, []);


  function getImg(imgName) {
    return imageMapping[imgName] || null;
  }

  // Function to download the image from the public folder and prepare it for sharing
  async function axiosSend() {
    // The image must be in the public directory
    console.log(modalData,"ddd")
    const imgName= modalData[0].name;

    const imageUrl = getImg(imgName);
    console.log(imageUrl,"imageurljjjjjjjjjj")
    // console.log(imgName,"imgName") // Ensure it's in public/assets/images

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

    const title = modalData[0]?.title;
    const filesArray = [
      new File([clipboardItemRef.current], `${title}.jpg`, {
        type: 'image/jpeg',
        lastModified: new Date().getTime(),
      }),
    ];

    const shareData = {
      files: filesArray,
      // title:"Congratulations",
      // text:message
      
    };

    // Check if the browser can share the file
    if (navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        console.log(shareData,"data");
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
      <>
        <p>Sharing is not supported on this browser.</p>

        
        </>
      )}
    </div>
  );
};

export default ShareButton;
