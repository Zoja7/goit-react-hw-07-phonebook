import ContactItem from 'components/ContactItem/ContactItem';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/contacts/contacts.selectors';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';

export default function ContactsList() {
  const filter = useSelector(state => state.filtersStore.filters);
  const contacts = useSelector(selectContacts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
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
