import React from "react";

const withOpenMenu = (WrappedComponent) => {
  return class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isOpened: false
      };
      this._onOpenHandler = this._onOpenHandler.bind(this);
    }

    _onOpenHandler() {
      this.setState(({isOpened}) => ({isOpened: !isOpened}));
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          isOpened={this.state.isOpened}
          onOpenHandler={this._onOpenHandler}
        />
      );
    }
  };
};

export default withOpenMenu;
