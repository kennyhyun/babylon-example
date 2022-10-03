import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import logo from "./logo.svg";
import "./App.css";
import { init } from "./babylon";

function App({ scale = 2 }) {
  const canvasRef = React.useRef(null);
  const { current: context } = React.useRef({});
  React.useEffect(() => {
    const { current: canvas } = canvasRef;
    if (canvas) {
      console.log("=============== canvas changed", canvas, scale);
      let pixelRatio = 1;
      if (typeof window !== "undefined") {
        pixelRatio = window.devicePixelRatio;
      }
      if (!context.engine) {
        const resp = init(canvas, { scale: scale * pixelRatio });
        Object.assign(context, resp);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef.current]);
  return (
    <>
      <AutoSizer>
        {({ width, height: heightInput }) => {
          const height = (width / 16) * 9;
          Object.assign(canvasRef.current, {
            width,
            height,
          });
          context.engine.resize();
        }}
      </AutoSizer>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </>
  );
}

export default App;
