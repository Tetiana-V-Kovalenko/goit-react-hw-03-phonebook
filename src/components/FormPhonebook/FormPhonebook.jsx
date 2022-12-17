import React from 'react';
import PropTypes from 'prop-types';
import css from './FormPhonebook.module.css';

class FormPhonebook extends React.Component {
  static defaultProps = {
    name: '',
    number: '',
  };
  state = {
    name: this.props.name,
    number: this.props.number,
  };
  saveData = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };
  addContact = e => {
    e.preventDefault();

    this.props.onFormSubmit(this.state);

    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form onSubmit={this.addContact} className={css.form}>
        <label className={css.inputPhonebook}>
          Name:
          <input
            onChange={this.saveData}
            value={this.state.name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={css.inputPhonebook}>
          Number:
          <input
            onChange={this.saveData}
            value={this.state.number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={css.btnAddContact} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
FormPhonebook.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  onSubmitForm: PropTypes.func,
};
export default FormPhonebook;
