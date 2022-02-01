exports.createPages = async ({ actions }, options) => {
  const { createRedirect } = actions;

  if (!options.path) {
    reporter.panic("Redirects needs a redirects file");
  }

  const redirects = require(options.path);

  redirects.forEach((redirect) =>
    createRedirect({
      fromPath: redirect.fromPath,
      toPath: redirect.toPath,
    })
  );
};
