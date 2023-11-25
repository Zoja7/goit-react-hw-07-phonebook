import { useState } from 'react';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import { addContact } from 'redux/operations';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  selectContactsIsLoading,
} from 'redux/contacts/contacts.selectors';
import Loader from 'components/Loader/Loader';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectContactsIsLoading);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddContact = data => {
    const hasDuplicated = contacts.some(
      contact =>
        contact.name.toLowerCase() === data.name.toLowerCase() &&
        contact.phone.toLowerCase() === data.phone.toLowerCase()
    );
    if (hasDuplicated) {
      alert(`'${data.name && data.phone}' is already in contacts!`);
      // toast.success('${data.name && data.phone}' is already in contacts', {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
      return;
    }
    const newContact = {
      id: nanoid(),
      ...data,
    };

    // dispatch(addContact(newContact));
    // setPhone('');
    // setName('');

    dispatch(addContact(newContact))
      .then(() => {
        setPhone('');
        setName('');
        alert('Contact added successfully!');
        // toast.success('Contact added successfully!', {
        //   position: 'top-right',
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: 'light',
        // });
      })
      .catch(error => {
        alert(`Error adding contact: ${error}`);

        // toast.error(`Error adding contact: ${error}`, {
        //   position: 'top-right',
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: 'light',
        // });
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const data = {
      name,
      phone,
    };

    if (
      data.name.toLowerCase().trim() !== '' &&
      data.phone.toLowerCase().trim() !== ''
    ) {
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
          {isLoading ? <Loader /> : 'Add contact'}
        </button>
      </form>
    </>
  );
};

export default ContactForm;
