import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class TodoForm extends Component {
    renderField = ({ input, label, meta: { touched, error } }) => {
        return (
            <div className={`field ${touched && error ? 'error' : ''}`}>
                <label>{label}</label>
                <input {...input} autoComplete='off' />
                {touched && error && (
                    <span className='ui pointing red basic label'>{error}</span>
                )}
            </div>
        );
    };

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    };

    render() {
        const btnText = `${this.props.initialValues ? 'Update' : 'Add'}`;
        return (
            <div className='ui segment'>
                <form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name='title' component={this.renderField} label='Task' />
                    <button className='ui primary button'>{btnText}</button>
                </form>
            </div>
        );
    };
};

const validate = formValues => {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'Please enter at least 1 character';
    }

    return errors;
};

export default reduxForm({
    form: 'todoForm',
    touchOnBlur: false,
    validate
})(TodoForm);