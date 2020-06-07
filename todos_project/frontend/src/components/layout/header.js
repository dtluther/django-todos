import React, { Component } from 'react';
import AddTodoModal from '../todos/add_todo_modal';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = { createTodoModalIsOpen: false };
    }

    // This syntax ensures `this` is bound within handleClick.
    // Warning: this is *experimental* syntax.
    handleOpenTodoModal = () => {
        this.handleCloseTodoModal();
        this.setState({ createTodoModalIsOpen: true });
    }

    handleCloseTodoModal = () => {
        this.setState({ createTodoModalIsOpen: false });
    }

    render() {
        return (
            <div id='header'>
                <button className='default-btn' onClick={this.handleOpenTodoModal}>+ &nbsp;&nbsp;&nbsp;CREATE TODO</button>
                { this.state.createTodoModalIsOpen &&
                    <AddTodoModal handleCloseTodoModal={this.handleCloseTodoModal}/>
                }
            </div>
        );
    }
}

export default Header;