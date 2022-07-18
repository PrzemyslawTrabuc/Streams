import React from 'react';
//import {Field, reduxForm} from 'redux-form'; // redux form -- OLD
import { Form, Field } from "react-final-form";
import {Button} from '@mantine/core';

const StreamForm = (props) => {
    const renderError = ({ error, touched }) => {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    };

    const renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? "error" : ""}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {renderError(meta)}
            </div>
        );
    };

    const onSubmit = (formValues) => {
        props.onSubmit(formValues);
    };

    return (
        <Form
            initialValues={props.initialValues}
            onSubmit={onSubmit}
            validate={(formValues) => {
                const errors = {};

                if (!formValues.title) {
                    errors.title = "You must enter a title";
                }

                if (!formValues.description) {
                    errors.description = "You must enter a description";
                }

                return errors;
            }}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="ui form error">
                    <Field name="title" component={renderInput} label="Enter Title" />
                    <Field
                        name="description"
                        component={renderInput}
                        label="Enter Description"
                    />
                    <Button type="submit" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Submit</Button>
                </form>
            )}
        />
    );
};

export default StreamForm;

/////////////////////////////////////////////////// REACT REDUX FORM -- OLD //////////////////////////////
// class StreamForm extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.renderInput = this.renderInput.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);
//     }
//
//     renderError({error, touched}) {
//         if (touched && error) {
//             return (
//                 <div className="ui error message">
//                     <div className="header">{error}</div>
//                 </div>
//             );
//         }
//     }
//
//     renderInput({input, label, meta}) {
//         const className = `field ${meta.error && meta.touched ? 'error' : '' }`;
//         return (
//             <div className={className}>
//                 <label>{label}</label>
//                 <input {...input} autoComplete="off"/>
//                 {this.renderError(meta)}
//             </div>
//         )
//     }
//
//     onSubmit(formValues) {
//         this.props.onSubmit(formValues);
//     }
//
//     render() {
//         return (
//             <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form ui form error">
//                 <Field
//                     name="title"
//                     component={this.renderInput}
//                     label="Enter Title"
//                 />
//                 <Field
//                     name="description"
//                     component={this.renderInput}
//                     label="Enter Description"
//                 />
//                 <button className="ui button primary">Submit</button>
//             </form>
//         );
//     }
// }
//
// const validate = (formValues) => {
//     const errors = {};
//     if (!formValues.title) {
//         errors.title = "You must enter a title";
//     }
//     if (!formValues.description) {
//         errors.description = "You must enter a description";
//     }
//     return errors;
// }
//
// export default reduxForm({
//     form: 'streamForm',
//     validate: validate
// })(StreamForm);

