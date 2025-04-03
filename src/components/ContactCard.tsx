'use client';

import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/image';
// import { Contact } from '../lib/validationSchemas';
import Link from 'next/link';
import { Contact } from '@prisma/client';

/* Renders a single row in the List Stuff table. See list/page.tsx. */
const ContactCard = ({ contacts } : { contacts: Contact }) => (
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
    </Card.Body>
    <Card.Footer>
      <Link href={`edit/${contacts.id}`}>Edit</Link>
    </Card.Footer>
  </Card>
);

export default ContactCard;
