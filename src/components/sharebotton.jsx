import { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import axios from 'axios';


const ShareButton = () => {
  const [isShareSupported, setIsShareSupported] = useState(false);

  useEffect(() => {
    // Check if Web Share API is supported when the component mounts
    setIsShareSupported(!!navigator.share);
  }, []);

  const shareContent = () => {
    const formData = {
      name: Cookies.get("name"),
      email: Cookies.get("email"),
      phone: Cookies.get("number"),
      company: Cookies.get("company"),
    }
    console.log(formData, "checking the data")

    try {
      if (formData) {
        try {
          const url = "http://localhost:5000/submit-form"
          axios
            .post(url, formData)
            .then((response) => console.log(response))
            .catch((error) => console.error(error));
        } catch (err) {
          console.error(err, "err")
        }
      }
    } catch (err) {
      console.error(err)
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
