import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from './action';

const YourComponent = ({ count, increment, decrement }) => {
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    count: state.count,
  };
};

export default connect(mapStateToProps, { increment, decrement })(YourComponent);
