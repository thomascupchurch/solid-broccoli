import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import ApolloClient from "apollo-boost";
import { InMemoryCache, useQuery, gql } from "@apollo/client";
import { ApolloProvider } from "react-apollo";
import { render } from "react-dom";

const client = new ApolloClient({
  uri: "/graphql",
  //   cache: new InMemoryCache(),
});

const ApolloApp = (App) => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

render(ApolloApp(App), document.getElementById("root"));

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
