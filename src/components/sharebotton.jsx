// import React, { useState, useEffect, useRef } from "react";
// import Cookies from "js-cookie";

// const ShareButton = ({ modalData }) => {
//   const [isShareSupported, setIsShareSupported] = useState(false);
//   const [isImageReady, setIsImageReady] = useState(false);
//   const clipboardItemRef = useRef(null);

//   const capitalizeFirstLetter = (name) =>
//     name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
//   const name = capitalizeFirstLetter(Cookies.get("name"));
//   const message = `${name}, we’ve found the perfect mascot to match`;

//   const imageMapping = {
//     Astro: "/Astro.jpg",
//     Bobcat: "/Bobcat.jpg",
//     Dog: "/Dog.jpg",
//     Einstien: "/Einstien.jpg",
//     Elephant: "/Ruth-Elephant.jpg",
//   };

//   useEffect(() => {
//     // Check if Web Share API is supported when the component mounts
//     setIsShareSupported(navigator.canShare && !!navigator.share);
//     fetchImage();

//     const handleOrientationChange = () => {
//       // You can add any logic that should be executed when orientation changes
//       fetchImage(); // Re-fetch the image in case of orientation change
//     };

//     // Add event listener for orientation change
//     window.addEventListener("orientationchange", handleOrientationChange);

//     return () => {
//       // Clean up event listener
//       window.removeEventListener("orientationchange", handleOrientationChange);
//     };
//   }, []);

//   function getImg(imgName) {
//     return imageMapping[imgName] || null;
//   }

//   // Function to download the image from the public folder and prepare it for sharing
//   async function fetchImage() {
//     const imgName = modalData[0]?.name;

//     if (!imgName) {
//       console.error("Image name not found in modal data.");
//       return;
//     }

//     const imageUrl = getImg(imgName);
//     if (!imageUrl) {
//       console.error("Image URL not found.");
//       return;
//     }

//     try {
//       const response = await fetch(imageUrl);

//       if (!response.ok) {
//         throw new Error(`Image not found at ${imageUrl}`);
//       }

//       const blob = await response.blob();
//       clipboardItemRef.current = blob;
//       setIsImageReady(true);
//     } catch (error) {
//       console.error("Error fetching image:", error);
//       alert("Failed to load the image. Please try again later.");
//     }
//   }

//   // Function to share the image
//   async function copyAndSend() {
//     if (!isImageReady || !clipboardItemRef.current) {
//       console.error("No image blob available or image is not ready");
//       alert("Image is not ready for sharing. Please try again.");
//       return;
//     }

//     const title = modalData[0]?.title;

//     const filesArray = [
//       new File([clipboardItemRef.current], `${title}.jpg`, {
//         type: "image/jpeg",
//         lastModified: new Date().getTime(),
//       }),
//     ];

//     const shareData = { files: filesArray, title: title };

//     if (navigator.canShare && navigator.canShare(shareData)) {
//       try {
//         await navigator.share(shareData);
//       } catch (error) {
//         console.error("Sharing failed:", error);
//         alert("Failed to share the image. Please try again.");
//       }
//     } else {
//       console.error("Sharing is not supported for this data.");
//       alert("Sharing is not supported on this device.");
//     }
//   }

//   return (
//     <div>
//       {isShareSupported ? (
//         <button
//           style={{ color: "white" }}
//           onClick={copyAndSend}
//           disabled={!isImageReady}
//         >
//           Share on Instagram
//         </button>
//       ) : (
//         <p>Sharing is not supported on this browser.</p>
//       )}
//     </div>
//   );
// };

// export default ShareButton;



import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";

const ShareButton = ({ modalData }) => {
  const [isShareSupported, setIsShareSupported] = useState(false);
  const [isImageReady, setIsImageReady] = useState(false);
  const [imageRatio, setImageRatio] = useState("auto"); // Default ratio for portrait mode
  const clipboardItemRef = useRef(null);

  const capitalizeFirstLetter = (name) =>
    name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
  const name = capitalizeFirstLetter(Cookies.get("name"));
  const message = `${name}, we’ve found the perfect mascot to match`;

  const imageMapping = {
    Astro: "/Astro.jpg",
    Bobcat: "/Bobcat.jpg",
    Dog: "/Dog.jpg",
    Einstien: "/Einstien.jpg",
    Elephant: "/Ruth-Elephant.jpg",
  };

  useEffect(() => {
    // Check if Web Share API is supported when the component mounts
    setIsShareSupported(navigator.canShare && !!navigator.share);
    fetchImage();
    handleOrientationChange();

    const orientationMediaQuery = window.matchMedia("(orientation: landscape)");
    // Add event listener for orientation change using matchMedia
    orientationMediaQuery.addEventListener("change", handleOrientationChange);

    return () => {
      // Clean up event listener
      orientationMediaQuery.removeEventListener("change", handleOrientationChange);
    };
  }, []);

  function handleOrientationChange() {
    // Detect if the orientation is landscape or portrait
    const isLandscape = window.matchMedia("(orientation: landscape)").matches;

    if (isLandscape) {
      setImageRatio(1.91 / 1); // Set the ratio to 1.91:1 for landscape mode
    } else {
      setImageRatio("auto"); // Set to auto (default) for portrait mode
    }
  }

  function getImg(imgName) {
    return imageMapping[imgName] || null;
  }

  // Function to download the image from the public folder and prepare it for sharing
  async function fetchImage() {
    const imgName = modalData[0]?.name;

    if (!imgName) {
      console.error("Image name not found in modal data.");
      return;
    }

    const imageUrl = getImg(imgName);
    if (!imageUrl) {
      console.error("Image URL not found.");
      return;
    }

    try {
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error(`Image not found at ${imageUrl}`);
      }

      const blob = await response.blob();
      clipboardItemRef.current = blob;
      setIsImageReady(true);
    } catch (error) {
      console.error("Error fetching image:", error);
      alert("Failed to load the image. Please try again later.");
    }
  }

  // Function to share the image
  async function copyAndSend() {
    if (!isImageReady || !clipboardItemRef.current) {
      console.error("No image blob available or image is not ready");
      alert("Image is not ready for sharing. Please try again.");
      return;
    }

    const title = modalData[0]?.title;

    const filesArray = [
      new File([clipboardItemRef.current], `${title}.jpg`, {
        type: "image/jpeg",
        lastModified: new Date().getTime(),
      }),
    ];

    const shareData = { files: filesArray, title: title };

    if (navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Sharing failed:", error);
        alert("Failed to share the image. Please try again.");
      }
    } else {
      console.error("Sharing is not supported for this data.");
      alert("Sharing is not supported on this device.");
    }
  }

  return (
    <div>
      {isShareSupported ? (
        <button
          style={{ color: "white" }}
          onClick={copyAndSend}
          disabled={!isImageReady}
        >
          Share on Instagram
        </button>
      ) : (
        <p>Sharing is not supported on this browser.</p>
      )}

      {isImageReady && (
        <div
          style={{
            width: "100%", 
            height: imageRatio === "auto" ? "auto" : `${100 / imageRatio}%`,
            backgroundImage: `url(${getImg(modalData[0]?.name)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Render the image as a background with the correct ratio */}
        </div>
      )}
    </div>
  );
};

export default ShareButton;
