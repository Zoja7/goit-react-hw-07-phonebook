import { deleteContact } from 'redux/operations';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './ContactItem.module.css';
import { ReactComponent as IconTrash } from 'assets/icons/trashSvg.svg';
import { useDispatch } from 'react-redux';
import Loader from 'components/Loader/Loader';
import { useState } from 'react';

export default function ContactItem({ contact }) {
  const dispatch = useDispatch();
  // const isLoadingFromRedux = useSelector(selectContactsIsLoading);
  const [isLoading, setIsLoading] = useState(false);

  const { name, phone, id } = contact;
  const handleDeleteContact = id => {
    setIsLoading(true);
    dispatch(deleteContact(id))
      .then(() => {
        setIsLoading(false);
        // alert('Contact deleted successfully!');
        toast.success('Contact deleted successfully!', {});
      })
      .catch(error => {
        setIsLoading(false);
        // alert(`Error deleting contact: ${error}`);
        toast.error(`Error deleting contact: ${error}`, {});
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
