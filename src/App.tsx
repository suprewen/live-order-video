import {useEffect, useMemo, useState} from 'react';
import {Player} from '@remotion/player';
import {Download, FileVideo, Sparkles, Upload} from 'lucide-react';
import {WechatOrderCall} from './video/WechatOrderCall';

const fallbackVideo = '/demo.mp4';

export const App = () => {
  const [videoSrc, setVideoSrc] = useState(fallbackVideo);
  const [videoName, setVideoName] = useState('示例素材');
  const [callerName, setCallerName] = useState('正在视频通话');
  const [durationInFrames, setDurationInFrames] = useState(900);

  useEffect(() => () => {
    if (videoSrc.startsWith('blob:')) URL.revokeObjectURL(videoSrc);
  }, [videoSrc]);

  const inputProps = useMemo(() => ({videoSrc, callerName, statusText: '正在为你介绍菜单', greenSlot: true}), [videoSrc, callerName]);

  const chooseFile = (file?: File) => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    const probe = document.createElement('video');
    probe.preload = 'metadata';
    probe.src = objectUrl;
    probe.onloadedmetadata = () => setDurationInFrames(Math.max(1, Math.ceil(probe.duration * 30)));
    setVideoSrc(objectUrl);
    setVideoName(file.name);
  };

  return (
    <main>
      <section className="intro">
        <p className="eyebrow"><Sparkles size={15} /> REMOTION TEMPLATE</p>
        <h1>直播点单视频模板</h1>
        <p className="lede">保留原始人物视频，只叠加视频通话界面与可抠像的商品直播位。</p>
      </section>

      <section className="workspace">
        <div className="preview-wrap">
          <Player component={WechatOrderCall} inputProps={inputProps} durationInFrames={durationInFrames} compositionWidth={720} compositionHeight={1280} fps={30} controls style={{width: '100%', aspectRatio: '9 / 16'}} />
        </div>
        <aside className="panel">
          <div className="panel-head"><span>模板参数</span><span className="live-dot">实时预览</span></div>
          <label className="upload" htmlFor="video-file"><Upload size={20} /><span><strong>替换人物视频</strong><small>{videoName}</small></span><input id="video-file" type="file" accept="video/mp4,video/quicktime,video/webm" onChange={(event) => chooseFile(event.target.files?.[0])} /></label>
          <label className="field"><span>通话名称</span><input value={callerName} maxLength={18} onChange={(event) => setCallerName(event.target.value)} /></label>
          <div className="slot-note"><div className="green-swatch" /><div><strong>右上角商品位已锁定</strong><span>纯绿 #00FF00 · 直播软件色度键抠像</span></div></div>
          <div className="render-box"><FileVideo size={20} /><p>网页用于预览。正式导出在本地执行：</p><code>npm run render -- ./input.mp4</code></div>
          <a className="docs-link" href="https://github.com/suprewen/live-order-video#readme" target="_blank" rel="noreferrer"><Download size={17} />查看导出说明</a>
        </aside>
      </section>

      <section className="steps">
        <div><b>01</b><h2>替换素材</h2><p>上传任何人物视频，预览自动套入 9:16 通话画面。</p></div>
        <div><b>02</b><h2>本地渲染</h2><p>Remotion 原样保留人脸、声音和动作，只处理画面合成。</p></div>
        <div><b>03</b><h2>直播叠商品</h2><p>在 OBS 或直播伴侣对绿色商品位启用色度键。</p></div>
      </section>
    </main>
  );
};
