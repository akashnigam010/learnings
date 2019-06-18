import React from 'react';

const Validation = (props) => {

    let validatonMessage = "Text too short!";

    if (props.length > 5) {
        validatonMessage = "Text long enough";
    }

    return (
        <p>{validatonMessage}</p>
    );
}

export default Validation;