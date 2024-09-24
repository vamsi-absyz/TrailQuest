import React, { useEffect, useState } from "react";
import {
    WhatsappShareButton,
    WhatsappIcon,
    EmailShareButton,
} from "react-share";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import ShareButton from "./sharebotton";

export const WpShare = ({ modalData }) => {
    const [whatsAppUrl, setWhatsAppUrl] = useState("");
    const capitalizeFirstLetter = (name) =>
        name ? name.charAt(0).toUpperCase() + name.slice(1) : "";

    const name = capitalizeFirstLetter(Cookies.get("name"));

    const [shareData, setShareData] = useState({
        title: "Congratulations",
        content: `Hey ${name}, we’ve found the perfect mascot to match`,
        image: "",
    });

    useEffect(() => {
        if (modalData) {
            setShareData({
                ...shareData,
                image: modalData[0].congratsImg,
            });
        }
    }, [modalData]);

    const validUrl = shareData.image || "https://picsum.photos/536/354";

    const title = `${shareData.title}! \n\n${shareData.content} - ${modalData[0].title}
    \n\n`;

    // const downloadImage = async () => {
    //   const imageUrl = modalData[0]?.image;
    //   const imageName = modelData[0]?.image_name;

    //   try {
    //     // Fetch the image as a blob
    //     const response = await fetch(imageUrl);
    //     const blob = await response.blob();
    //     const url = URL.createObjectURL(blob);

    //     // Create a link and trigger download
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.download = imageName;
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);

    //     // Clean up the URL object
    //     URL.revokeObjectURL(url);
    //   } catch (error) {
    //     console.error("Error downloading the image:", error);
    //   }
    // };

    //   const generateDownloadableLink = async () => {
    //     const imageUrl = modalData[0]?.image;
    //     const imageName = modalData[0]?.image_name;

    //     // try {
    //     //   const response = await fetch(imageUrl);
    //     //   console.log(response, "response in the imageUrl");
    //     //   const blob = await response.blob();
    //     //   const url = URL.createObjectURL(blob);

    //     //   console.log(blob, url, "inside the generatelink download");

    //     //   const link = document.createElement("a");
    //     //   link.href = url;
    //     //   link.download = imageName;
    //     //   document.body.appendChild(link);
    //     //   // link.click();
    //     //   // document.body.removeChild(link);

    //     //   console.log(link, "link data in the share component");

    //     //   // Return the downloadable link

    //     //   setWhatsAppUrl(url);
    //     //   return url;
    //     // } catch (error) {
    //     //   console.error("Error generating downloadable link:", error);
    //     //   return null;
    //     // }

    //     // const imageUrl = "path/to/your/image.jpg";
    //     // const filename = "desired-filename.jpg";

    //     const downloadLink = document.createElement("a");
    //     downloadLink.href = imageUrl;
    //     downloadLink.download = imageName;
    //     downloadLink.textContent = "Download Image";

    //     // Append the link to the document body or any other container
    //     document.body.appendChild(downloadLink);

    //     console.log(downloadLink, "inside the downloadLink");
    //     setWhatsAppUrl(url);
    //   };

    return (
        <ShareButton  modalData={modalData}/>
        // <Button
        //     style={{
        //         backgroundColor: "#30335C",
        //         borderRadius: "5px",
        //         color: "#fff",
        //         display: "flex",
        //         justifyContent: "center",
        //         alignItems: "center",
        //         padding: "4px 14px",
        //     }}
        //     endIcon={<WhatsappIcon size={20} round />}
        // //   onClick={generateDownloadableLink}
        // >
        //     <WhatsappShareButton
        //         url={modalData[0]?.congratsImg}
        //         title={title}
        //         separator=""
        //         className="Demo__some-network__share-button"
        //     >
        //         Share
        //     </WhatsappShareButton>
        // </Button>
    );
};

export const EmailShare = ({ modalData }) => {
    const capitalizeFirstLetter = (name) =>
        name ? name.charAt(0).toUpperCase() + name.slice(1) : "";

    const name = capitalizeFirstLetter(Cookies.get("name"));

    const [shareData, setShareData] = useState({
        title: "Congratulations",
        content: `Hey ${name}, we’ve found the perfect mascot to match`,
        image: "",
    });

    useEffect(() => {
        if (modalData) {
            setShareData({
                ...shareData,
                image: modalData?.image,
            });
        }
    }, [modalData]);

    const title = `${shareData.title}! \n\n${shareData.content} - ${modalData.title}
    \n\n ${shareData.image}`;



    return (
        <Button
            style={{
                backgroundColor: "#30335C",
                borderRadius: "5px",
                color: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "4px 14px",
            }}
            endIcon={<WhatsappIcon size={20} round />}
        >
            <EmailShareButton
                subject={shareData.image}
                body={title}
                onClick={() => { }}
                openShareDialogOnClick
                separator=""
                className="Demo__some-network__share-button"
            >
                Share
            </EmailShareButton>
        </Button>
    );
};
