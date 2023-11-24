import { useState } from 'react';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import { addContact } from 'redux/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/contacts/contacts.selectors';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddContact = data => {
    const hasDuplicated = contacts.some(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );
    if (hasDuplicated) {
      alert(`'${data.name}' is already in contacts!`);
      return;
    }
    const newContact = {
      id: nanoid(),
      ...data,
    };

    dispatch(addContact(newContact));

    setPhone('');
    setName('');
  };

  const handleSubmit = event => {
    event.preventDefault();
    const data = {
      name,
      phone,
    };

    if (data.name.trim() !== '' && data.phone.trim() !== '') {
      handleAddContact(data);
    }
  };

  const handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;

    switch (name) {
      case 'name': {
        setName(value);
        return;
      }
      case 'phone': {
        setPhone(value);
        return;
      }

      default:
        return;
    }
  };

  return (
    <>
      <form className={css.formContainer} onSubmit={handleSubmit}>
        <label className={css.inputWrapper}>
          <p>Name</p>
          <input
            type="text"
            name="name"
            required
            pattern="[a-zA-Zа-яА-ЯіІїЇґҐєЄ']+"
            value={name}
            onChange={event => handleInputChange(event)}
          />
        </label>
        <label className={css.inputWrapper}>
          <p>Number</p>
          <input
            type="tel"
            name="phone"
            required
            pattern="^\+?\d{1,4}[ .\-]?\(?\d{1,3}\)?[ .\-]?\d{1,4}[ .\-]?\d{1,4}[ .\-]?\d{1,9}$"
            title="Format: XXX-XXX-XX-XX"
            value={phone}
            onChange={event => handleInputChange(event)}
          />
        </label>
        <button className={css.submitButton} type="submit">
          Add contact
        </button>
      </form>
    </>
  );
};

export default ContactForm;
