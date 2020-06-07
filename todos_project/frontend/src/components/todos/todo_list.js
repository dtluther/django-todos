import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getTodos, deleteTodo } from '../../actions/todos';

class TodoList extends Component {
    componentDidMount() {
        this.props.getTodos();
    }

    render() {
        return (
            <div id='todo-box'>
                {this.props.todos.map(todo => (
                    <div className='todo-item' key={todo.id}>
                        <div className='todo-header'>
                            <div className='title-box'>
                                <div className='title'>{todo.title}</div>
                            </div>
                            <div className='todo-actions'>
                                <Link to={`/edit/${todo.id}`}>
                                    <i className="far fa-edit"></i>
                                </Link>
                                <Link to={`/delete/${todo.id}`}>
                                    <i className="fas fa-trash-alt"></i>
                                </Link>
                            </div>
                        </div>
                        <div className='todo-body'>
                            <div className='description'>{todo.created_at}</div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
};

// I think this all needs to get moved to dispatchers at some point
const mapStateToProps = state => ({
    todos: Object.values(state.todos)
});
  
export default connect(
    mapStateToProps,
    { getTodos, deleteTodo }
)(TodoList);