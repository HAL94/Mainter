const lang = {
  welcome: 'أهلا وسهلاً',
  signIn: 'تسجيل الدخول لنظام مينتر',
  emailAddress: 'الإيميل الإلكتروني',
  password: 'كلمة المرور',
  forgotPassword: 'هل نسيت كلمة المرور؟',
  login: 'تسجيل الدخول',
  emailIsRequired: 'الإيميل حقل مطلوب',
  passwordIsRequired: 'كلمة المرور حقل مطلوب',
  passwordMin6Chars: 'كلمة المرور يجب أن تتكون من 6 عناصر كحد أدنى',
  emailValidFormat: 'حقل الإيميل يجب أن يكون بصيغة صحيحة',
  loginForm: {
    successMessage: 'تم تسجيل الدخول بنجاح',
    failMessage: 'حدث خطأ في العملية، تأكد من المدخلات',
  },
  clients: {
    pageTitle: 'العملاء',
    newClient: 'إضافة عميل جديد',
    editClient: 'تعديل بيانات العميل',
    searchClients: 'ابحث عن العملاء بالأسم',
    addNewClient: 'إضافة عميل جديد',
  },
  vehicles: {
    pageTitle: 'المركبات',
    newVehicle: 'إضافة مركبة',
    editVehicle: 'تعديل بيانات مركبة',
    searchVehicles: 'بحث المركبات...',
    addNewVehicle: 'إضافة مركبة جديدة',    
  },
  jobs: {
    pageTitle: 'أوامر الصيانة',
    newJob: 'إضافة أمر صيانة',
    editJob: 'تعديل أمر صيانة',
    searchJobs: 'البحث باسم الأمر أو اسم العميل',
    addNewJob: 'إضافة أمر جديد',
    chooseStatus: 'اختر حالة الأمر',
    updateStatus: 'تحديث الحالة',
    status: (status) =>
      ({
        UNDER_MAINTENANCE: 'تحت الصيانة',
        COMPLETED: 'مكتمل',
        CANCELED: 'ملغي',
      })[status],
  },
  clientForm: {
    fullNameIsRequired: 'الأسم الكامل حقل مطلوب',
    typeIsRequired: 'الحقل (نوعية العميل) مطلوب',
    typeIsOneOrTwo: 'الحقل (نوعية العميل) يجب أن يكون (فرد أو شركة)',
    label: {
      fullName: 'الأسم الكامل',
      businessName: 'اسم الشركة',
      clientType: 'نوعية العميل',
    },
    individual: 'فرد',
    business: 'شركة',
  },
  vehicleForm: {
    makeIsRequired: "'الشركة المصنعة'حقل مطلوب",
    modelIsRequired: "'الموديل 'حقل مطلوب",
    yearIsRequired: "'سنة الصنع 'حقل مطلوب",
    plateIsRequired: "'رقم اللوحة 'حقل مطلوب",
    plateMustBeSaudi: "'رقم اللوحة' يجب أن تكون بصيفة سعودية",
    ownerIdIsRequired: "المالك حقل مطلوب",
    ownerIdMustBeNumber: "المالك يجب أن يكون رقم",
    yearMustBe4digits: "السنة يجب أن تكون بصيغة (YYYY)",
    label: {
      ownerId: 'المالك',
      make: 'شركة الصنع',
      model: 'الموديل',
      year: 'السنة',
      plate: 'رقم اللوحة',
      engineNo: 'رقم المكينة',
    },
  },
  jobForm: {
    basicSectionTitle: 'معلومات الصيانة',
    clientSectionTitle: 'اختيار العميل',
    clientVehicleTitle: "معلومات المركبة",
    workSectionTitle: ' أعمال الصيانة للمركبة',    
    label: {
      work: 'اسم العمل',
      cost: 'التكلفة ر.س',
      workPlaceholder: 'تبديل قماشات',
      costPlaceholder: '200'
    }
  },
  deleteModalTitle: 'حدث خطأ في النظام، الرجاء المحاولة لاحقاً',
  deleteIdleModalTitle: 'هل أنت متأكد من عملية حذف البيانات؟',
  deleteModalConfirm: 'تأكيد الحذف',
  deleteModalCancel: 'الغاء',
  deleteMultipleTitle: (x) => `هل أنت متأكد من حذف ${x} عناصر؟`,
  deleteSuccess: 'تم حذف البيانات',
  requiredField: 'الحقل مطلوب',
  mobileNumber: 'الجوال',
  mobileIsRequired: 'رقم الجوال حقل مطلوب',
  mustBeSaudiNumber: 'يجب أن يكون الحقل رقم جوال سعودي صحيح',
  submit: 'إضافة',
  success: 'تمت العملية بنجاح',
  failure: 'فشلت العملية',
  failMessage: 'لقد حدث خطأ في النظام',
  addIsDone: 'تمت إضافة البيانات',
  updateIsDone: 'تم تعديل البيانات',
  addAnother: 'يمكنك المتابعة بإضافة بيانات إضافية',
  chooseClientType: 'اختر نوعية العميل',
  anyClientType: 'الكل',
  add: 'إضافة',
  edit: 'تعديل',
  delete: 'حذف',
  selected: 'محدد',
  title: 'العنوان',
  description: 'الوصف',
  noResultsFor: 'لا يوجد نتائج لكلمة البحث المدخلة',
  noResultsTitle: 'لا يوجد',
  noTableData: 'لا يوجد بيانات',
  tryChangingWord: 'انتبه لطريقة اإملاء أو جرب كلمات أخرى'

};

export default lang;
