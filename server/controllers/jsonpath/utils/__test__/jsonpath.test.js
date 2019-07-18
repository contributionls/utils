const { jsonpath } = require("../index");
const jsonAUrl =
  "https://gist.githubusercontent.com/contributionls/6ab023e9d4c1e17fc3dc13220812ca6f/raw/a.yaml";

test("jsonpath json", async () => {
  const { body } = await jsonpath(jsonAUrl, {
    jsonpath: "$.foo.bar"
  });
  expect(body).toEqual(3);
});

const yamlAUrl =
  "https://gist.githubusercontent.com/contributionls/6ab023e9d4c1e17fc3dc13220812ca6f/raw/a.json";
test("jsonpath yaml", async () => {
  const { body } = await jsonpath(yamlAUrl, {
    jsonpath: "$.foo.bar"
  });
  expect(body).toEqual(3);
});
