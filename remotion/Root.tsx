import React from 'react';
import { Composition } from 'remotion';
import { UIGardenDemo } from './UIGardenDemo.tsx';

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="UIGardenDemo"
                component={UIGardenDemo}
                durationInFrames={450} // 15 seconds at 30fps
                fps={30}
                width={1920}
                height={1080}
            />
        </>
    );
};
