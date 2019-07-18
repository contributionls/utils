const { convert } = require("../index");
const fs = require("fs");
const { promisify } = require("util");
const path = require("path");
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const jsonAUrl =
  "https://gist.githubusercontent.com/contributionls/6ab023e9d4c1e17fc3dc13220812ca6f/raw/a.yaml";

test("convert yaml to json", async () => {
  const { body } = await convert(jsonAUrl, {
    dest: "json"
  });
  const jsonExpect = await readFileAsync(
    path.resolve(__dirname, "./test.json"),
    "utf8"
  );
  expect(body).toBe(jsonExpect);
});

const yamlAUrl =
  "https://gist.githubusercontent.com/contributionls/6ab023e9d4c1e17fc3dc13220812ca6f/raw/a.json";
test("conver json to yaml", async () => {
  const { body } = await convert(yamlAUrl, {
    dest: "yaml"
  });
  const yamlExpect = await readFileAsync(
    path.resolve(__dirname, "./test.yaml"),
    "utf8"
  );
  expect(body).toBe(yamlExpect);
});
