'use client';

import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/image';
import { Contact } from '../lib/validationSchemas';

/* Renders a single row in the List Stuff table. See list/page.tsx. */
const ContactCard = ({ contacts } : { contacts: Contact }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={contacts.image} alt="Contact Image" width={75} height={75} />
      <Card.Title>
        { contacts.firstName}
        &nbsp
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
  </Card>
);

export default ContactCard;
