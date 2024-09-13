import React, { useEffect, useState } from 'react';
import { WhatsappShareButton, WhatsappIcon, EmailShareButton } from 'react-share';
import Button from '@mui/material/Button';

export const WpShare = ({ modalData }) => {
    const [shareData, setShareData] = useState({
        title: "Congratulations",
        content: "You’ve chosen your top traits, and we’ve found the perfect mascot to match",
        image: ""
    });

    useEffect(() => {
        if (modalData) {
            setShareData({
                ...shareData,
                image: modalData[0].image
            });
        }
    }, [modalData]);

    const validUrl = shareData.image || "https://picsum.photos/536/354";

    const title = `${shareData.title}! \n\n${shareData.content} - ${modalData[0].title}
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
                padding: "4px 14px"
            }}
            endIcon={<WhatsappIcon size={20} round />}
        >
            <WhatsappShareButton
                url={modalData[0].image}
                title={title}
                separator=""
                className="Demo__some-network__share-button"
            >
                Share
            </WhatsappShareButton>
        </Button>
    );
}


export const EmailShare = ({ modalData }) => {
    const [shareData, setShareData] = useState({
        title: "Congratulations",
        content: "You’ve chosen your top traits, and we’ve found the perfect mascot to match",
        image: ""
    });

    useEffect(() => {
        if (modalData) {
            setShareData({
                ...shareData,
                image: modalData?.image
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
                padding: "4px 14px"
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
}
