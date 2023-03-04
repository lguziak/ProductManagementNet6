import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./custom.css";
import { ToastContainer } from "react-toastify";
import { Layout } from "./components/Layout";
import "react-toastify/dist/ReactToastify.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <div className="container-fluid">
        <Layout>
          <Routes>
            {AppRoutes.map((route, index) => {
              const { element, ...rest } = route;
              return <Route key={index} {...rest} element={element} />;
            })}
          </Routes>
          <ToastContainer autoClose={3000} hideProgressBar />
        </Layout>
      </div>
    );
  }
}
