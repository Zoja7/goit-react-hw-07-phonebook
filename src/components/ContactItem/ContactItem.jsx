import { deleteContact } from 'redux/operations';
import css from './ContactItem.module.css';
import { ReactComponent as IconTrash } from 'assets/icons/trashSvg.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectContactsIsLoading } from 'redux/contacts/contacts.selectors';
import Loader from 'components/Loader/Loader';
export default function ContactItem({ contact }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectContactsIsLoading);

  const { name, phone, id } = contact;
  const handleDeleteContact = id => {
    dispatch(deleteContact(id))
      .then(() => {
        alert('Contact deleted successfully!');
      })
      .catch(error => {
        alert(`Error deleting contact: ${error}`);
      });
  };
  return (
    <li className={css.contactItem}>
      <span className={css.contactName}>{name}</span>
      <span className={css.contactNumber}> {phone}</span>

      <button
        className={css.deleteButton}
        type="button"
        onClick={() => {
          handleDeleteContact(id);
        }}
      >
        {isLoading ? <Loader /> : <IconTrash className={css.svgIcon} />}
        {/* <IconTrash className={css.svgIcon} /> */}
      </button>
    </li>
  );
}
