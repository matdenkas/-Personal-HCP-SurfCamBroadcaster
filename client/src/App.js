import React from "react";
import "./App.css";

import JsmpegPlayer from "./components/JsmpegPlayer";

const videoOptions = {};
const videoOverlayOptions = {};

function App() {
  let jsmpegPlayer = null;

  return (
    <div className="App">
      <header className="App-header">
        <JsmpegPlayer
          wrapperClassName="video-wrapper"
          videoUrl="ws://localhost:3002"
          options={videoOptions}
          overlayOptions={videoOverlayOptions}
          onRef={(ref) => (jsmpegPlayer = ref)}
        />
        <div className="buttons-wrapper">
          <button onClick={() => jsmpegPlayer.play()}>Play</button>
          <button onClick={() => jsmpegPlayer.pause()}>Pause</button>
          <button onClick={() => jsmpegPlayer.stop()}>Stop</button>
        </div>
      </header>
    </div>
  );
}

export default App;
