import { ComponentClass } from "react";

interface Route {
  path: string,
  component: ComponentClass,
  childrenArray: Route[]
}

export const ROUTES: Route[] = [];
