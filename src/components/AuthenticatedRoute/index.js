import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ component: C, props: cProps, ...rest }) => {
  console.log(...rest);
  console.log(cProps);
  return (
    <Route
      {...rest}
      render={props =>
        cProps.isAuthenticated ? (
          <C {...props} {...cProps} />
        ) : (
          <Redirect
            to={`/?redirect=${props.location.pathname}${props.location.search}`}
          />
        )
      }
    />
  );
};
