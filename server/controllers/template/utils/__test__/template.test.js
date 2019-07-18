const { template } = require("../index");

const jsonAUrl =
  "https://gist.githubusercontent.com/contributionls/6ab023e9d4c1e17fc3dc13220812ca6f/raw/a.yaml";

test("template json", async () => {
  const { body } = await template(jsonAUrl, {
    template: "${$.foo.bar}"
  });
  expect(body).toEqual("3");
});

const yamlAUrl =
  "https://gist.githubusercontent.com/contributionls/6ab023e9d4c1e17fc3dc13220812ca6f/raw/a.json";
test("template yaml", async () => {
  const { body } = await template(yamlAUrl, {
    template: "${$.foo.bar}"
  });
  expect(body).toEqual("3");
});
