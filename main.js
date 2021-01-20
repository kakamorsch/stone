const distribution = require("./distribution");
let total = undefined;

let controller = false;

let first = true;

let billForTheRest = 0;

let contactLength = distribution.contacts.length;

const totalByProduct = product => {
  return product.price * product.quantity;
};

const totalToPay = clients => {
  controller == false //checks for the first iteration
    ? (total = clients.products.reduce((acc, product, idx) => {
        controller = true;
        idx === 0 //checks for the first iteration
          ? (acc = totalByProduct(product))
          : (acc = acc + totalByProduct(product));
        return acc;
      }, 0))
    : console.log("already executed");
  console.log(`total: ${total}`);
  if (total % contactLength == 0) {
    contactLength = contactLength - 1;
    console.log("tudo OK!");
    total = total - billForTheRest;
    return billForTheRest;
  } else {
    console.log("fracionário");
    if (first) {
      let bill = Math.floor(total / contactLength);
      billForTheRest = Math.ceil(total / contactLength);
      contactLength = contactLength - 1;
      first = false;
      total = total - bill;
      return bill;
    } else {
      contactLength = contactLength - 1;
      total = total - billForTheRest;
      return billForTheRest;
    }
  }
};

const getTotal = clients => {
  if (clients.contacts.length == 0) return "Error, the contact list is empty";
  if (clients.products.length == 0) return "Error, the product list is empty";
  //returns a list of tuples
  return clients.contacts.map(client => {
    return {
      costumer: client,
      bill: totalToPay(clients)
    };
  });
};

console.log(getTotal(distribution));
console.log(total);
