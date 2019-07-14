import React, { useState } from "react";
import {
  Button,
  TextField,
  FormGroup,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  InputAdornment,
  IconButton,
  CircularProgress,
  Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add as AddIcon, Delete as DeleteIcon } from "@material-ui/icons";
import { FileFind } from "mdi-material-ui";

import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import { getExtname, api } from "./utils";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "./Home.css";
const HOST = process.env.REACT_APP_API_HOST
  ? process.env.REACT_APP_API_HOST
  : "";

const allowTypes = [".yaml", ".yml", ".json"];

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  buttonBox: {
    justifyContent: "space-between"
  },
  input: {
    display: "none"
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  legend: {
    color: "rgba(0, 0, 0, 0.38)"
  },
  loading: {
    margin: theme.spacing(4),
    display: "flex",
    justifyContent: "center"
  },
  divider: {
    margin: theme.spacing(4)
  }
}));

export default function Home() {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const [urls, setUrls] = useState([
    "https://gist.githubusercontent.com/contributionls/6ab023e9d4c1e17fc3dc13220812ca6f/raw/a.yaml",
    "https://gist.githubusercontent.com/contributionls/6ab023e9d4c1e17fc3dc13220812ca6f/raw/b.yaml"
  ]);
  const getAutoFileType = allUrls => {
    let theDefaultFileType = "";
    for (const iterator of allUrls) {
      const ext = getExtname(iterator);
      if (ext && allowTypes.includes(ext)) {
        theDefaultFileType = ext.substring(1);
        break;
      }
    }
    return theDefaultFileType;
  };
  const getMergedUrl = (allUrls, fileType) => {
    const query = new URLSearchParams({
      type: fileType,
      urls: allUrls.filter(url => {
        return url;
      })
    });
    return `${HOST}/merge?${query.toString()}`;
  };
  const defaultFileType = getAutoFileType(urls);
  const [fileType, setFileType] = useState(defaultFileType);
  const [mergedUrl, setMergedUrl] = useState(getMergedUrl(urls, fileType));
  const [mergedPreview, setMergedPreview] = useState("");

  const handleChangeUrl = (index, theFileType, e) => {
    const newUrls = urls.map((url, index2) => {
      return index === index2 ? e.target.value : url;
    });
    setUrls(newUrls);
    const autoFileType = getAutoFileType(newUrls);
    if (autoFileType && autoFileType !== fileType) {
      setFileType(autoFileType);
    }
    setMergedUrl(getMergedUrl(newUrls, theFileType));
  };
  const handleGenerate = async (urls, fileType) => {
    setLoading(true);
    const finalUrl = getMergedUrl(urls, fileType);
    try {
      const results = await api(finalUrl, {
        responseType: "text"
      });
      setLoading(false);
      setMergedPreview(results.data);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };
  const handleAddUrl = () => {
    setUrls(urls.concat(""));
  };
  const handleClickDeleteUrl = index => {
    setUrls(
      urls.filter((_, index2) => {
        return index !== index2;
      })
    );
  };
  const handleSetFileType = e => {
    setFileType(e.target.value);
  };
  return (
    <div>
      <FormGroup>
        {urls.map((url, index) => {
          return (
            <TextField
              key={`key_${index}`}
              id={`url${index + 1}`}
              required
              label={`Url${index + 1}`}
              type="url"
              placeholder="Please input your config url here"
              onChange={handleChangeUrl.bind(null, index, fileType)}
              value={url}
              variant="outlined"
              margin="normal"
              InputProps={{
                endAdornment:
                  index > 1 ? (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        aria-label="Remove this item"
                        onClick={handleClickDeleteUrl.bind(null, index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </InputAdornment>
                  ) : null
              }}
            />
          );
        })}

        <FormGroup className={classes.buttonBox} row>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-simple">File Type</InputLabel>
            <Select
              onChange={handleSetFileType}
              value={fileType}
              inputProps={{
                name: "type",
                id: "file-type"
              }}
            >
              <MenuItem value="yaml">yaml</MenuItem>
              <MenuItem value="json">json</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="default"
            onClick={handleAddUrl}
            size="large"
            className={classes.button}
          >
            <AddIcon className={classes.buttonIcon} />
            Add another url
          </Button>
        </FormGroup>
        <Divider variant="middle" className={classes.divider} />
        <TextField
          multiline
          id="url-result"
          required
          label="Merged Url"
          type="url"
          value={mergedUrl}
          variant="outlined"
          margin="normal"
        />
        <Button
          onClick={handleGenerate.bind(null, urls, fileType)}
          size="large"
          variant="contained"
          color="primary"
          disabled={isLoading}
          className={classes.button}
        >
          <FileFind className={classes.buttonIcon} />
          Preview
        </Button>
        {isLoading ? (
          <div className={classes.loading}>
            <CircularProgress color="inherit" />
          </div>
        ) : null}
        <fieldset className="fieldset">
          <legend className={classes.legend}>Preview</legend>
          <Editor
            value={mergedPreview}
            onValueChange={code => setMergedPreview(code)}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            className="container__editor"
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12
            }}
          />
        </fieldset>
      </FormGroup>
    </div>
  );
}
