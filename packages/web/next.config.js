const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");
const path = require("path");

module.exports = (phase) => {
  webpack = (config) => {
    const absoluteImportParts = [
      "public",
      "components",
      "pages",
      "utils",
      "store",
      "constants",
    ];
    function generateAbsolutePath(partName) {
      const aliasName = `~/${partName}`;
      const importPath = path.join(__dirname, partName);
      config.resolve.alias[aliasName] = importPath;
    }
    absoluteImportParts.forEach(generateAbsolutePath);
    return config;
  };
  return {
    webpack,
  };
};
