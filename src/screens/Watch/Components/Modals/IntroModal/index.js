import React, { Text } from 'react';
import { 
    CTFragment,
    CTModal,
    CTInput,
    CTText,
    CTFormHeading
  } from 'layout';

import { CTPlayerConstants as Constants } from 'components/CTPlayer';
import './index.scss';



function IntroModal(props) {
    const { onClose } = props;

    const [showText, setShowText] = React.useState(false)
    const onClick = () => setShowText(true)
    const onClick2 = () => setShowText(false)

    const modalProps = {
        id: 'wp-intro-modal',
        open: true,
        title: 'Quick Introduction',
        size: 'sm',
        responsive: true,
        onClose,
        // action: actionElement,
        withCloseButton: true
      };

    return (
        <CTModal {...modalProps} darkMode>
            <CTFragment padding={[0, 0, 0, 0]}>
                <CTText size = "normal" white muted>
                    Hello from the creators of ClassTranscribe, 
                    here are some features that can help you learn-
                </CTText>
                { showText ? 
                    <CTText size = "normal" white muted padding={[10, 0, 10, 0]}>
                        Upcoming assignment or exam? There's a caption-search field to search across all lecture videos.<br/>
                        English not your native language? Transcripts and closed captions are in other languages too.<br/>
                        A mistake in the captions? Click the caption to edit - this helps searches too.<br/>
                        Confused at minute 7? Create a shareable link to post in a forum or email.<br/>
                        Want a minimal interface? You can hide side-transcriptions and other distractions.<br/>
                        Hate using the mouse to rewind and pause? Check out the numerous shortcut keys.<br/>
                        Need a break on a long video? It remembers where you stopped.<br/>
                        Want XYZ...? Check out the settings. <br/>
                        <br/>
                        We're building ClassTranscribe with better learning and accessibility features 
                        to help all students and students with diverse abilities - feel free to let us 
                        know how to improve it  - classtranscribe@illinois.edu.
                    </CTText> : null }
                
            </CTFragment>

            <CTFragment padding={[5, 0, 5, 0]}>
                {!showText ? <CTText id = "more" white muted onClick={onClick}>[READ MORE]</CTText> : null}
            </CTFragment>

            <CTFragment padding={[5, 0, 5, 0]}>
                {showText ? <CTText id = "more" white muted onClick={onClick2}>[Close]</CTText> : null}
            </CTFragment>
        </CTModal>

    )


    
}
  

export default IntroModal;