export const selectContacts = state => state.contactsStore.contacts.items;
export const selectContactsIsLoading = state => state.contactsStore.contacts.isLoading;
export const selectContactsError = state => state.contactsStore.contacts.error;

