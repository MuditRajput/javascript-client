import { Typography } from '@material-ui/core';
import React from 'react';
import { Math } from '../../components';

const MathDemo = () => (
  <>
    <Math first={1} second={0} operator="+">
      {
        (first, second, result) => (
          <p>
            {`Sum of ${first} and ${second} is`}
            {` ${result} `}
          </p>
        )
      }
    </Math>
    <Math first={1} second={0} operator="/">
      {
        (first, second, result) => (
          <Typography variant="h6">
            {`When we divide ${first} with ${second} then result is`}
            {` ${result} `}
          </Typography>
        )
      }
    </Math>
    <Math first={4} second={5} operator="+" />
  </>
);

export default MathDemo;
