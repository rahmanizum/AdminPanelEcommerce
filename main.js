

//Assigning elements to variables
const form = document.querySelector(`#my-form`);
const price = document.getElementById("price");
const productName = document.getElementById("pname");
const submitButton = document.getElementById(`submitbtn`)
const tableBody = document.getElementById(`tablebody`);
const tablefootData = document.getElementById(`tablefootdata`);


// ON SUBMIT FUNCTION 
async function onSubmit(e){
    e.preventDefault();
//creating person object
    const productdata = {
        productPrice: price.value,
        productName : productName.value ,
    }
    console.log(JSON.stringify(productdata));

//add to server 
await axios.post(`https://crudcrud.com/api/4b781f11bd6f4f4bad1d439db6116eaa/productdata`, { productdata })
  .then((res) => {
    console.log(`${res.data.productdata.productName} added`);
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
  //print on browser by get 
  axios.get(`https://crudcrud.com/api/4b781f11bd6f4f4bad1d439db6116eaa/productdata`)
  .then((res) => { 
    console.log(`data feched for printing`);
    showOutput(res);
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
    
}

// ON EDITORDELETE FUNCTION 
function onEditorDelete(e){
    e.preventDefault();
    // get data from button
    const btnId = e.target.id;
  //WHEN CLICK EDIT BUTTON
if (e.target && e.target.classList.contains("editbtn")){
    console.log(e.target);
//get from server 
axios
.get(`https://crudcrud.com/api/4b781f11bd6f4f4bad1d439db6116eaa/productdata/${btnId}`)
.then(res=>{
    editing(res);
    console.log(res);
    console.log(`${res.data.productdata.productName} ready for editing`);
})
.catch(err=>console.error(err));

//delete from server 
axios
.delete(`https://crudcrud.com/api/4b781f11bd6f4f4bad1d439db6116eaa/productdata/${btnId}`)
.then(res=>console.log(`This id : ${btnId}  data deleted`))
.catch(err=> console.error(err));

//delete from browser
e.target.parentElement.parentElement.remove();
//replace values for editing 
function editing(res){
    const editProduct = res.data.productdata;
    price.value= editProduct.productPrice;
    productName.value = editProduct.productName;
}
// make ready total for updation 
tablefootData.innerHTML = `Total Value worth of products : edit product to fetch total`
}
// WHEN CLICK DELETE BUTTON 
if (e.target && e.target.classList.contains("delbtn")){
//remove from server 
axios
.delete(`https://crudcrud.com/api/4b781f11bd6f4f4bad1d439db6116eaa/productdata/${btnId}`)
.then(res=>console.log(`This id : ${btnId} data deleted`))
.catch(err=> console.error(err));
//remove from browser
e.target.parentElement.parentElement.remove();

}
}

// FUNCTION FOR ADDING TO BROWSER
function showOutput(res){
  let totalPrice = 0;
    console.log(res.data);
    tableBody.innerHTML=tableBody.children[0].outerHTML;
    res.data.forEach((ele,index) => {
      totalPrice+= Number(ele.productdata.productPrice);
        const tr = document.createElement(`tr`);
        tr.className = 'nowrap';
        const val = ele.productdata;
        const userId = ele._id;
        const txt = `
        <td>${index+1}</td>
        <td>${val.productName}</td>
        <td>${val.productPrice}</td>
        <td>
            <button class="btn btn-success editbtn" id = ${userId}>
                edit
            </button>
        </td>
        <td>
            <button class="btn btn-danger delbtn" id = ${userId}>
                delete
            </button>
        </td>
        `;
        //appending details to table
        tr.innerHTML+=txt;
        tableBody.appendChild(tr);   
    });

    //updating the total value worth products 
tablefootData.innerHTML = `Total Value worth of products : &#8377;${totalPrice}.00`
        // reinitiate to blank
        price.value = '';
        productName.value = '';
}

// PRINTING DATA WHEN CUSTOMER OPEN WEBSITE
axios
.get(`https://crudcrud.com/api/4b781f11bd6f4f4bad1d439db6116eaa/productdata`)
.then((res) => { 
  console.log(`!1 st time printing`);
  showOutput(res);
  console.log(res);
})
.catch((err) => {
  console.error(err);
});

// Event listeners

submitButton.addEventListener('click',onSubmit);
tableBody.addEventListener('click',onEditorDelete);
