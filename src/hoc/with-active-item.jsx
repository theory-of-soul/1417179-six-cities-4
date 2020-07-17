import React from "react";

const withActiveItem = (WrappedComponent) => {
  return class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activeItem: null
      };
      this._onActiveHandler = this._onActiveHandler.bind(this);
    }

    _onActiveHandler(activeItem) {
      this.setState({activeItem});
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          onActiveHandler={this._onActiveHandler}
        />
      );
    }
  };
};

export default withActiveItem;
