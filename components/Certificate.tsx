import { StyleSheet } from '@react-pdf/renderer';
import { Text } from '@impact-market/ui';
import FontStyles from '../styles/index';

const styles = StyleSheet.create({
    heading: {
        color: '#C6A24D',
        fontFamily: 'Abhaya Libre',
        fontSize: 23,
        fontWeight: 'extrabold',
        letterSpacing: 0,
        lineHeight: '2.75rem',
        textTransform: 'uppercase'
    },
    image: {
        height: '100%',
        width: '100%'
    },
    page: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: '388px',
        justifyContent: 'center',
        position: 'relative',
        width: '100%'
    },
    text: {
        fontSize: 11.5,
        fontWeight: 300,
        lineHeight: 2
    },
    view: {
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: -1
    },
    viewSponsor: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: '80%'
    }
});

const Certificate = (props: any) => {
    const {
        heading,
        supportText,
        completedOn,
        on,
        sponsor,
        title,
        completionDate
    } = props;

    const formatDateFromTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);

        // Format the date using the options parameter of toLocaleDateString
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        } as any;
        const formattedDate = date.toLocaleDateString('en-US', options);

        return formattedDate;
    };

    return (
        <div style={styles.page}>
            <FontStyles />
            <div style={styles.view}>
                <img
                    style={styles.image}
                    src="/certificate-background.jpg"
                ></img>
            </div>
            <div style={styles.viewSponsor}>
                <img
                    id="sponsorImage"
                    style={{
                        height: 'auto',
                        marginBottom: '15px',
                        width: 130,
                        zIndex: 10000
                    }}
                    src={sponsor}
                />
                <p style={styles.heading}>{heading}</p>
                <Text style={{ ...styles.text, marginTop: '-5px' }}>
                    {supportText}
                </Text>

                <p
                    style={{
                        ...styles.heading,
                        fontSize: 40,
                        margin: '35px 0 15px'
                    }}
                >
                    {props?.name}
                </p>

                <Text style={styles.text}>{completedOn}</Text>

                <Text style={{ ...styles.text, lineHeight: 1.5 }}>
                    <span
                        style={{
                            fontFamily: 'Inter-Inter, sans-serif',
                            fontWeight: 'bold'
                        }}
                    >
                        {title}
                    </span>
                    {` ${on} ${formatDateFromTimestamp(completionDate)}.`}
                </Text>
            </div>
        </div>
    );
};

export default Certificate;
