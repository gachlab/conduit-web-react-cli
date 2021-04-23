import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default (dependencies) => (props) => (
	<div>
		<dependencies.Header />
		<Router>
			<Route path="/">
				<dependencies.Home />
			</Route>
		</Router>
		<dependencies.Footer />
	</div>
);
