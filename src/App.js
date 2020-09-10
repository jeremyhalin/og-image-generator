import React from "react";
import Logos from "./constant/logos";

const initCanvas = (title, imagesUrl, callback) => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#121212";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // const margin = 30;
  // let x = 0;
  // let y = 10;
  // const howManyPerLine = canvas.width / 10;
  // const howManyLines = canvas.height / 10;

  // console.log(
  //   canvas.width,
  //   canvas.height,
  //   margin,
  //   howManyPerLine,
  //   howManyLines
  // );

  // ctx.fillStyle = "#3d3d3d";
  // for (let j = 0; j < howManyLines; j++) {
  //   for (let i = 0; i < howManyPerLine; i++) {
  //     ctx.fillRect(x + margin, y, 2, 2);
  //     x = x + margin;
  //   }
  //   y = y + margin;
  //   x = 0;
  // }

  addTitle(title);
  addImages(imagesUrl, callback);
  generateImage(callback);
};

const generateImage = (callback) => {
  console.log("generating image...");
  const canvas = document.getElementById("canvas");
  const imgData = canvas.toDataURL("image/png");
  console.log(callback);
  callback(imgData);
  // setHref(imgData);
};

const addTitle = (title) => {
  console.log("writing on canvas...");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = "30px Inter";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(title, canvas.width / 2, canvas.height / 2 + 50);
};

const addImages = (imagesUrl, callback) => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const xCenter = canvas.width / 2;
  const yCenter = canvas.height / 2;
  const size = 80;
  const plusSize = 20;
  ctx.fillStyle = "rgba(255,255,255, .38)";

  for (let i = 0; i < imagesUrl.length; i++) {
    const img = new Image();
    let x = xCenter - size / 2;
    let y = yCenter - size / 2 - 50;
    switch (imagesUrl.length) {
      case 2:
        if (i === 0) {
          ctx.fillRect(xCenter, yCenter - 50 - plusSize / 2, 1, plusSize);
          ctx.fillRect(xCenter - plusSize / 2, yCenter - 50, plusSize, 1);
          x = x - size;
        } else {
          x = x + size;
        }
        break;
      default:
        break;
    }
    img.onload = function () {
      ctx.drawImage(img, x, y, size, size);
      console.log("drawing image...");
      generateImage(callback);
    };
    img.src = imagesUrl[i];
  }
};

function App() {
  const [title, setTitle] = React.useState("Your awesome article's title");
  const [href, setHref] = React.useState("");
  // const [loading, setLoading] = React.useState(true);

  const [imagesUrl, setImagesUrl] = React.useState([
    "/images/logos/javascript.svg",
  ]);

  React.useEffect(() => {
    initCanvas(title, imagesUrl, function (data) {
      setHref(data);
    });
  }, [title, imagesUrl]);

  // React.useEffect(() => {
  //   initCanvas();
  // }, []);

  return (
    <div className="App">
      <div className="w-full max-w-xs mx-auto">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>

            <input
              id="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Article's title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="select-image-1"
            >
              Image 1
            </label>
            <div className="inline-block relative w-64">
              <select
                id="select-image-2"
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                value={imagesUrl[0]}
                onChange={(e) => {
                  if (imagesUrl.length >= 1) {
                    setImagesUrl([e.target.value, imagesUrl[1]]);
                  } else {
                    setImagesUrl([e.target.value]);
                  }
                }}
              >
                {Logos.map((logo, index) => {
                  return (
                    <option key={index} value={logo.path}>
                      {logo.name}
                    </option>
                  );
                })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="select-image-2"
            >
              Image 2
            </label>
            <div className="inline-block relative w-64">
              <select
                id="select-image-2"
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-2 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                value={imagesUrl[1]}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setImagesUrl([imagesUrl[0]]);
                  } else {
                    setImagesUrl([imagesUrl[0], e.target.value]);
                  }
                }}
              >
                <option value="">No second image</option>
                {Logos.map((logo, index) => {
                  return (
                    <option key={index} value={logo.path}>
                      {logo.name}
                    </option>
                  );
                })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          {/* {loading && <p>loading...</p>} */}
          <a
            download={title.replace(/[^a-z0-9]/gi, "_").toLowerCase() + ".png"}
            href={href}
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          >
            Download image
          </a>
        </form>
      </div>

      <canvas width="800" height="420" id="canvas" className="mx-auto"></canvas>
      {/* <img
        src={src}
        style={{ display: "none" }}
        alt="Only used to download..."
      /> */}
    </div>
  );
}

export default App;
