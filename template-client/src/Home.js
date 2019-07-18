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
  CircularProgress,
  Divider,
  Snackbar,
  Container
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FileFind, ContentCopy } from "mdi-material-ui";
import Editor from "react-simple-code-editor";
import { getExtname, api, isValidUrl } from "./utils";
import SnackBarContentWrapper from "./components/SnackBarContent";
import "./Home.css";
const HOST = process.env.REACT_APP_API_HOST
  ? process.env.REACT_APP_API_HOST
  : "";
const MAIN_HOST = process.env.REACT_APP_MAIN_HOST
  ? process.env.REACT_APP_MAIN_HOST
  : "";
const allowTypes = [".yaml", ".yml", ".json", ".ini", ".txt", ".conf"];

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: 30
  },
  buttonGrow: {
    flexGrow: 1
  },
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  buttonBox: {},
  input: {
    display: "none"
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  },
  formControl: {
    marginRight: theme.spacing(4),
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
  const [url, setUrl] = useState("");
  const [template, setTemplate] = useState("");
  const getUrlError = url => {
    return !isValidUrl(url);
  };
  const [urlError, setUrlError] = useState(getUrlError(url));
  const getAutoFileType = url => {
    let theDefaultFileType = "";
    const ext = getExtname(url);
    if (ext && allowTypes.includes(ext)) {
      theDefaultFileType = ext.substring(1);
    }

    if (theDefaultFileType === "yml") {
      theDefaultFileType = "yaml";
    } else if (theDefaultFileType === "conf" || theDefaultFileType === "txt") {
      theDefaultFileType = "ini";
    }
    return theDefaultFileType;
  };
  const getTemplateUrl = (url, source, template) => {
    const searchObj = {};
    if (source) {
      searchObj.source = source;
    }
    if (template) {
      searchObj.template = template;
    }
    searchObj.url = url;
    const query = new URLSearchParams(searchObj);
    return `${HOST}/template?${query.toString()}`;
  };
  const defaultFileType = getAutoFileType(url);
  const [fileType, setFileType] = useState(defaultFileType);
  const [templateUrl, setTemplateUrl] = useState(
    getTemplateUrl(url, fileType, template)
  );
  const [templatePreview, setTemplatePreview] = useState("");
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
  const handleChangeTemplateUrl = e => {
    setTemplateUrl(e.target.value);
  };
  const handleChangeUrl = (theFileType, theDestFileType, e) => {
    const newUrl = e.target.value.trim();
    setUrl(newUrl);
    const newUrlError = getUrlError(newUrl);
    const isHasError = newUrlError;
    setUrlError(getUrlError(newUrl));
    if (isHasError) {
      return;
    }
    const autoFileType = getAutoFileType(newUrl);
    if (autoFileType && autoFileType !== fileType) {
      setFileType(autoFileType);
    }
    setTemplateUrl(getTemplateUrl(newUrl, theFileType, theDestFileType));
  };
  const handleChangeTemplate = (newUrl, theFileType, e) => {
    const theTemplate = e.target.value.trim();
    setTemplate(theTemplate);
    setTemplateUrl(getTemplateUrl(newUrl, theFileType, theTemplate));
  };
  const handleGenerate = async (url, fileType, destFileType) => {
    setLoading(true);
    const finalUrl = getTemplateUrl(url, fileType, destFileType);
    try {
      const results = await api(finalUrl);
      setLoading(false);
      setTemplatePreview(results);
    } catch (error) {
      console.log("error", error.body);
      setLoading(false);
      setOpenError(true);
      setErrorMessage(error.message);
      throw error;
    }
  };

  const handleSetFileType = (newUrl, theDestFileType, e) => {
    setFileType(e.target.value);
    // url
    setTemplateUrl(getTemplateUrl(newUrl, e.target.value, theDestFileType));
  };

  let firstInputRef = null;

  const handleClickGetStarted = () => {
    if (firstInputRef) {
      firstInputRef.focus();
    }
  };
  const handleClickRandom = () => {
    const newUrl =
      "https://gist.githubusercontent.com/contributionls/6ab023e9d4c1e17fc3dc13220812ca6f/raw/a.json";

    setUrl(newUrl);
    const autoFileType = getAutoFileType(newUrl);
    const sampleValue = "${$.foo.bar}";
    setFileType(autoFileType);
    setTemplate(sampleValue);
    setTemplateUrl(getTemplateUrl(newUrl, autoFileType, sampleValue));
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
            template url online
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Your can use the url content,to render your specific template.The
            template rule is use
            <Link
              className={classes.space}
              target="_blank"
              rel="noopener noreferrer"
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals"
            >
              JS ES6 Template literals
            </Link>
            .You can use $ as the url json data variabe,and any JS ES6 Template
            literals supported.Click Sample Button see the demo.Now,we support
            yaml/yml/json/ini url.
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
                  Sample
                </Button>
              </Grid>
              <Grid item>
                <Link color="inherit" href={`${MAIN_HOST}/template.html`}>
                  <Button variant="outlined" color="primary">
                    Docs
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link color="inherit" href={MAIN_HOST}>
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
        <TextField
          id={`url`}
          required
          inputRef={ref => {
            firstInputRef = ref;
          }}
          label={`Url`}
          type="url"
          placeholder="Please input your config url here"
          onChange={handleChangeUrl.bind(null, fileType, template)}
          value={url}
          variant="outlined"
          margin="normal"
          error={urlError}
          helperText={urlError ? "URL is invalid!" : ""}
        />

        <TextField
          id={`template`}
          required
          label={`template`}
          type="text"
          placeholder="Please input your template here"
          onChange={handleChangeTemplate.bind(null, url, fileType)}
          value={template}
          variant="outlined"
          margin="normal"
        />
        <FormGroup className={classes.buttonBox} row>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="source-file-type">Source Type</InputLabel>
            <Select
              onChange={handleSetFileType.bind(null, url, template)}
              value={fileType}
              inputProps={{
                name: "type",
                id: "source-file-type"
              }}
            >
              <MenuItem value="yaml">yaml</MenuItem>
              <MenuItem value="ini">ini</MenuItem>
              <MenuItem value="json">json</MenuItem>
            </Select>
          </FormControl>
        </FormGroup>
        <Divider className={classes.divider} />
        <TextField
          multiline
          id="url-result"
          required
          label="template Url"
          type="url"
          onChange={handleChangeTemplateUrl}
          value={templateUrl}
          variant="outlined"
          margin="normal"
        />
        <FormGroup row>
          <CopyToClipboard text={templateUrl} onCopy={handleClickCopy}>
            <Button
              variant="contained"
              color="default"
              className={`${classes.button} ${classes.buttonSplit}`}
            >
              <ContentCopy fontSize="small" className={classes.buttonIcon} />
              copy
            </Button>
          </CopyToClipboard>
          <div className={classes.buttonGrow} />
          <Button
            onClick={handleGenerate.bind(null, url, fileType, template)}
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
              value={templatePreview}
              onValueChange={code => setTemplatePreview(code)}
              highlight={code => {
                return code;
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
