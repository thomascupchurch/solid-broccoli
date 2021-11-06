import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { InMemoryCache } from "@apollo/client";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";
import Navbar from "./components/Navbar";
import { setContext } from "@apollo/client/link/context";
import { render } from "react-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

// App.js: Create an Apollo Provider to make every request work with the Apollo server.
// const httpLink = createHttpLink({
//   uri: "/graphql",
// });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

const ApolloApp = (AppComponent) => (
  <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={SearchBooks} />
          <Route exact path="/saved" component={SavedBooks} />
          <Route exact path="/signup" component={SignupForm} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/navbar" component={Navbar} />
          <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
  </ApolloProvider>
);

render(ApolloApp(App), document.getElementById("root"));

export default App;
