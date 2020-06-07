import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTodo } from '../../actions/todos';
import TodoForm from './todo_form';

class TodoCreate extends Component {
    onSubmit = formValues => {
        this.props.createTodo(formValues);
    };

    render() {
        return (
            <div>
                <TodoForm destroyOnUnmount={false} onSubmit={this.onSubmit} />
            </div>
        );
    };
};

export default connect(
    null, // when we don't need to specify a mapStateToProps
    { createTodo }
)(TodoCreate);