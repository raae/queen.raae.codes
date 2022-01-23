const { createCanvas, loadImage } = require("canvas");

const splitIntoLines = (ctx, { width, widths = [], text, maxLines }) => {
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

exports.drawOgImage = async (
  canvas,
  {
    avatar,
    title,
    description,
    height = 600,
    width = 1200,
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
  const radius = height * 0.5;
  const circleX = width - radius * 0.5;
  const circleY = radius * 1.2;
  const padding = width * 0.05;
  const copyWidth = circleX - radius - padding * 2;

  canvas.height = height;
  canvas.width = width;
  var ctx = canvas.getContext("2d");

  // const drawAvatar = (image) => {};

  // const image = new Image(); // Using optional size for image
  // image.src = "/raae-avatar.png";
  // image.onload = () => {
  //   ctx.beginPath();
  //   ctx.arc(circleX, circleY, radius, 0, 2 * Math.PI);
  //   ctx.lineWidth = height * 0.03;
  //   ctx.strokeStyle = "#ffde59";
  //   ctx.stroke();
  //   ctx.clip();
  //   ctx.drawImage(image, circleX - radius, circleY - radius, height, height);
  // };

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  ctx.moveTo(0, 0);
  ctx.lineTo(width, 0);
  ctx.lineWidth = height * 0.02;
  ctx.strokeStyle = primaryColor;
  ctx.stroke();

  ctx.fillStyle = primaryTextColor;
  ctx.textBaseline = "top";

  ctx.font = `900 ${titleSize}px Roboto`;

  const titleLines = splitIntoLines(ctx, {
    text: title,
    maxLines: 3,
    width: copyWidth,
  });

  const titleY =
    height * 0.2 + titleLead * Math.min(3 - titleLines.length * 0.8, 1.5);

  titleLines.forEach((line, index) => {
    ctx.fillText(line, padding, titleY + titleLead * index);
  });

  ctx.font = `400 ${bodySize}px Roboto`;
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

  const image = await loadImage(avatar);

  ctx.beginPath();
  ctx.arc(circleX, circleY, radius, 0, 2 * Math.PI);
  ctx.lineWidth = height * 0.03;
  ctx.strokeStyle = "#ffde59";
  ctx.stroke();
  ctx.clip();
  ctx.drawImage(image, circleX - radius, circleY - radius, height, height);
};

exports.createImageBuffer = async (config) => {
  const canvas = createCanvas();
  try {
    await this.drawOgImage(canvas, {
      ...config,
      avatar: __dirname + "/../assets/raae-avatar.png",
    });
    return canvas.toBuffer();
  } catch (error) {
    console.error(error.message);
    return null;
  }
};
