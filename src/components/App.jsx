import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import css from './App.module.css';

export const App = () => {
  const notify = () => toast('Wow so easy!');
  return (
    <div className={`${css.container} ${css.sectionWrapper}`}>
      <h1 className={css.phoneBookTitle}>Phonebook</h1>
      <ContactForm />
      <h2 className={css.contactsTitle}>Contacts</h2>
      <Filter />
      <ContactsList />
      <div>
        <button className={css.buttonNotify} onClick={notify}>
          Notify!
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};
