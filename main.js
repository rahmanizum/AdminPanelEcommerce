

//Assigning elements to variables
const form = document.querySelector(`#my-form`);
const price = document.getElementById("price");
const productName = document.getElementById("pname");
const submitButton = document.getElementById(`submitbtn`)
const tableBody = document.getElementById(`tablebody`);
const tablefootData = document.getElementById(`tablefootdata`);


// ON SUBMIT FUNCTION 
async function onSubmit(e) {
  e.preventDefault();

  // Creating product object
  const productdata = {
    productPrice: price.value,
    productName: productName.value,
  };
  console.log(JSON.stringify(productdata));

  try {
    // Add to server using async/await
    const postResponse = await axios.post(
      `https://crudcrud.com/api/7bb295ef39934ecf9eeb2b038b4e1139/productdata`,
      { productdata }
    );

    console.log(`${postResponse.data.productdata.productName} added`);
    console.log(postResponse);

    // Print on the browser by getting data
    const getResponse = await axios.get(
      `https://crudcrud.com/api/7bb295ef39934ecf9eeb2b038b4e1139/productdata`
    );

    console.log(`data fetched for printing`);
    showOutput(getResponse);
    console.log(getResponse);
  } catch (err) {
    console.error(err);
  }
}


// ON EDITORDELETE FUNCTION 
async function onEditorDelete(e) {
  e.preventDefault();
  // get data from button
  const btnId = e.target.id;

  // WHEN CLICK EDIT BUTTON
  if (e.target && e.target.classList.contains("editbtn")) {
    console.log(e.target);

    try {
      // Get data from server
      const res = await axios.get(
        `https://crudcrud.com/api/7bb295ef39934ecf9eeb2b038b4e1139/productdata/${btnId}`
      );

      editing(res);
      console.log(res);
      console.log(`${res.data.productdata.productName} ready for editing`);

      // Delete from server
      await axios.delete(
        `https://crudcrud.com/api/7bb295ef39934ecf9eeb2b038b4e1139/productdata/${btnId}`
      );

      console.log(`This id : ${btnId}  data deleted`);

      // Delete from browser
      e.target.parentElement.parentElement.remove();

      // Make ready total for updation
      tablefootData.innerHTML = `Total Value worth of products : edit product to fetch total`;
    } catch (err) {
      console.error(err);
    }
  }

  // WHEN CLICK DELETE BUTTON
  if (e.target && e.target.classList.contains("delbtn")) {
    try {
      // Remove from server
      await axios.delete(
        `https://crudcrud.com/api/7bb295ef39934ecf9eeb2b038b4e1139/productdata/${btnId}`
      );

      console.log(`This id : ${btnId} data deleted`);

      // Remove from browser
      e.target.parentElement.parentElement.remove();
    } catch (err) {
      console.error(err);
    }
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
async function refresh() {
  try {
    const res = await axios.get(
      `https://crudcrud.com/api/7bb295ef39934ecf9eeb2b038b4e1139/productdata`
    );

    console.log(`1st time printing`);
    showOutput(res);
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

// Call the fetchData function when needed
refresh();

// Event listeners

submitButton.addEventListener('click',onSubmit);
tableBody.addEventListener('click',onEditorDelete);
