import React from 'react';
import { Video, AbsoluteFill, Sequence, Audio, spring, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import videoSrc from '../assets/input.mp4';
import transcript from '../assets/transcript.json'; 

interface MyVideoProps {
    durationInFrames: number; 
}

const MyVideo: React.FC<MyVideoProps> = ({ }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    
    const colors = ['green', 'yellow', 'red'];

    
    

    return (
        <AbsoluteFill>
            <Video src={videoSrc} />
            <Audio src={videoSrc} volume={1}/>

            {transcript.map((subtitle, index) => {
                const fromFrame = subtitle.start * 30; 
                const durationFrames = (subtitle.end - subtitle.start) * 30;

                console.log(`Subtitle ${index}: fromFrame = ${fromFrame}, durationFrames = ${durationFrames}`);

                if (durationFrames <= 0) {
                    console.error(`Invalid duration for subtitle ${index}: ${durationFrames}`);
                    return null;
                }

                const fadeDuration = Math.min(15, Math.floor(durationFrames / 2)); 
                const fadeInStart = fromFrame;
                const fadeInEnd = fadeInStart + fadeDuration;
                const fadeOutStart = fromFrame + durationFrames - fadeDuration;
                const fadeOutEnd = fromFrame + durationFrames;

        
                if (fadeInEnd >= fadeOutStart) {
                    console.warn(`Subtitle ${index} is too short for both fade in and out. Skipping fade.`);
                    
                    
                    return (
                        <Sequence
                            key={index}
                            from={fromFrame}
                            durationInFrames={durationFrames}
                            layout="absolute-fill"
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '70%', 
                                    left: '50%', 
                                    transform: 'translate(-50%, -50%)',
                                    width: '100%',
                                    textAlign: 'center',
                                    color: colors[index % colors.length],
                                    fontSize: 100, 
                                    fontWeight: 'bold', 
                                    fontFamily: 'Arial, sans-serif',
                                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                    opacity: 1, 
                                }}
                            >
                               {subtitle.text}
                            </div>
                        </Sequence>
                    );
                }

                const opacity = interpolate(
                    frame,
                    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
                    [0, 1, 1, 0], 
                    {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    }
                );

                
                const translateY = spring({
                    frame: frame - fromFrame,
                    fps: 30,
                    config: {
                        damping: 200,
                        mass: 1,
                        stiffness: 100,
                    },
                });

                return (
                    <Sequence
                        key={index}
                        from={fromFrame}
                        durationInFrames={durationFrames}
                        layout="absolute-fill"
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: '70%', 
                                left: '50%', 
                                transform: 'translate(-50%, -50%)', 
                                width: '100%',
                                textAlign: 'center',
                                color: colors[index % colors.length],
                                fontSize: 60,
                                fontWeight: 'bold', 
                                fontFamily: 'Arial, sans-serif',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                opacity: opacity, 
                            }}
                        >
                           {subtitle.text}
                        </div>
                    </Sequence>
                );
                
            })}
        </AbsoluteFill>
    );
};

export default MyVideo;
