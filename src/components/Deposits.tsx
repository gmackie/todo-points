import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { random } from 'lodash';

function preventDefault(event: React.MouseEvent): void {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  const todayPoints = random(0,5000);
  const weekPoints = random(0,500000);
  const monthPoints = random(0,50000000);
  return (
    <React.Fragment>
      <Title>Total Points</Title>
      <Typography component="p" variant="h3">
        {`Day: ${todayPoints}`}
      </Typography>
      <Typography component="p" variant="h4">
        {`Week: ${weekPoints}`}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {`Month: ${monthPoints}`}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
