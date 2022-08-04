const contact = require("./contact");
const argv = require("yargs").argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const list = await contact.listContacts();
      console.log(list);
      break;
    case "get":
      const get = await contact.getContactById(id);
      console.log(get);
      break;
    case "add":
      const add = await contact.addContact(name, email, phone);
      console.log(add);
      break;
    case "remove":
      const remove = await contact.removeContact(id);
      console.log(remove);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
