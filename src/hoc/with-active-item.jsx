import React from "react";

const withActiveItem = (WrappedComponent) => {
  return class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activeItem: undefined
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
          activeItem={this.state.activeItem}
          onActiveHandler={this._onActiveHandler}
        />
      );
    }
  };
};

export default withActiveItem;
