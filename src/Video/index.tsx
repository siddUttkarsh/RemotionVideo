import React from 'react';
import { registerRoot} from 'remotion';
import MyComposition from './MyComposition';

 const VideoRoot: React.FC = () => <MyComposition />;

registerRoot(MyComposition);
