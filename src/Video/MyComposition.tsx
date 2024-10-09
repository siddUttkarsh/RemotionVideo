import React, { useEffect, useState } from 'react';
import { Composition } from 'remotion';
import MyVideo from './MyVideo'; 

const MyComposition:React.FC = () => {
  const [videoDuration, setVideoDuration] = useState<number | null>(1243);

  return (
      <Composition
        id="MyVideo"
        component={MyVideo as any}
        durationInFrames={videoDuration as any}
        fps={30}
        width={1080}
        height={1920}
      />
    );
};

export default MyComposition;
