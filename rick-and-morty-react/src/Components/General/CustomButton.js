import React, { } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #3a3946 30%, #48556b 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(117, 93, 175, .3)',
    color: 'white',
    height: 38,
    padding: '0 20px',
    margin: '0 0 30px 0'
  },
});

const CustomButton = (props) => {
  const classes = useStyles();

  const fetchMore = () => {
    props.fetch()
  }

  return (
    <div className="custom-button"><Button className={classes.root} onClick={fetchMore}>Load more </Button></div>
  );

}

export default CustomButton;