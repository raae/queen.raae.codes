const HEIGHT = 300;
const WIDTH = 600;
const TITLE =
  "🔴 🏴‍☠️ Source YouTube videos in Gatsby without a plugin nor a YT API Key";
const DESCRIPTION =
  "In yesterday's unauthorized and rum-fueled treasure hunts in the sharky waters around the Gatsby islands, we looked closely at sourcing content nodes with data…";

exports.createImage = ({
  height = HEIGHT,
  width = WIDTH,
  title = TITLE,
  description = DESCRIPTION,
} = {}) => {
  const titleSize = width / 17;
  const titleLead = titleSize * 1.2;
  const bodySize = titleSize / 2;
  const bodyLead = bodySize * 1.3;

  const headingBox = [width * 0.05, height * 0.2, width * 0.9, titleLead * 2];
  const descriptionBox = [
    width * 0.055,
    titleLead * 2 + height * 0.25,
    width * 0.9,
    descriptionLead * 3,
  ];

  function setup() {
    createCanvas(width, height);
  }

  function draw() {
    background("#fffaf0");
    stroke("#ec4326");
    strokeWeight(height * 0.02);
    line(0, 0, width, 0);
    strokeWeight(0);
    textSize(titleSize);
    textStyle(BOLD);
    textLeading(titleLead);
    text(title, ...headingBox);
    textSize(bodySize);
    textLeading(bodyLead);
    textStyle(NORMAL);
    text(description, ...descriptionBox);
    textLeading(bodySize);
    text("10 min read by olavea", width * 0.05, height * 0.92);
    text("queen.raae.codes", width * 0.72, height * 0.92);
  }
};
