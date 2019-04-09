import React from 'react';
import {Formik, Form, Field} from 'formik';
import axios from 'axios';
import Context from './Context';

class AddBook extends React.PureComponent {
  render() {
    return (
      <Context.Consumer>
        {({setContext}) => (
          <Formik
            initialValues={{name: '', blurb: ''}}
            onSubmit={(values, {setSubmitting, resetForm}) => {
              setSubmitting(true);

              axios.post('/add-book', values).then(response => {
                setContext({books: response.data});
                resetForm();
              });
            }}
            render={({isSubmitting}) => (
              <Form>
                <h3>Add a Book</h3>
                <label htmlFor="name">
                  Book Name
                  <Field type="text" placeholder="Book Name" name="name" />
                </label>
                <label htmlFor="blurb">
                  Blurb
                  <Field type="textarea" name="blurb" placeholder="Blurb" />
                </label>
                <input type="submit" value="Submit" disabled={isSubmitting} />
              </Form>
            )}
          />
        )}
      </Context.Consumer>
    );
  }
}

export default AddBook;
