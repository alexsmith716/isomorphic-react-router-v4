
import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const RouteRedirect = ({ key, from, to, status }) => (

    <Route render={({ staticContext }) => {

        if (staticContext) {
          staticContext.status = status
        }
        
        return <Redirect key={key} from={from} to={to} />

    }} />

)

export default RouteRedirect;