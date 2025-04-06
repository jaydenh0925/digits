'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { Contact } from '@prisma/client';
import LoadingSpinner from '@/components/LoadingSpinner';
import { addNote } from '../lib/dbActions';
import { AddNoteSchema } from '../lib/validationSchemas';

const onSubmit = async (
  data: {
    note: string;
    contactId: number;
    owner: string;
  },
) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await addNote(data);
  swal('Success', 'Your note has been added', 'success', {
    timer: 2000,
  });
};

const AddNoteForm = ({ contact }: { contact: Contact }) => {
  const { data: session, status } = useSession();
  // console.log('AddContactForm', status, session);
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(AddNoteSchema),
  });
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Card>
            <Card.Header className="text-center">Add Timestamped Note</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Note</Form.Label>
                  <textarea
                    {...register('note')}
                    className={`form-control ${errors.note ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.note?.message}</div>
                </Form.Group>
                <input type="hidden" {...register('owner')} value={currentUser} />
                <input type="hidden" {...register('contactId')} value={contact.id} />
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
                        reset
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddNoteForm;
