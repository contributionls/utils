const jp = require("jsonpath");

const query = function(obj, query) {
  try {
    return jp.query(obj, query);
  } catch (error) {
    error.expose = true;
    throw error;
  }
};

exports.query = query;
