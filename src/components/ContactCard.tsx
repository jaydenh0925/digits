'use client';

import { Card, Image, ListGroup } from 'react-bootstrap';
import Link from 'next/link';
import { Contact, Note } from '@prisma/client';
import NoteItem from '@/components/NoteItem';
import AddNoteForm from './AddNoteForm';

/* Renders a single row in the List Stuff table. See list/page.tsx. */
const ContactCard = ({ contacts, notes } : { contacts: Contact; notes: Note[] }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={contacts.image} alt="Contact Image" width={75} height={75} />
      <Card.Title>
        {contacts.firstName}
        &nbsp;
        { contacts.lastName }
      </Card.Title>
      <Card.Subtitle>
        { contacts.address }
      </Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>
        { contacts.description }
      </Card.Text>
      <ListGroup variant="flush">
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ListGroup>
      <AddNoteForm contact={contacts} />
    </Card.Body>
    <Card.Footer>
      <Link href={`edit/${contacts.id}`}>Edit</Link>
    </Card.Footer>
  </Card>
);

export default ContactCard;
