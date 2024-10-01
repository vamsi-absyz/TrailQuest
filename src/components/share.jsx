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

   

    return (
        <ShareButton  modalData={modalData}/>
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
