const distribution = require("./distribution");
let total = 0; // quanto falta do montante
let distributed = []; //array contendo os valores distribuidos pelos emails

const totalBill = products => {
  total = products.reduce((acc, product, idx) => {
    idx === 0 //checks for the first iteration
      ? (acc =product.price * product.quantity)
      : (acc = acc + product.price * product.quantity);
    return acc;
  }, 0)
  return total
};

const totalToPay = clients => {
  //cuidado magia negra abaixo
  clients.contacts.reduce((acc, contact, idx, contacts)=>{
    let bill
    if(idx==0){
      bill = Math.floor(acc / contacts.length)
      acc = acc - bill 
    } else {
      bill = Math.ceil(acc / (contacts.length - idx))
      acc = acc - bill
    }
    total = acc 
    distributed.push({contact, bill})    
    return acc
  },totalBill(clients.products))
  return total
};

const distribute = clients => {
  if (clients.contacts.length == 0) return "Error, the contact list is empty";
  if (clients.products.length == 0) return "Error, the product list is empty";
  //returns a list of tuples
  return totalToPay(clients)
};

console.log(distribute(distribution))
console.log(distributed)