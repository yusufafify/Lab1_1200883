const employee = [{ id: "1", name: "Mohamed Sayed" }];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  try {
    // Validate request body first
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: "The employee's ID is required",
      });
    }

    const existedEmployee = employee.find((emp) => emp.id === req.params.id);

    if (!existedEmployee) {
      return res.status(404).json({
        success: false,
        message: "There is no Employee with that ID",
      });
    }
    const indexOfEmployee = employee.indexOf(existedEmployee);
    employee.splice(indexOfEmployee, 1);

    // Send success response
    res.status(200).json({
      success: true,
      message: `Employee with id ${req.params.id} has been Deleted successfully!`,
    });
  } catch (error) {
    console.log(error);
    //Error response if there is an error while comunicating with the server
    res.status(500).json({
      success: false,
      message: "Failed To Delete employee please try again later!",
    });
  }
};

// TODO
exports.createEmployee = async (req, res, next) => {
  try {
    // Validate request body first
    if (!req.body.id || !req.body.name) {
      return res.status(400).json({
        success: false,
        message: "Both ID and Name are required fields",
      });
    }
    employee.push(req.body);

    // Send success response
    res.status(201).json({
      success: true,
      message: "Employee has been added successfully!",
    });
  } catch (error) {
    console.log(error);
    //Error response if there is an error while comunicating with the server
    res.status(500).json({
      success: false,
      message: "Failed To add employee please try again later!",
    });
  }
};
