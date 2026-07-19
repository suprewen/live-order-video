import {AbsoluteFill, staticFile, Video} from 'remotion';
import controlsSpriteUrl from '../assets/codex-call-controls.png';
import {getGreenSlotRect} from './callOverlaySvg';

export type VideoCallTemplateProps = {
  videoSrc: string;
  greenSlot: boolean;
  greenSlotScale: number;
  controlsScale: number;
};

export const VideoCallTemplate = ({
  videoSrc,
  greenSlot,
  greenSlotScale,
  controlsScale,
}: VideoCallTemplateProps) => {
  const resolvedVideoSrc = videoSrc.startsWith('blob:') ? videoSrc : staticFile(videoSrc.replace(/^\//, ''));
  const greenSlotRect = getGreenSlotRect(greenSlotScale);

  return (
    <AbsoluteFill style={{backgroundColor: '#111', overflow: 'hidden'}}>
      <Video src={resolvedVideoSrc} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      {greenSlot ? <div style={{position: 'absolute', left: greenSlotRect.x, top: greenSlotRect.y, width: greenSlotRect.width, height: greenSlotRect.height, background: '#00FF00'}} /> : null}
      <img src={controlsSpriteUrl} alt="" style={{position: 'absolute', left: 0, top: '64.84375%', width: '100%', height: 'auto', pointerEvents: 'none', transform: `scale(${controlsScale})`, transformOrigin: '50% 75%'}} />
    </AbsoluteFill>
  );
};
