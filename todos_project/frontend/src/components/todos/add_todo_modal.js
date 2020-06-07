import React, { Component } from 'react';
import { addTodo } from '../../actions/todos'
import { connect } from 'react-redux'; // Do I need this?

class AddTodoModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            color: 'red', // starts with red as active default
            title: '',
            description: ''
        }
    }

    handleColorSelect = (e) => {
        const colors = document.querySelectorAll('.color');
        colors.forEach(el => {el.classList.remove('active')});

        const colorEl = e.currentTarget;
        const color = colorEl.className.split(' ')[1];
        colorEl.classList.add('active');
        this.setState({ color });

        const todoTrim = document.querySelector('#todo-trim');
        todoTrim.className = `todo-trim ${color}`;
    }

    // With this way, we need to bind the function call
    // See https://reactjs.org/docs/handling-events.html
    // update(field) {
    //     return (e) => {
    //         this.setState({ [field]: e.target.value });
    //     }
    // }

    update = (e, field) => {
        this.setState({ [field]: e.target.value });
    }

    handleSubmit = () => {
        this.props.addTodo(this.state);
        this.props.handleCloseTodoModal;
    }

    render() {
        return (
            <div className='modal-box'>
                <div className='modal-overlay' onClick={this.props.handleCloseTodoModal}></div>
                <div id='add-todo-modal'>
                    <div id='todo-trim' className='red'></div>
                    <div className='modal-main'>
                        <div className='item color-select'>
                            <div className='color red active' onClick={this.handleColorSelect}></div>
                            <div className='color green' onClick={this.handleColorSelect}></div>
                            <div className='color yellow' onClick={this.handleColorSelect}></div>
                            <div className='color blue' onClick={this.handleColorSelect}></div>
                        </div>
                        <input className='item new-todo-title'
                               placeholder='Untitled'
                               value={this.state.title}
                               onChange={(e) => this.update(e, 'title')} // the callback doesn't invoke immediately, so it somehow allows it not to be a neverending call stack
                            //    onChange={{this.update('title')} // another option with the other update function
                        />
                        <textarea className='item description'
                                  placeholder='Type description here...'
                                  value={this.state.description}
                                  onChange={(e) => this.update(e, 'description')}
                        />
                    </div>
                    <div className='todo-buttons'>
                        <button className='cancel todo-button' onClick={this.props.handleCloseTodoModal}>Cancel</button>
                        <button className='submit todo-button' onClick={this.handleSubmit}>Add</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    null, // when we don't need to specify a mapStateToProps
    { addTodo }
)(AddTodoModal);
