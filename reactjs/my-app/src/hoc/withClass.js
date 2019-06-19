import React from 'react';

const withClass = (WrappedComponent, classes)  => {
    console.log(classes);
    return props => (
        <div className={classes}>
            <WrappedComponent {...props} />
        </div>
    );
}

export default withClass;