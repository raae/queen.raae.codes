const HEIGHT = 600;
const WIDTH = 1200;

const splitIntoLines = (ctx, { width, text, maxLines }) => {
  const words = text.split(" ");
  const lines = [];
  let lineIndex = 0;

  words.every((word) => {
    const tempLine = lines[lineIndex] ? `${lines[lineIndex]} ${word}` : word;
    let roomForMoreWords = true;

    if (lineIndex < maxLines - 1) {
      if (ctx.measureText(tempLine).width <= width) {
        lines[lineIndex] = tempLine;
      } else {
        lineIndex++;
        lines[lineIndex] = word;
      }
    } else {
      if (ctx.measureText(tempLine).width <= width * 0.8) {
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

const drawImage = (
  canvas,
  {
    title,
    footer,
    description,
    height = 600,
    width = 1200,
    backgroundColor = "#fffaf0",
    primaryColor = "#ec4326",
    primaryTextColor = "#412f20",
    secondaryTextColor = "#412f20bb",
  } = {}
) => {
  const titleSize = Math.floor(width / 20);
  const titleLead = titleSize * 1.2;
  const bodySize = titleSize / 2;
  const bodyLead = bodySize * 1.3;

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

  ctx.font = `900 ${titleSize}px Roboto`;
  const titleLines = splitIntoLines(ctx, {
    text: title,
    maxLines: 2,
    width: width * 0.9,
  });

  titleLines.forEach((line, index) => {
    ctx.fillText(line, width * 0.05, height * 0.2 + titleLead * index);
  });

  ctx.font = `400 ${bodySize}px Roboto`;
  ctx.fillStyle = secondaryTextColor;
  const descriptionLines = splitIntoLines(ctx, {
    text: description,
    maxLines: 3,
    width: width * 0.9,
  });

  descriptionLines.forEach((line, index) => {
    ctx.fillText(
      line,
      width * 0.05,
      height * 0.25 + titleLead * titleLines.length + bodyLead * index
    );
  });

  const footerY = height * 0.97;
  ctx.textBaseline = "bottom";
  ctx.fillStyle = primaryColor;
  ctx.fillText("queen.raae.codes", width * 0.05, footerY);
};

[
  {
    title: "Source YouTube videos in Gatsby without a plugin nor a YT API Key",
    description:
      "In yesterday's unauthorized and rum-fueled treasure hunts in the sharky waters around the Gatsby islands, we looked closely at sourcing content nodes with data…",
  },
  {
    title: "Short title",
    description:
      "In yesterday's unauthorized and rum-fueled treasure hunts in the sharky waters around the Gatsby islands, we looked closely at sourcing content nodes with data…",
  },
  {
    title:
      "Unauthorized and rum-fueled treasure hunts in the sharky waters around the Gatsby islands",
    description:
      "In yesterday's unauthorized and rum-fueled treasure hunts in the sharky waters around the Gatsby islands, we looked closely at sourcing content nodes with data…",
  },
].map((test) => {
  const canvas = document.createElement("canvas");
  document.body.append(canvas);
  drawImage(canvas, test);
});
