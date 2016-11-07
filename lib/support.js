
function toCamelCase(string) {
  return string.replace(/_(\w)/g, (_, l) => { return l.toUpperCase() });
}

// == Exports ===============================================================

module.exports = {
  toCamelCase: toCamelCase
};
