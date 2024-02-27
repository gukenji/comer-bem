import React from "react";
import { Route, RouteProps } from "react-router-dom";

interface IPrivateRouteProps {
  component: React.ComponentType;
  path?: string;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  component: RouteComponent,
}) => {
  return <RouteComponent />;
};

export default PrivateRoute;
