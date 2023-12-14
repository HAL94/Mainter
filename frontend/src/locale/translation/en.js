const lang = {
  welcome: 'Welcome',
  signIn: 'Sign in to Mainter',
  emailAddress: 'Email Address',
  password: 'Password',
  forgotPassword: 'Forgot password?',
  login: 'Login',
  emailIsRequired: 'Email is required',
  passwordIsRequired: 'Password is required',
  passwordMin6Chars: 'Password must be at least 6 characters',
  emailValidFormat: 'Email must be valid',
  loginForm: {
    successMessage: 'Successfully Logged in',
    failMessage: 'Failed to Login, check your credentials',
  },
  clientForm: {
    fullNameIsRequired: 'Full Name is a Required Field',
    typeIsRequired: 'Type is Required',
    typeIsOneOrTwo: 'Type field must be an Individual or Business',
    label: {
      fullName: 'Full Name',
      businessName: 'Business Name',
      clientType: 'Type',
    },
    individual: 'Individual',
    business: 'Business',
  },
  vehicleForm: {
    makeIsRequired: "'Make' is a required field",
    modelIsRequired: "'Model' is a required field",
    yearIsRequired: "'Year' is a required field",
    plateIsRequired: "'Plate' is a required field",
    plateMustBeSaudi: "'Plate' must be a valid Saudi Plate",
    ownerIdIsRequired: "'Owner' is a required field",
    ownerIdMustBeNumber: "'Owner' must be a number",
    yearMustBe4digits: "'Year' must be in valid format (YYYY)",
    label: {
      ownerId: 'Owner',
      make: 'Make',
      model: 'Model',
      year: 'Year',
      plate: 'Plate No',
      engineNo: 'Enginer No',
    },
  },
  jobForm: {
    basicSectionTitle: 'Basic Information',
    clientSectionTitle: 'Choose Client',
    clientVehicleTitle: "Choose Client's Vehicle",
    workSectionTitle: 'Vehicle Job Tasks',
    label: {
      work: 'Work',
      cost: 'Cost',
      workPlaceholder: 'Replace Brakepads',
      costPlaceholder: '200',
    },
  },
  clients: {
    pageTitle: 'Clients',
    newClient: 'New Client',
    editClient: 'Edit Client',
    searchClients: 'Search clients...',
    addNewClient: 'Add New Client',
  },
  vehicles: {
    pageTitle: 'Vehicles',
    newVehicle: 'New Vehicle',
    editVehicle: 'Edit Vehicle',
    searchVehicles: 'Search Vehicles...',
    addNewVehicle: 'Add New Vehicle',
  },
  jobs: {
    pageTitle: 'Jobs',
    newJob: 'New Job',
    editJob: 'Edit Job',
    searchJobs: 'Search Jobs by client name, title, etc...',
    addNewJob: 'Add New Job',
    chooseStatus: 'Choose Status',
    updateStatus: 'Update Status',
    status: (status) =>
      ({
        UNDER_MAINTENANCE: 'Under Maintenance',
        COMPLETED: 'Completed',
        CANCELED: 'Canceled',
      })[status],
  },

  deleteSuccess: 'Successfully deleted record(s)',
  deleteModalTitle: 'Unable to delete record',
  deleteIdleModalTitle: 'Are you sure you would like to delete this record',
  deleteModalConfirm: 'Delete',
  deleteModalCancel: 'Cancel',
  deleteMultipleTitle: (x) => `Are you sure you would like to delete ${x} record(s)`,
  requiredField: 'Field is Required',
  mobileNumber: 'Mobile Number',
  mobileIsRequired: 'Mobile Number is Required',
  mustBeSaudiNumber: 'Field must be a valid Saudi number',
  submit: 'Submit',
  success: 'Success',
  failure: 'Failure',
  failMessage: 'An error has occured, try again',
  addIsDone: 'A new record is added',
  updateIsDone: 'Record has been updated',
  addAnother: 'you can continue adding more',
  chooseClientType: 'Choose Type',
  anyClientType: 'Any',
  add: 'Add',
  edit: 'Edit',
  delete: 'Delete',
  selected: 'Selected',
  close: 'Close',
  title: 'Title',
  description: 'Description',
};

export default lang;
