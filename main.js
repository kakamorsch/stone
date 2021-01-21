const distribution = require("./distribution");
let total = 0; // total to be payed
let distributed = {}; // an object to store the distributed values

// counting the total price to be payed
const totalBill = products => {
  total = products.reduce((acc, product, idx) => {
    idx === 0 //checks for the first iteration
      ? (acc = product.price * product.quantity)
      : (acc = acc + product.price * product.quantity);
    return acc;
  }, 0);
  return total;
};

const totalToPay = clients => {
  //for each client the total value is decreased
  clients.contacts.reduce((acc, contact, idx, contacts) => {
    let bill;
    if (idx === 0) {
      bill = Math.floor(acc / contacts.length);
      acc = acc - bill;
    } else {
      bill = Math.ceil(acc / (contacts.length - idx));
      acc = acc - bill;
    }
    total = acc;
    distributed[contact] = bill;
    return acc;
  }, totalBill(clients.products));
  return distributed;
};
// function that outputs everything or just the desired user
const distribute = (clients, contact) => {
  if (clients.contacts.length == 0) return "Error, the contact list is empty";
  if (clients.products.length == 0) return "Error, the product list is empty";
  if (contact) return totalToPay(clients)[contact];
  return totalToPay(clients);
};

console.log(distribute(distribution));
