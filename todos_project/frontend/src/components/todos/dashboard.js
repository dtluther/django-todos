import React, { Component} from 'react';
import TodoList from './todo_list';
import TodoCreate from './todo_create';

class Dashboard extends Component {
    render() {
        return (
            <div id='main'>
                <TodoList />
            </div>
        );
    }
}

export default Dashboard;