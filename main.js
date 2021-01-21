const distribution = require("./distribution");
let total = 0; // quanto falta do montante

let distributed = []; //array contendo os valores distribuidos pelos emails
const totalByProduct = products => {
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
    console.log(`acc before: ${acc}`)
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
  },totalByProduct(clients.products))

  console.log(distributed)
  console.log(total)
  return total
  /*  if (total % contactLength == 0) {
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
  } */
};
totalToPay(distribution)
const getTotal = clients => {
  if (clients.contacts.length == 0) return "Error, the contact list is empty";
  if (clients.products.length == 0) return "Error, the product list is empty";

  let{total, costumer, bill} = totalToPay(clients)
  //returns a list of tuples
  return clients.contacts.map(client => {
    return {
      costumer: client,
      bill: totalToPay(clients)
    };
  });
};

