import React from 'react'
const ErrorPage = ({errortext}) =>(
        <div  className="ErrorPage">
            <span className="ErrorPage-error-text">
                {errortext}
            </span>
        </div>
)

export default ErrorPage