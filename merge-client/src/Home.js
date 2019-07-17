import React, { useState } from "react";
import {
  Button,
  TextField,
  FormGroup,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  Link,
  Grid,
  InputAdornment,
  IconButton,
  CircularProgress,
  Divider,
  Snackbar,
  Container
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add as AddIcon, Delete as DeleteIcon } from "@material-ui/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FileFind, ContentCopy } from "mdi-material-ui";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import { getExtname, api, isValidUrl } from "./utils";
import SnackBarContentWrapper from "./components/SnackBarContent";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-json";
import "prismjs/components/prism-ini.js";
import "./Home.css";
const HOST = process.env.REACT_APP_API_HOST
  ? process.env.REACT_APP_API_HOST
  : "";

const allowTypes = [".yaml", ".yml", ".json", ".ini"];

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: 30
  },
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
  buttonSplit: {
    flex: 1
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
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  close: {
    padding: theme.spacing(0.5)
  },
  error: {
    backgroundColor: "red"
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  space: {
    marginLeft: theme.spacing(1)
  }
}));

export default function Home() {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const [urls, setUrls] = useState(["", ""]);
  const getUrlsError = allUrls => {
    return allUrls.map(url => {
      return !isValidUrl(url);
    });
  };
  const [urlsErrors, setUrlsError] = useState(getUrlsError(urls));
  const getAutoFileType = allUrls => {
    let theDefaultFileType = "";
    for (const iterator of allUrls) {
      const ext = getExtname(iterator);
      if (ext && allowTypes.includes(ext)) {
        theDefaultFileType = ext.substring(1);
        break;
      }
    }
    if (theDefaultFileType === "yml") {
      theDefaultFileType = "yaml";
    } else if (theDefaultFileType === "conf") {
      theDefaultFileType = "ini";
    }
    return theDefaultFileType;
  };
  const getMergedUrl = (allUrls, fileType) => {
    const searchObj = {};
    if (fileType) {
      searchObj.type = fileType;
    }
    searchObj.urls = allUrls.filter(url => {
      return url;
    });
    const query = new URLSearchParams(searchObj);
    return `${HOST}/merge?${query.toString()}`;
  };
  const defaultFileType = getAutoFileType(urls);
  const [fileType, setFileType] = useState(defaultFileType);
  const [mergedUrl, setMergedUrl] = useState(getMergedUrl(urls, fileType));
  const [mergedPreview, setMergedPreview] = useState("");
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("test");
  function handleClickCopy() {
    setOpen(true);
  }

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  function handleCloseError(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  }
  const handleChangeMergedUrl = e => {
    setMergedUrl(e.target.value);
  };
  const handleChangeUrl = (index, theFileType, e) => {
    const newUrls = urls.map((url, index2) => {
      return index === index2 ? e.target.value.trim() : url;
    });
    setUrls(newUrls);
    const newUrlErrors = getUrlsError(newUrls);
    const isHasError = newUrlErrors.filter(item => item).length > 0;
    setUrlsError(getUrlsError(newUrls));
    if (isHasError) {
      return;
    }
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
      const results = await api(finalUrl);
      setLoading(false);
      setMergedPreview(results);
    } catch (error) {
      setLoading(false);
      setOpenError(true);
      setErrorMessage(error.message);
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
  let firstInputRef = null;

  const handleClickGetStarted = () => {
    if (firstInputRef) {
      firstInputRef.focus();
    }
  };
  const handleClickRandom = () => {
    const newUrls = [
      "https://gist.githubusercontent.com/contributionls/6ab023e9d4c1e17fc3dc13220812ca6f/raw/a.yaml",
      "https://gist.githubusercontent.com/contributionls/6ab023e9d4c1e17fc3dc13220812ca6f/raw/b.yaml"
    ];
    setUrls(newUrls);
    const autoFileType = getAutoFileType(newUrls);
    setFileType(autoFileType);
    setMergedUrl(getMergedUrl(newUrls, autoFileType));
  };
  return (
    <div className={classes.root}>
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Merge config online
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Sometimes we need to extend common configuration,But public
            configuration does not provide a method of extending or merge. So we
            made the util for that.The merge stragety comes from
            <Link
              className={classes.space}
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/TehShrike/deepmerge"
            >
              deepmerge
            </Link>
            . Now,we support yaml/yml/json/ini
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button
                  onClick={handleClickGetStarted}
                  variant="contained"
                  color="primary"
                >
                  Get started
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={handleClickRandom}
                  variant="outlined"
                  color="primary"
                >
                  Gen random
                </Button>
              </Grid>
              <Grid item>
                <Link color="inherit" href="https://utils.men/merge.html">
                  <Button variant="outlined" color="primary">
                    Docs
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link color="inherit" href="https://utils.men">
                  <Button variant="outlined" color="primary">
                    More Tools
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <FormGroup>
        {urls.map((url, index) => {
          return (
            <TextField
              key={`key_${index}`}
              id={`url${index + 1}`}
              required
              inputRef={ref => {
                if (index === 0) {
                  firstInputRef = ref;
                }
              }}
              label={`Url${index + 1}`}
              type="url"
              placeholder="Please input your config url here"
              onChange={handleChangeUrl.bind(null, index, fileType)}
              value={url}
              variant="outlined"
              margin="normal"
              error={urlsErrors[index]}
              helperText={urlsErrors[index] ? "URL is invalid!" : ""}
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
              <MenuItem value="ini">ini</MenuItem>
              <MenuItem value="json">json</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="default"
            onClick={handleAddUrl}
            size="small"
            className={classes.button}
          >
            <AddIcon fontSize="small" className={classes.buttonIcon} />
            Add another url
          </Button>
        </FormGroup>
        <Divider className={classes.divider} />
        <TextField
          multiline
          id="url-result"
          required
          label="Merged Url"
          type="url"
          onChange={handleChangeMergedUrl}
          value={mergedUrl}
          variant="outlined"
          margin="normal"
        />
        <FormGroup row>
          <CopyToClipboard text={mergedUrl} onCopy={handleClickCopy}>
            <Button
              variant="contained"
              color="default"
              className={`${classes.button} ${classes.buttonSplit}`}
            >
              <ContentCopy fontSize="small" className={classes.buttonIcon} />
              copy
            </Button>
          </CopyToClipboard>

          <Button
            onClick={handleGenerate.bind(null, urls, fileType)}
            variant="contained"
            color="primary"
            disabled={isLoading}
            className={`${classes.button} ${classes.buttonSplit}`}
          >
            {isLoading ? (
              <CircularProgress
                size={20}
                color="inherit"
                className={classes.buttonIcon}
              />
            ) : null}
            <FileFind fontSize="small" className={classes.buttonIcon} />
            Preview
          </Button>
        </FormGroup>

        <fieldset className="fieldset">
          <legend className={classes.legend}>Preview</legend>
          <div className="container__area">
            <Editor
              value={mergedPreview}
              onValueChange={code => setMergedPreview(code)}
              highlight={code => {
                const highlightCode =
                  fileType && code
                    ? highlight(code, languages[fileType])
                    : code;
                return highlightCode;
              }}
              padding={4}
              className="container__editor"
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12
              }}
            />
          </div>
        </fieldset>
      </FormGroup>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
      >
        <SnackBarContentWrapper
          onClose={handleClose}
          variant="success"
          message="The url has be copied!"
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={openError}
        autoHideDuration={1500}
        onClose={handleCloseError}
      >
        <SnackBarContentWrapper
          onClose={handleCloseError}
          variant="error"
          message={errorMessage}
        />
      </Snackbar>
    </div>
  );
}
