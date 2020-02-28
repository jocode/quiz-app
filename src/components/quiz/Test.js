import React from 'react';

class ClassComponent extends React.Component {

  render() {
    return (
      <p>Hello from Class Components</p>
    );
  }

}

const FunctionalComponent = (props) => {
  return (
    <p>Hello from {props.name}</p>
  );
};

export { FunctionalComponent, ClassComponent };