import { Box } from '@impact-market/ui';

const Modal = ({ isOpen, fullW, children }: any) => {
    if (!isOpen) {
        return null;
    }

    return (
        <Box
            padding={1.5}
            w="100%"
            style={{
                alignItems: 'center',
                backdropFilter: 'blur(10px)',
                background: 'rgba(39, 39, 39, .8)',
                boxSizing: 'border-box',
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                left: 0,
                padding: '1rem',
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: '10'
            }}
        >
            <Box
                style={{
                    background: 'white',
                    border: '1px solid',
                    borderRadius: '12px',
                    maxWidth: fullW ? '100%': '21rem',
                    padding: '1.5rem',
                    width: '100%'
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default Modal;
