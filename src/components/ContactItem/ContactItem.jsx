import { deleteContact } from 'redux/operations';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        // alert('Contact deleted successfully!');
        toast.success('Contact deleted successfully!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      })
      .catch(error => {
        // alert(`Error deleting contact: ${error}`);
        toast.error(`Error deleting contact: ${error}`, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
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
