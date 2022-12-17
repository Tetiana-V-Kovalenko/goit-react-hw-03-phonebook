import React from 'react';
import { nanoid } from 'nanoid';

import FormPhonebook from './FormPhonebook/FormPhonebook';
import Filter from './Contacts/Filter';
import Contacts from './Contacts/Contacts';

export class App extends React.Component {
  static defaultProps = {
    contacts: [],
    filter: '',
  };

  state = {
    contacts: this.props.contacts,
    filter: this.props.filter,
  };

  componentDidMount() {
    const contactsStorage = JSON.parse(localStorage.getItem('contactsStorage'));
    if (contactsStorage) {
      this.setState({ contacts: contactsStorage });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(
        'contactsStorage',
        JSON.stringify(this.state.contacts)
      );
    }
  }
  onFormSubmit = contact => {
    if (this.state.contacts.find(copy => copy.name === contact.name)) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    contact.id = nanoid();
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  filterContacts = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filterArr = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <h1 style={{ marginLeft: '50px' }}>Phonebook</h1>
        <FormPhonebook onFormSubmit={this.onFormSubmit} />
        <h2 style={{ marginLeft: '50px' }}>Contacts</h2>
        <Filter query={filter} filterContact={this.filterContacts} />
        {contacts.length === 0 ? (
          <p style={{ marginLeft: '30px' }}>There are no contact</p>
        ) : filter !== '' ? (
          <Contacts contacts={filterArr} onDeleteContact={this.deleteContact} />
        ) : (
          <Contacts contacts={contacts} onDeleteContact={this.deleteContact} />
        )}
      </div>
    );
  }
}
