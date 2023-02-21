const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

let editElement;
let edit = false;

form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);

// add item
function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const whitespace = grocery.value.trim();
    const errorMsg = document.querySelector("#errorMsg");
    if (whitespace == "") {
        errorMsg.innerHTML = "Please Enter item name";
        return;
    } else {
        errorMsg.innerHTML = "";
    }

    if (value !== "" && !edit) {
        const element = document.createElement("div");
        element.classList.add("grocery-item");
        element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn"><i class="fas fa-edit"></i></button>
              <button type="button" class="delete-btn"><i class="fas fa-trash"></i></button>
            </div>
          `;

        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", deleteItem);
        const editBtn = element.querySelector(".edit-btn");
        editBtn.addEventListener("click", editItem);
        list.appendChild(element);
        container.classList.add("show-container");
    } else if (value !== "") {
        editElement.innerHTML = value;
        setBackToDefault();
    }
    grocery.value = "";
}

// clear items
function clearItems() {
    const items = document.querySelectorAll(".grocery-item");
    if (list.innerHTML != "") {
        clearBtn.addEventListener("click", function () {
            list.innerHTML = "";
        });
    }
}

// delete item
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    list.removeChild(element);
}
// edit item
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    grocery.value = editElement.innerHTML;
    edit = true;
    editID = element.dataset.id;
    submitBtn.textContent = "Save";
}

function setBackToDefault() {
    grocery.value = "";
    edit = false;
    submitBtn.textContent = "Submit";
}
