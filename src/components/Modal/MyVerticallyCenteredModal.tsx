import React, { useCallback } from 'react';
import { Button, Col, Modal, Row, Form } from 'react-bootstrap';
import { Field, Form as FinalForm, FormRenderProps } from 'react-final-form';
import './Modal.scss';

export const MyVerticallyCenteredModal = (props: any) => {
  const onSubmit = (values: { [key: string]: any }) => {
    props.getsubmitteddata({ ...values, ...{ image_url: 'https://clipart-library.com/images/kcKByEL6i.png' } });
    props.onHide();
  };
  return (
    <Modal {...props} size={props.size} aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Body>
        <h6 className='mb-3'>Add a New Beer</h6>
        <FinalForm
          onSubmit={onSubmit}
          render={({ form, handleSubmit, hasValidationErrors, values }: FormRenderProps) => (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={3} sm={12}>
                  <div className='img-wrap'>
                    <img src='https://clipart-library.com/images/kcKByEL6i.png' width='50' />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={9} sm={12}>
                  <Field name='name' className='form-control' component='input' placeholder='Beer Name*' />
                </Col>
                <Col md={9} sm={12}>
                  <Field name='tagline' className='form-control' component='input' placeholder='Genre*' />
                </Col>
                <Col md={9} sm={12}>
                  <Field name='description' className='form-control' component='textarea' placeholder='Description*' />
                </Col>
              </Row>
              <div className='modal-buttons'>
                <Button onClick={props.onHide} variant='default'>
                  Cancel
                </Button>
                <Button variant='primary' type='submit'>
                  Save
                </Button>
              </div>
            </Form>
          )}
        />
      </Modal.Body>
    </Modal>
  );
};
