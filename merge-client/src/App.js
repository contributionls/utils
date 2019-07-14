import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Link,
  CssBaseline,
  Container
} from "@material-ui/core";
import { MergeType } from "@material-ui/icons";
import { GithubCircle } from "mdi-material-ui";
import Home from "./Home";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  link: {
    margin: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MergeType />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Merge
            </Typography>
            <Link
              href="https://github.com/contributionls/utils"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              className={classes.link}
            >
              <IconButton color="inherit" aria-label="Github">
                <GithubCircle />
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md">
          <Home />
        </Container>
      </div>
    </React.Fragment>
  );
}
