import { PDFDocument } from 'pdf-lib';
import { useState } from 'react';
import html2canvas from 'html2canvas';
import styled from 'styled-components';

import {
    Box,
    Button,
    Card,
    Display,
    Divider,
    Text,
    colors
} from '@impact-market/ui';

import { Breakpoints } from '../helpers/Breakpoints';
import Certificate from './Certificate';
import Input from '../../src/components/Input';
import Modal from './Modal';

export const CardWrapper = styled(Card)`
    overflow: 'hidden';
    margin-bottom: 2rem;
    p {
        color: ${colors.g400};
        font-weight: 600;
    }

    h1 {
        font-weight: 600;
    }

    @media (max-width: ${Breakpoints.xsmall}) {
        .certificate-buttons {
            flex-wrap: wrap;

            button {
                width: 100%;
            }
        }
    }
`;

const DividerLine = styled(Divider)`
    left: -16px;
    margin-bottom: 0;
    position: absolute;
    top: 0;
    width: calc(100% + 32px);
`;

const ViewCertificateButton = styled(Button)`
    color: #1570ef;
    font-weight: 600;
`;

const DismissButton = styled(Button)`
    background: white;
    border-color: #d0d5dd;
    color: #344054;
`;

const DownloadCertificateButton = styled(Button)`
    margin-left: 1rem;
`;

const GenerateCertificate = (props: any) => {
    const {
        title,
        cardHeading,
        cardTip,
        firstNamePlaceholder,
        lastNamePlaceholder,
        generate,
        viewCertificate,
        downloadCertificate,
        dismiss,
        sponsor,
        certificate,
        completionDate
    } = props;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [pngDataUrl, setPngDataUrl] = useState('');
    const certificateData = { ...certificate, completionDate, sponsor, title };

    const handleConvertToPNG = () => {
        setLoading(true);
        const elementToCapture = document.getElementById(
            'htmlElementToCapture'
        );

        html2canvas(elementToCapture, { allowTaint: true, useCORS: true }).then(
            (canvas) => {
                const dataURL = canvas.toDataURL('image/jpg');

                setPngDataUrl(dataURL);
                setLoading(false);
                setIsReady(true);
            }
        );
    };

    const handleConvertToPDF = async () => {
        if (!pngDataUrl) {
            console.error('No PNG image to convert to PDF');

            return;
        }

        const pdfDoc = await PDFDocument.create();
        // A4 dimensions in points (landscape)
        const page = pdfDoc.addPage([841.89, 595.276]);

        const pngImage = await pdfDoc.embedPng(pngDataUrl);
        const { width, height } = pngImage.scale(1);
        const scaleFactor = Math.min(841.89 / width, 595.276 / height);

        // Calculate the centered position
        const xPosition = (841.89 - width * scaleFactor) / 2;
        const yPosition = (595.276 - height * scaleFactor) / 2;

        page.drawImage(pngImage, {
            height: height * scaleFactor,
            width: width * scaleFactor,
            x: xPosition,
            y: yPosition
        });

        const pdfBytes = await pdfDoc.save();

        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

        const pdfDataUrl = URL.createObjectURL(pdfBlob);

        const a = document.createElement('a');

        a.href = pdfDataUrl;
        a.download = 'certificate.pdf';

        a.click();
    };

    return (
        <CardWrapper>
            <Box style={{ display: 'flex', marginBottom: '.5rem' }}>
                <Box style={{ padding: '0 .5rem' }}>
                    <img src="/certificate.png" />
                </Box>

                <Box style={{ padding: '0 .5rem' }}>
                    <Text g500 noMargin small>
                        {title}
                    </Text>
                    <Display>{cardHeading}</Display>
                </Box>
            </Box>
            <Box style={{ position: 'relative' }}>
                <DividerLine />
            </Box>

            {!isReady && (
                <Box>
                    <Text
                        g500
                        noMargin
                        small
                        style={{
                            padding: '1.5rem 0 1rem',
                            textAlign: 'center'
                        }}
                    >
                        {cardTip}
                    </Text>

                    <Box
                        style={{
                            display: 'flex',
                            gap: '1rem',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Input
                            id="firstName"
                            placeholder={firstNamePlaceholder}
                            onKeyUp={(e: any) => setFirstName(e.target.value)}
                        />
                        <Input
                            id="lastName"
                            placeholder={lastNamePlaceholder}
                            onKeyUp={(e: any) => setLastName(e.target.value)}
                        />

                        <Button
                            onClick={handleConvertToPNG}
                            isLoading={loading}
                        >
                            {generate}
                        </Button>
                    </Box>
                </Box>
            )}

            {isReady && (
                <Box
                    className="certificate-buttons"
                    style={{ padding: '1.5rem 0 0' }}
                >
                    <Box
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '1rem',
                            justifyContent: 'flex-end',
                            marginTop: '.5rem'
                        }}
                    >
                        <ViewCertificateButton
                            gray
                            onClick={() => setModalOpen(true)}
                            isLoading={loading}
                        >
                            {viewCertificate}
                        </ViewCertificateButton>

                        <Button
                            onClick={handleConvertToPDF}
                            isLoading={loading}
                        >
                            {downloadCertificate}
                        </Button>
                    </Box>
                </Box>
            )}

            <div style={{ position: 'relative' }}>
                <div
                    id="htmlElementToCapture"
                    style={{
                        height: '387px',
                        position: 'absolute',
                        width: '550px',
                        zIndex: '-1'
                    }}
                >
                    <Certificate
                        name={`${firstName} ${lastName}`}
                        {...certificateData}
                    />
                </div>
            </div>

            <Modal
                style={{
                    flexDirection: 'column',
                    height: '100%',
                    maxHeight: 'calc(100vw - 100px)',
                    width: '100%'
                }}
                isOpen={modalOpen}
                fullW
            >
                <img
                    src={pngDataUrl}
                    style={{
                        maxHeight: 'calc(90vh - 100px)',
                        objectFit: 'contain',
                        width: '100%'
                    }}
                    alt="PNG Image"
                />

                <Box
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '2rem'
                    }}
                >
                    <DismissButton
                        gray
                        onClick={() => {
                            setModalOpen(false);
                        }}
                    >
                        {dismiss}
                    </DismissButton>
                    <DownloadCertificateButton onClick={handleConvertToPDF}>
                        {downloadCertificate}
                    </DownloadCertificateButton>
                </Box>
            </Modal>
        </CardWrapper>
    );
};

export default GenerateCertificate;
