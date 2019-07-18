const { merge } = require("../index");
const fs = require("fs");
const { promisify } = require("util");
const path = require("path");
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const jsonAUrl =
  "https://gist.githubusercontent.com/contributionls/6ab023e9d4c1e17fc3dc13220812ca6f/raw/a.json";
const jsonBurl =
  "https://gist.githubusercontent.com/contributionls/6ab023e9d4c1e17fc3dc13220812ca6f/raw/b.json";
test("merge json", async () => {
  const result = await merge([jsonAUrl, jsonBurl]);
  const body = result.body;

  const jsonExpect = await readFileAsync(
    path.resolve(__dirname, "./test.json"),
    "utf8"
  );
  expect(body).toBe(jsonExpect);
});

const yamlAUrl =
  "https://gist.githubusercontent.com/contributionls/6ab023e9d4c1e17fc3dc13220812ca6f/raw/a.yaml";
const yamlBurl =
  "https://gist.githubusercontent.com/contributionls/6ab023e9d4c1e17fc3dc13220812ca6f/raw/b.yaml";
test("merge yaml", async () => {
  const { body } = await merge([yamlAUrl, yamlBurl]);
  const yamlExpect = await readFileAsync(
    path.resolve(__dirname, "./test.yaml"),
    "utf8"
  );
  expect(body).toBe(yamlExpect);
});
