import ContactItem from 'components/ContactItem/ContactItem';
import css from './ContactList.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/contacts/contacts.selectors';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';

export default function ContactsList() {
  const filter = useSelector(state => state.filtersStore.filters);
  const contacts = useSelector(selectContacts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts())
      .then(() => {
        // alert('Contacts downloaded successfully!');
        toast.success('Contact downloaded successfully!', {});
      })
      .catch(error => {
        // alert(`Error downloading contacts: ${error}`);
        toast.error(`Error downloading contact: ${error}`, {});
      });
  }, [dispatch]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={css.contactListWrapper}>
      <ul className={css.contactList}>
        {' '}
        {filteredContacts.map(contact => {
          return <ContactItem key={contact.id} contact={contact} />;
        })}
      </ul>
    </div>
  );
}
