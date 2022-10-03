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
      console.log("=============== canvas changed", canvas);
      if (!context.engine) {
        const resp = init(canvas, { scale });
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
            width: width * scale,
            height: height * scale,
          });
          context.engine.resize();
        }}
      </AutoSizer>
      <canvas ref={canvasRef} />
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
