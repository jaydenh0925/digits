'use client';

import { Card, Image, ListGroup } from 'react-bootstrap';
// import { Contact } from '../lib/validationSchemas';
import Link from 'next/link';
import { Contact, Note } from '@prisma/client';
import NoteItem from '@/components/NoteItem';

/* Renders a single row in the List Stuff table. See list/page.tsx. */
const ContactCardAdmin = ({ contact, notes } : { contact: Contact; notes: Note[] }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={contact.image} alt="Contact Image" width={75} height={75} />
      <Card.Title>
        {contact.firstName}
        &nbsp;
        { contact.lastName }
      </Card.Title>
      <Card.Subtitle>
        { contact.address }
      </Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>
        { contact.description }
      </Card.Text>
      <ListGroup variant="flush">
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ListGroup>
      <p className="blockquote-footer">{contact.owner}</p>
    </Card.Body>
    <Card.Footer>
      <Link href={`edit/${contact.id}`}>Edit</Link>
    </Card.Footer>
  </Card>
);

export default ContactCardAdmin;
