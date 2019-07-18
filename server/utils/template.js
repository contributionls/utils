const makeTemplate = templateString => {
  return templateData =>
    new Function(`$`, "return `" + templateString + "`")(templateData);
};

exports.template = function(template, data) {
  return makeTemplate(template)(data);
};
