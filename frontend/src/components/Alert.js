import React from 'react'

export const Alert = (props) => {
    console.log(props.message,"in alert component")
    return (
        props.alert && <div>
            <div className="alert alert alert-primary" role="alert">
            <strong>{props.alert.type}</strong> {props.alert.msg}
            </div>
        </div>
    )
}
