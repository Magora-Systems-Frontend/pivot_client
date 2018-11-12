import * as React from "react";
import { Component } from "react";
import Classes from '../Classes';
import ClassCollections from '../ClassCollections';

export default class Home extends Component<{}, {}> {

  render() {
    return (
      <div>
        <h1>Home page</h1>
        <div className="row">
          <div className="col-xs-12 col-md-3">
            <Classes />
          </div>
          <div className="col-xs-12 col-md-9">
            <ClassCollections />
          </div>
        </div>
      </div>
    );
  }
}

