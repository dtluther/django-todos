import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getTodo, editTodo } from '../../actions/todos';
import TodoForm from './todo_form';

class TodoEdit extends Component {
    componentDidMount() {
        this.props.getTodo(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.editTodo(this.props.match.params.id, formValues);
    }

    render() {
        return (
            <div className='ui container'>
                <h2>Edit Todo</h2>
                <TodoForm // redux form
                    initialValues={_.pick(this.props.todo, 'task')}
                    enableReinitialize={true}
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    todo: state.todos[ownProps.match.params.id]
});

export default connect(
    mapStateToProps,
    { getTodo, editTodo }
)(TodoEdit);