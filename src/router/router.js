import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Home from "../pages/home/home.js"
import Project_List from "../pages/list/list.js"
import Product from "../pages/product/product.js"
import NotFoundComponent from "../static/404.js"

export const Routes = () => {

	return (

		<Switch>

			<Route exact path="/" component={withRouter(Home)} />
			<Route exact path="/product/:id" component={withRouter(Product)} />
			<Route exact path="/list" component={withRouter(Project_List)} />
      		<Route component={NotFoundComponent} />
		</Switch>
	);

};	