const path = require(`path`);

const IS_PROD = process.env.NODE_ENV === "production";

exports.createPages = ({ actions: { createPage } }) => {
  // Only create demo page when not in production
  if (IS_PROD) return;

  const demoTemplate = path.resolve(__dirname, `src/templates/og-demo.js`);

  createPage({
    // Path for this page — required
    path: `open-graph-image-demo`,
    component: demoTemplate,
  });
};
