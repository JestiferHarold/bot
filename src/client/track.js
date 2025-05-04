async function trackSavedContacts(wwclient) {
    let savedContacts = new Array()
    let contacts = await wwclient.getContacts()
    for (let i = 0; i < contacts.length; i ++) {
        if (contacts[i].isMyContact) {
            savedContacts.push(new SavedContacts(contacts[i].name, contacts[i].number, contacts[i].id))
        }
    }

    return savedContacts
}

export default trackSavedContacts