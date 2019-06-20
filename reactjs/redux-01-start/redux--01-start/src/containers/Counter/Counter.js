import React, { Component } from 'react';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

import { connect } from 'react-redux';

class Counter extends Component {

    render() {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter} />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter} />
                <hr />
                <button onClick={this.props.onStoreResultCounter}>Store Results</button>
                <ul>
                    {
                        this.props.results.map(el =>
                            <li
                                key={el.id}
                                onClick={() => this.props.onDeleteResultCounter(el)}>
                                {el.value}
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.counter,
        results: state.results
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({ type: 'INCREMENT' }),
        onDecrementCounter: () => dispatch({ type: 'DECREMENT' }),
        onAddCounter: () => dispatch({ type: 'ADD', value: 5 }),
        onSubtractCounter: () => dispatch({ type: 'SUBTRACT', value: 5 }),
        onStoreResultCounter: () => dispatch({ type: 'STORE_RESULT' }),
        onDeleteResultCounter: (el) => dispatch({ type: 'DELETE_RESULT', value: el })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);