const { registerFont, createCanvas, loadImage } = require("canvas");

const splitIntoLines = (ctx, { width, text, maxLines }) => {
  const words = text.split(" ");
  const lines = [];
  let lineIndex = 0;

  words.every((word) => {
    const tempLine = lines[lineIndex] ? `${lines[lineIndex]} ${word}` : word;
    let roomForMoreWords = true;
    const lineWidth = width;

    if (lineIndex < maxLines - 1) {
      if (ctx.measureText(tempLine).width <= lineWidth) {
        lines[lineIndex] = tempLine;
      } else {
        lineIndex++;
        lines[lineIndex] = word;
      }
    } else {
      if (ctx.measureText(tempLine).width <= lineWidth * 0.9) {
        lines[lineIndex] = tempLine;
      } else {
        lines[lineIndex] += "…";
        // In case description ends in … and its the last word
        lines[lineIndex].replace("……", "…");
        roomForMoreWords = false;
      }
    }

    return roomForMoreWords;
  });

  return lines;
};

const drawImage = async (
  path,
  ctx,
  { circleX, circleY, radius, borderColor, borderWidth }
) => {
  const loadedImage = await loadImage(path);
  const imgWidth = loadedImage.width;
  const imgHeight = loadedImage.height;
  const imageSize = Math.min(imgWidth, imgHeight);
  const diameter = radius * 2;

  ctx.save();
  ctx.beginPath();
  ctx.arc(circleX, circleY, radius, 0, 2 * Math.PI);
  ctx.lineWidth = borderWidth;
  ctx.strokeStyle = borderColor;
  ctx.stroke();
  ctx.closePath();
  ctx.clip();
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
  ctx.drawImage(
    loadedImage,
    imgWidth / 2 - imageSize / 2,
    imgHeight / 2 - imageSize / 2,
    imageSize,
    imageSize,
    circleX - radius,
    circleY - radius,
    diameter,
    diameter
  );
  ctx.restore();
};

exports.drawOgImage = async (
  canvas,
  {
    avatar,
    title = "",
    description = "",
    image,
    titleFont,
    bodyFont,
    height,
    width,
    backgroundColor = "#fffaf0",
    primaryColor = "#ec4326",
    primaryTextColor = "#412f20",
    secondaryTextColor = "#412f20bb",
  } = {}
) => {
  const titleSize = Math.floor(height / 12);
  const titleLead = Math.floor(titleSize * 1.2);
  const bodySize = Math.floor(titleSize / 2);
  const bodyLead = Math.floor(bodySize * 1.3);

  const padding = width * 0.05;

  const largeRadius = height * 0.5;
  const smallRadius = height * 0.2;

  const largeImageOptions = {
    radius: largeRadius,
    circleX: width - largeRadius * 0.5,
    circleY: largeRadius * 1.2,
    borderWidth: height * 0.03,
    borderColor: "#ffde59",
  };
  const smallImageOptions = {
    radius: smallRadius,
    circleX: largeImageOptions.circleX - largeRadius + smallRadius * 0.25,
    circleY: largeImageOptions.circleY + largeRadius - smallRadius * 1.2,
    borderWidth: height * 0.02,
    borderColor: "#ec4326",
  };

  const copyWidth =
    largeImageOptions.circleX - largeImageOptions.radius - padding * 2;

  canvas.height = height;
  canvas.width = width;
  var ctx = canvas.getContext("2d");

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  ctx.moveTo(0, 0);
  ctx.lineTo(width, 0);
  ctx.lineWidth = height * 0.02;
  ctx.strokeStyle = primaryColor;
  ctx.stroke();

  ctx.fillStyle = primaryTextColor;
  ctx.textBaseline = "top";

  ctx.font = `bold ${titleSize}px ${titleFont}`;

  const titleLines = splitIntoLines(ctx, {
    text: title,
    maxLines: 3,
    width: copyWidth,
  });

  const titleYs = [height * 0.37, height * 0.32, height * 0.27];

  const titleY = titleYs[titleLines.length - 1];

  titleLines.forEach((line, index) => {
    ctx.fillText(line, padding, titleY + titleLead * index);
  });

  ctx.font = `${bodySize}px ${bodyFont}`;
  ctx.fillStyle = secondaryTextColor;
  const descriptionLines = splitIntoLines(ctx, {
    text: description,
    maxLines: 4,
    width: copyWidth,
  });

  descriptionLines.forEach((line, index) => {
    ctx.fillText(
      line,
      padding * 1.05,
      titleY + titleLead * (titleLines.length + 0.25) + bodyLead * index
    );
  });

  const footerY = height * 0.97;
  ctx.textBaseline = "bottom";
  ctx.fillStyle = primaryColor;
  ctx.fillText("queen.raae.codes", padding * 1.05, footerY);

  await drawImage(image || avatar, ctx, largeImageOptions);

  // if (image) {
  //   await drawImage(avatar, ctx, smallImageOptions);
  // }
};

exports.createImageBuffer = async (config) => {
  registerFont(__dirname + "/../assets/Roboto/Roboto-Regular.ttf", {
    family: "Roboto",
  });
  registerFont(__dirname + "/../assets/Roboto/Roboto-Black.ttf", {
    family: "Roboto",
    weight: "bold",
  });

  const canvas = createCanvas();
  try {
    await this.drawOgImage(canvas, {
      ...config,
      avatar: __dirname + "/../assets/raae-avatar.jpg",
      titleFont: "Roboto",
      bodyFont: "Roboto",
    });
    return canvas.toBuffer();
  } catch (error) {
    console.error(error.message);
    return null;
  }
};
