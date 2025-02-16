function fetchEmployees() {
  fetch("http://localhost:3000/api/v1/employee")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("dataTable");
      tableBody.innerHTML = "";
      const list = data.data;
      list.forEach((item, i) => {
        const row = document.createElement("tr");
        const idCell = document.createElement("td");
        idCell.textContent = item.id;
        row.appendChild(idCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn", "btn-danger", "btn-sm");
        deleteCell.appendChild(deleteButton);

        // TODO
        // add event listener to delete button
        deleteButton.addEventListener("click", async () => {
          await deleteEmployee(item.id);
        });

        row.appendChild(deleteCell);

        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error(error));
}

// TODO
// add event listener to submit button
document
  .getElementById("employeeForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    await createEmployee();
  });

// TODO
async function createEmployee() {
  // get data from input field
  const employeeName = document.getElementById("name").value;
  const employeeId = document.getElementById("id").value;

  // send data to BE
  try {
    const response = await fetch("http://localhost:3000/api/v1/employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify JSON format
      },
      body: JSON.stringify({
        id: employeeId,
        name: employeeName,
      }),
    });
    const data = await response.json();
    document.getElementById("name").value = "";
    document.getElementById("id").value = "";
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    // call fetchEmployees
    fetchEmployees();
  }
}

// TODO
async function deleteEmployee(employeeId) {
  // get id
  // send id to BE
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/employee/${employeeId}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    // call fetchEmployees
    fetchEmployees();
  }
}

fetchEmployees();
