const shortid = require("shortid");
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId.toString());
  return result || null;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const contact = {
    id: shortid(),
    name,
    email,
    phone,
  };
  contacts.push(contact);
  await updateContacts(contacts);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((i) => i.id === contactId.toString());
  if (idx === -1) {
    return null;
  }
  const [result] = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

// const contactsPath = path.resolve("./db/contacts.json");

// function listContacts() {
//   fs.readFile(contactsPath)
//     .then((data) => console.log(JSON.parse(data)))

//     .catch((error) => console.log(error.message));
// }

// function getContactById(contactId) {
//   fs.readFile(contactsPath)
//     .then((data) => {
//       const contact = JSON.parse(data).find((c) => c.id.includes(contactId));
//       console.log("get", contactId, contact);
//     })
//     .catch((error) => console.log(error.message));
// }

// function addContact(name, email, phone) {
//   (async () => {
//     let dataContact = [];
//     let contact = {};
//     await fs
//       .readFile(contactsPath)
//       .then((data) => {
//         dataContact = JSON.parse(data);
//         contact = {
//           id: shortid(),
//           name,
//           email,
//           phone,
//         };
//         dataContact.push(contact);
//       })
//       .catch((error) => console.log(error.message));
//     await fs
//       .writeFile(contactsPath, JSON.stringify(dataContact, null, 2))
//       .then((data) => {
//         console.log(data);
//         if (data === undefined) {
//           console.log("add", contact);
//         }
//       })
//       .catch((error) => console.log(error.message));
//   })();
// }

// function removeContact(contactId) {
//   console.log("remove", contactId);
//   let dataContact = "";
//   (async () => {
//     await fs
//       .readFile(contactsPath)
//       .then((data) => {
//         dataContact = JSON.parse(data).filter(
//           (c) => c.id !== contactId.toString()
//         );
//       })
//       .catch((error) => console.log(error.message));
//     await fs
//       .writeFile(contactsPath, JSON.stringify(dataContact, null, 2))
//       .then((data) => console.log(data))
//       .catch((error) => console.log(error.message));
//   })();
// }
