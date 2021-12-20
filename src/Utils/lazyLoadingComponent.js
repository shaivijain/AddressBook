import React, { Component, Suspense } from "react";
import { Spin } from "antd";

export default function asyncComponent(getComponent) {
  class AsyncComponent extends Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    UNSAFE_componentWillMount() {
      if (!this.state.Component) {
        getComponent().then((Component) => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }
    render() {
      const { Component } = this.state;
      if (Component) {
        return (
          <Suspense fallback={<Spin spinning={true} />}>
            <Component {...this.props} />
          </Suspense>
        );
      }
      return null;
    }
  }
  return AsyncComponent;
}
