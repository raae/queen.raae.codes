exports.createPages = async (gatsbyUtils, pluginOptions) => {
  const { actions, reporter } = gatsbyUtils;
  const { createRedirect } = actions;

  if (!pluginOptions.path) {
    reporter.panic("Redirects needs a redirects file");
  }

  const redirects = require(pluginOptions.path);

  redirects.forEach((redirect) => {
    createRedirect({
      fromPath: redirect.fromPath,
      toPath: redirect.toPath,
    });
    reporter.info(
      `Redirect created from ${redirect.fromPath} to ${redirect.toPath}`
    );
  });
};
