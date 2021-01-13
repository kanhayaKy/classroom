import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { yellow } from "@material-ui/core/colors";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    borderRadius: 16,
  },
  media: {
    minHeight: 96,
    display: "block",
    backgroundColor: yellow[200],
  },
  bottom: {
    alignSelf: "flex-end",
  },

  content: {
    height: 140,
  },
});

export default function ClassCard(props) {
  const classes = useStyles();
  const history = useHistory();


  return (
    <Card className={classes.root} variant="outlined">
      <CardActions className={classes.media}>
        <Button
          onClick={() => history.push(`/class/${props.class.id}`)}
          size="small"
          color="secondary"
        >
          <Typography gutterBottom variant="h5" component="h2">
            {props.class.Title}
          </Typography>{" "}
        </Button>
        <Typography
          className={classes.bottom}
          variant="body1"
          color="textSecondary"
          component="p"
        >
          {props.class.Faculty}{" "}
        </Typography>{" "}
      </CardActions>
      <Divider />
      <CardActionArea>
        <CardContent>
          <Typography
            className={classes.content}
            variant="body2"
            color="textSecondary"
            component="p"
          ></Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
