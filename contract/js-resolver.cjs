
const resolveTypescriptModule = (request, config) => {
  const extension = /\.js$/i;

  if (
    extension.test(request) &&
    !request.includes("node_modules") &&
    !config.basedir.includes("node_modules")
  ) {
    const typescriptPath = request.replace(extension, ".ts");

    try {
      return config.defaultResolver(typescriptPath, config);
    } catch {
      // fallback to the original module path
    }
  }

  return config.defaultResolver(request, config);
};

module.exports = resolveTypescriptModule;
```
