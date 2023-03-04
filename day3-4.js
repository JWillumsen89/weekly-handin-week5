const url = "https://cars-jonathan.azurewebsites.net/api/cars";
//const url = "http://localhost:8080/api/cars";

const getAllCarsBtn = document.getElementById("btn-get-all");
const carsTableBody = document.getElementById("cars-tbody");
const carsTableDiv = document.getElementById("cars-table-div");

getAllCarsBtn.onclick = getAllCars;

function getAllCars() {
  if (carsTableDiv.style.display === "none") {
    getAllCarsBtn.innerHTML = "Hide All Cars";
    carsTableDiv.style.display = "block";
  } else {
    getAllCarsBtn.innerHTML = "Show All Cars";
    carsTableDiv.style.display = "none";
  }
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const rows = data
        .map(
          (d) => `<tr>
            <td>${d.id}</td><td>${d.brand}</td><td>${d.model}</td><td>${d.pricePrDay}</td><td>${d.bestDiscount}</td>
          </tr>`
        )
        .join("");
      carsTableBody.innerHTML = rows;
    });
}

const findByIdBtn = document.getElementById("find-car-id-btn");
const pCarError = document.getElementById("p-car-error");
const pCarBrand = document.getElementById("p-car-brand");
const pCarModel = document.getElementById("p-car-model");
const pCarDailyPrice = document.getElementById("p-car-daily-price");
const pCarMaxDiscount = document.getElementById("p-car-max-discount");
const pCarId = document.getElementById("p-car-id");
const singleCarContent = document.getElementById("single-car-content");
const carIdInput = document.getElementById("car-id");

findByIdBtn.addEventListener("click", () => {
  getCarById();
});

function getCarById() {
  const id = document.getElementById("car-id").value;

  if (!id) {
    singleCarContent.style.display = "none";
    pCarId.innerHTML = "";
    pCarBrand.innerHTML = "";
    pCarModel.innerHTML = "";
    pCarDailyPrice.innerHTML = "";
    pCarMaxDiscount.innerHTML = "";
    pCarError.style.display = "block";
    pCarError.innerHTML = "Please provide an id";
    return;
  }

  fetch(url + "/" + id)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject("Could not find car");
      }
      return res.json();
    })
    .then((car) => {
      pCarError.style.display = "none";
      singleCarContent.style.display = "block";
      pCarId.innerHTML = "ID: " + car.id;
      pCarBrand.innerHTML = "Brand: " + car.brand;
      pCarModel.innerHTML = "Model: " + car.model;
      pCarDailyPrice.innerHTML = "Price per day: " + car.pricePrDay;
      pCarMaxDiscount.innerHTML = "Best Discount: " + car.bestDiscount;
      carIdInput.value = "";
    })
    .catch((e) => {
      console.log("Error", e);
      singleCarContent.style.display = "none";
      pCarError.style.display = "block";
      pCarError.innerText = e;
    });
}

const createNewCarBtn = document.getElementById("create-new-car-btn");
const inputBrand = document.getElementById("input-brand");
const inputModel = document.getElementById("input-model");
const inputPrice = document.getElementById("input-price");
const inputDiscount = document.getElementById("input-discount");
const addCarError = document.getElementById("add-car-error");
const addCarSuccess = document.getElementById("add-car-success");
const carDataAdded = document.getElementById("car-data-added");

createNewCarBtn.onclick = createNewCar;

function createNewCar() {
  //check if input is ok
  if (
    !inputBrand.value ||
    !inputModel.value ||
    !inputPrice.value ||
    !inputDiscount.value
  ) {
    addCarError.style.display = "block";
    addCarSuccess.style.display = "none";
    carDataAdded.style.display = "none";
    inputBrand.classList.toggle("invalid", !inputBrand.value);
    inputModel.classList.toggle("invalid", !inputModel.value);
    inputPrice.classList.toggle("invalid", !inputPrice.value);
    inputDiscount.classList.toggle("invalid", !inputDiscount.value);
    return;
  }

  // If all fields ok, remove red color and <p> that shows error
  removeInvalidFields();

  const car = {
    brand: inputBrand.value,
    model: inputModel.value,
    pricePrDay: inputPrice.value,
    bestDiscount: inputDiscount.value,
  };

  console.log(car);
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  })
    .then((res) => res.json())
    .then((car) => {
      addCarSuccess.style.display = "block";
      if (carsTableDiv.style.display === "block") {
        getAllCars();
        carsTableDiv.style.display = "block";
        getAllCarsBtn.innerHTML = "Hide All Cars";
      }
      carDataAdded.innerHTML = `Car details: Brand: ${car.brand} - Model: ${car.model} - Price Per day: ${car.pricePrDay} - Best Discount: ${car.bestDiscount}`;
      carDataAdded.style.display = "block";
      clearInput();
    })
    .catch((error) => {
      console.log(error);
      addCarError.innerHTML = "Something went wrong. Try again later.";
      addCarError.style.display = "block";
    });
}

//Show the clear button when you start to type in the input fields for add new car.
const inputFieldsAddCar = document.querySelectorAll(".add-car-input");
const clearBtn = document.getElementById("clear-btn");

inputFieldsAddCar.forEach((input) => {
  input.addEventListener("keyup", () => {
    carDataAdded.style.display = "none";
    addCarSuccess.style.display = " none";
    const hasValue = Array.from(inputFieldsAddCar).some((field) => field.value);
    clearBtn.style.display = hasValue ? "block" : "none";
  });
});

clearBtn.onclick = clearInput;

function clearInput() {
  inputBrand.value = "";
  inputModel.value = "";
  inputPrice.value = "";
  inputDiscount.value = "";
  removeInvalidFields();
  clearBtn.style.display = "none";
}

//Removes the red colors from the fields that were missing input when adding a new car.
function removeInvalidFields() {
  addCarError.style.display = "none";
  inputBrand.classList.remove("invalid");
  inputModel.classList.remove("invalid");
  inputPrice.classList.remove("invalid");
  inputDiscount.classList.remove("invalid");
}

//Removes the searched car when typing in the input field
const inputFieldFindCar = document.getElementById("car-id");
inputFieldFindCar.addEventListener("keyup", () => {
  singleCarContent.style.display = "none";
});

const findByIdEditBtn = document.getElementById("find-car-edit-id-btn");
const pCarEditError = document.getElementById("p-car-edit-error");
const pCarEditBrand = document.getElementById("p-car-edit-brand");
const pCarEditModel = document.getElementById("p-car-edit-model");
const pCarEditDailyPrice = document.getElementById("p-car-edit-daily-price");
const pCarEditMaxDiscount = document.getElementById("p-car-edit-max-discount");
const pCarEditId = document.getElementById("p-car-edit-id");
const singleCarEditContent = document.getElementById("single-car-edit-content");
const carEditIdInput = document.getElementById("car-id2");
const editCarSubmitBtn = document.getElementById("edit-car-submit-btn");

//Gets the car you have searched for when you want to edit a car and shows the update button.
findByIdEditBtn.addEventListener("click", () => {
  getCarByIdForEdit();
  editCarSubmitBtn.style.display = "block";
});

function getCarByIdForEdit() {
  const id = document.getElementById("car-id2").value;

  if (!id) {
    singleCarEditContent.style.display = "none";
    pCarEditError.style.display = "block";
    pCarEditError.innerHTML = "Please provide an id";
    return;
  }
  fetch(url + "/" + id)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject("Could not find car");
      }
      return res.json();
    })
    .then((car) => {
      pCarEditError.style.display = "none";
      singleCarEditContent.style.display = "block";
      const editRow = `<tr>
            <td id="edit-id">${car.id}</td>
            <td id="edit-brand" contenteditable="true">${car.brand}</td>
            <td id="edit-model" contenteditable="true">${car.model}</td>
            <td id="edit-price" contenteditable="true">${car.pricePrDay}</td>
            <td id="edit-discount" contenteditable="true">${car.bestDiscount}</td>
          </tr>`;
      document.getElementById("car-edit-tbody").innerHTML = editRow;
    })
    .catch((e) => {
      console.log("Error", e);
      singleCarEditContent.style.display = "none";
      pCarEditError.style.display = "block";
      pCarEditError.innerText = e;
    });
}

//eventhandeler for the update car.
editCarSubmitBtn.addEventListener("click", () => {
  updateEditedCar()
});


const addCarEditError = document.getElementById("add-car-edit-error");
const addCarEditSuccess = document.getElementById("add-car-edit-success");
const carDataUpdated = document.getElementById("car-data-updated");

function updateEditedCar() {
  const editId = document.getElementById("edit-id").textContent;
  const editBrand = document.getElementById("edit-brand");
  const editModel = document.getElementById("edit-model");
  const editPrice = document.getElementById("edit-price");
  const editDiscount = document.getElementById("edit-discount");

  if (
    !editId ||
    !editBrand.textContent ||
    !editModel.textContent ||
    !editPrice.textContent ||
    !editDiscount.textContent
  ) {
    addCarEditError.style.display = "block";
    addCarEditSuccess.style.display = "none";
    carDataUpdated.style.display = "none";
    editBrand.classList.toggle("invalid", !editBrand.textContent);
    editModel.classList.toggle("invalid", !editModel.textContent);
    editPrice.classList.toggle("invalid", !editPrice.textContent);
    editDiscount.classList.toggle("invalid", !editDiscount.textContent);
    return;
  }

  editBrand.classList.remove("invalid");
  editModel.classList.remove("invalid");
  editPrice.classList.remove("invalid");
  editDiscount.classList.remove("invalid");
  addCarEditError.style.display = "none";

  const car = {
    id: editId,
    brand: editBrand.textContent,
    model: editModel.textContent,
    pricePrDay: editPrice.textContent,
    bestDiscount: editDiscount.textContent,
  };

  fetch(url + "/" + editId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  })
    .then((res) => res.json())
    .then((car) => {
      if (car) {
        addCarEditSuccess.style.display = "block";
        if (carsTableDiv.style.display === "block") {
          getAllCars();
          carsTableDiv.style.display = "block";
          getAllCarsBtn.innerHTML = "Hide All Cars";
        }
        const detailsString =
          "Car details: " +
          editId +
          " - " +
          editBrand.textContent +
          " - " +
          editModel.textContent +
          " - " +
          editPrice.textContent +
          " - " +
          editDiscount.textContent;
        carDataUpdated.innerHTML = detailsString;
        carDataUpdated.style.display = "block";
        carEditIdInput.value = "";
        singleCarEditContent.style.display = "none";
        editCarSubmitBtn.style.display = "none";
      }
    })
    .catch((error) =>
      alert("Something went wrong, try again later - Error message: ", error)
    );

  console.log(car);
}


//Removes the submit update car button when you start typing something new in the input field
carEditIdInput.addEventListener("keyup", () => {
  editCarSubmitBtn.style.display = "none";
  singleCarEditContent.style.display = "none";
  addCarEditSuccess.style.display = "none";
  carDataUpdated.style.display = "none";
});
