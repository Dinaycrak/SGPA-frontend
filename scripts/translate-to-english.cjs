const fs = require('fs');
const path = require('path');

const files = {
  'src/lib/components/Header.svelte': [
    ['Logo de la universidad CUL', 'CUL university logo'],
    ['Sistema de Gestión de Proyectos Académicos', 'Academic Project Management System'],
    ['Navegación principal', 'Main navigation'],
    ['Inicio', 'Home'],
    ['Cómo funciona', 'How it works'],
    ['Equipo', 'Team'],
    ['Ingresar', 'Log in']
  ],

  'src/lib/components/Header_L.svelte': [
    ['Logo de la universidad CUL', 'CUL university logo'],
    ['Sistema de Gestión de Proyectos Académicos', 'Academic Project Management System'],
    ['Navegación principal', 'Main navigation'],
    ['Inicio', 'Home']
  ],

  'src/lib/components/Header_St.svelte': [
    ['Logo de la universidad CUL', 'CUL university logo'],
    ['Sistema de Gestión de Proyectos Académicos', 'Academic Project Management System'],
    ['Navegación principal', 'Main navigation'],
    ['Inicio', 'Home'],
    ['Ingreso', 'Login']
  ],

  'src/lib/components/Footer.svelte': [
    [
      'Sistema de Gestión de Proyectos Académicos orientado al seguimiento,\n        organización y consulta de proyectos dentro del entorno institucional.',
      'Academic Project Management System focused on tracking,\n        organizing, and consulting projects within the institutional environment.'
    ],
    ['CONTACTO', 'CONTACT'],
    ['Calle 58 # 55 - 24A Barranquilla - Colombia', '58th Street #55-24A Barranquilla, Colombia'],
    ['Correo: promocion@ul.edu.co', 'Email: promocion@ul.edu.co'],
    ['Teléfono: (+57) 314 8962734', 'Phone: (+57) 314 8962734'],
    ['ENLACES ÚTILES', 'USEFUL LINKS'],
    ['Inicio', 'Home'],
    ['Ingreso al sistema', 'System login'],
    ['Política de tratamiento de datos', 'Data processing policy'],
    ['Soporte al usuario', 'User support'],
    ['MÓDULOS', 'MODULES'],
    ['Coordinador', 'Coordinator'],
    ['Docente', 'Teacher'],
    ['Estudiante', 'Student']
  ],

  'src/lib/components/CoordinatorSideBar.svelte': [
    ['Panel principal', 'Main panel'],
    ['Proyectos', 'Projects'],
    ['Crear proyecto', 'Create project'],
    ['Docentes', 'Teachers'],
    ['Estudiantes', 'Students'],
    ['Crear usuarios', 'Create users'],
    ['Cerrar menú lateral', 'Close side menu'],
    ['Abrir menú lateral', 'Open side menu'],
    ['Módulo coordinador', 'Coordinator module'],
    ['Menú coordinador', 'Coordinator menu']
  ],

  'src/lib/components/StudentSideBar.svelte': [
    ['Panel principal', 'Main panel'],
    ['Proyectos disponibles', 'Available projects'],
    ['Mis proyectos', 'My projects'],
    ['Perfil', 'Profile'],
    ['Cerrar menú lateral', 'Close side menu'],
    ['Abrir menú lateral', 'Open side menu'],
    ['Módulo estudiante', 'Student module'],
    ['Menú estudiante', 'Student menu']
  ],

  'src/lib/components/TeacherSideBar.svelte': [
    ['Panel principal', 'Main panel'],
    ['Proyectos disponibles', 'Available projects'],
    ['Proyectos asignados', 'assigned projects'],
    ['Perfil', 'Profile'],
    ['Cerrar menú lateral', 'Close side menu'],
    ['Abrir menú lateral', 'Open side menu'],
    ['Módulo docente', 'Teacher module'],
    ['Menú docente', 'Teacher menu']
  ],

  'src/lib/components/Dashboard.svelte': [
    ['Panel principal', 'Main panel'],
    ['Panel SGPA', 'SGPA dashboard'],
    [
      'Consulta la información principal del sistema de gestión de proyectos académicos.',
      'Check the main information of the academic project management system.'
    ],
    ['Gestión académica', 'Academic management'],
    [
      'Organiza proyectos, usuarios y procesos académicos desde un solo lugar.',
      'Organize projects, users, and academic processes from one place.'
    ],
    ['Seguimiento visual', 'Visual tracking'],
    [
      'Revisa indicadores y reportes manteniendo una estructura clara del sistema.',
      'Review indicators and reports while keeping a clear system structure.'
    ],
    ['Acceso por rol', 'Role-based access'],
    [
      'Cada módulo mantiene su navegación, permisos y flujo de trabajo.',
      'Each module keeps its own navigation, permissions, and workflow.'
    ],
    ['Rol activo', 'Active role'],
    ['Reporte integrado', 'Integrated report'],
    ['Vista general del sistema', 'System overview'],
    ['Panel de gestión de proyectos académicos', 'Academic project management dashboard']
  ],

  'src/lib/components/Profile.svelte': [
    ['Estudiante', 'Student'],
    ['Docente', 'Teacher'],
    ['Coordinador', 'Coordinator'],
    ['Usuario', 'User'],
    ['Pregrado', 'Undergraduate'],
    ['Docente / Investigador', 'Teacher / Researcher'],
    ['Gestión Académica', 'Academic Management'],
    ['Sistema', 'System'],
    ['Perfil institucional', 'Institutional profile'],
    ['Contacto y acceso', 'Contact and access'],
    ['Correo institucional', 'Institutional email'],
    ['Teléfono de contacto', 'Contact phone'],
    ['No registrado', 'Not registered'],
    ['Identificación', 'Identification'],
    ['Estado de cuenta', 'Account status'],
    ['● Activa', '● Active'],
    ['○ Inactiva', '○ Inactive'],
    ['Rol asignado', 'Assigned role']
  ],

  'src/lib/components/ProjectCardDatatable.svelte': [
    ['Proyectos', 'Projects'],
    ['No hay proyectos para mostrar.', 'No projects to display.'],
    ['Buscar proyecto por nombre...', 'Search project by name...'],
    ['Listado', 'List'],
    ['registros', 'records'],
    ['Sin resultados', 'No results'],
    ['Mostrando', 'Showing'],
    [' de ', ' of '],
    ['Página', 'Page'],
    ['Anterior', 'Previous'],
    ['Siguiente', 'Next']
  ],

  'src/lib/components/DataTableWrapper.svelte': [
    ['No hay datos para mostrar.', 'No data to display.'],
    ['Buscar...', 'Search...'],
    ['{select} registros por página', '{select} records per page'],
    ['No se encontraron registros', 'No records found'],
    ['Mostrando {start} a {end} de {rows} registros', 'Showing {start} to {end} of {rows} records']
  ],

  'src/lib/components/ProjectCardTeacher.svelte': [
    ['Proyecto académico', 'Academic project'],
    ['Sin horario definido', 'No schedule defined'],
    ['Aquí verías los estudiantes del proyecto: ', 'Here you would see the students for the project: '],
    ['Ver estudiantes', 'View students']
  ],

  'src/routes/+page.svelte': [
    ['Gestión de proyectos', 'Project management'],
    [
      'Consulta, registra y organiza los proyectos académicos dentro del sistema SGPA.',
      'View, register, and organize academic projects within the SGPA system.'
    ],
    ['Ver más', 'Learn more'],
    ['Convocatorias', 'Calls'],
    [
      'Accede a convocatorias activas, procesos de inscripción y seguimiento académico.',
      'Access active calls, enrollment processes, and academic tracking.'
    ],
    ['Explorar', 'Explore'],
    ['Seguimiento académico', 'Academic tracking'],
    [
      'Visualiza el estado general de los procesos, entregas, avances y responsables.',
      'View the overall status of processes, deliverables, progress, and responsible users.'
    ],
    ['Consultar', 'View'],
    ['Coordinador', 'Coordinator'],
    [
      'Administrador principal del sistema, encargado de la supervisión general y la validación de procesos.',
      'Main system administrator responsible for overall supervision and process validation.'
    ],
    ['Equipo académico', 'Academic team'],
    [
      'Grupo de apoyo responsable del seguimiento, revisión y acompañamiento de la gestión de proyectos.',
      'Support team responsible for tracking, reviewing, and supporting project management.'
    ],
    ['Docentes', 'Teachers'],
    [
      'Participan en la orientación, evaluación y acompañamiento de iniciativas académicas.',
      'They participate in guiding, evaluating, and supporting academic initiatives.'
    ],
    ['SGPA | Sistema de Gestión de Proyectos Académicos', 'SGPA | Academic Project Management System'],
    [
      'Plataforma SGPA para la gestión de proyectos académicos de la Corporación Universitaria Latinoamericana.',
      'SGPA platform for academic project management at Corporación Universitaria Latinoamericana.'
    ],
    ['Plataforma institucional', 'Institutional platform'],
    ['Sistema de Gestión de Proyectos Académicos', 'Academic Project Management System'],
    [
      'SGPA es una plataforma orientada a la organización, seguimiento y administración\n            de proyectos académicos dentro del entorno universitario. Su propósito es facilitar\n            el control de procesos, responsables, avances y consulta de información relevante\n            en un solo lugar.',
      'SGPA is a platform focused on organizing, tracking, and managing\n            academic projects within the university environment. Its purpose is to simplify\n            the control of processes, responsible users, progress, and relevant information\n            in one place.'
    ],
    ['Ingresar al sistema', 'Enter the system'],
    ['Conocer más', 'Learn more'],
    ['Banner principal del sistema SGPA', 'Main SGPA system banner'],
    ['Funcionamiento', 'How it works'],
    ['¿Cómo funciona SGPA?', 'How does SGPA work?'],
    [
      'El sistema está diseñado para centralizar la gestión académica relacionada con\n          proyectos, convocatorias, seguimiento y control administrativo.',
      'The system is designed to centralize academic management related to\n          projects, calls, tracking, and administrative control.'
    ],
    ['Administración central', 'Central administration'],
    [
      'El coordinador actúa como administrador principal del sistema, supervisando procesos,\n            verificando información y gestionando el flujo general de los proyectos académicos.',
      'The coordinator acts as the main system administrator, supervising processes,\n            verifying information, and managing the overall flow of academic projects.'
    ],
    ['Control y seguimiento', 'Control and tracking'],
    [
      'SGPA permite llevar trazabilidad de actividades, estados, entregables y evolución\n            de cada proyecto, reduciendo desorden y mejorando la consulta institucional.',
      'SGPA enables traceability of activities, statuses, deliverables, and project progress,\n            reducing disorder and improving institutional consultation.'
    ],
    ['Acceso organizado', 'Organized access'],
    [
      'La plataforma busca ofrecer una navegación clara para usuarios académicos,\n            administrativos y responsables de procesos relacionados con los proyectos.',
      'The platform aims to provide clear navigation for academic users,\n            administrative users, and those responsible for project-related processes.'
    ],
    ['Módulos', 'Modules'],
    ['Áreas principales del sistema', 'Main system areas'],
    [
      'SGPA organiza las funciones principales en módulos claros, pensados para facilitar\n          la consulta y gestión de información académica.',
      'SGPA organizes its main functions into clear modules designed to simplify\n          consultation and management of academic information.'
    ],
    ['Coordinador y equipo principal', 'Coordinator and main team'],
    [
      'Este apartado puede usarse para presentar al coordinador del sistema y al equipo base\n          encargado de la administración y acompañamiento del proyecto.',
      'This section can be used to introduce the system coordinator and the core team\n          responsible for project administration and support.'
    ]
  ],

  'src/routes/login/+page.svelte': [
    ['Ingreso | SGPA', 'Login | SGPA'],
    [
      'Acceso al Sistema de Gestión de Proyectos Académicos - SGPA',
      'Access to the Academic Project Management System - SGPA'
    ],
    ['Acceso institucional', 'Institutional access'],
    ['Ingreso al sistema', 'System login'],
    [
      'Bienvenido al Sistema de Gestión de Proyectos Académicos. Selecciona tu rol\n            para acceder al módulo correspondiente dentro de la plataforma.',
      'Welcome to the Academic Project Management System. Select your role\n            to access the corresponding module within the platform.'
    ],
    ['Control académico', 'Academic control'],
    [
      'Gestiona procesos, revisa información y mantén organizada la actividad\n                de los proyectos académicos.',
      'Manage processes, review information, and keep academic project activity\n                organized.'
    ],
    ['Acceso por rol', 'Role-based access'],
    [
      'Cada tipo de usuario cuenta con un módulo diseñado según sus funciones\n                dentro del sistema.',
      'Each user type has a module designed according to its functions\n                within the system.'
    ],
    ['Banner de acceso al sistema SGPA', 'SGPA system access banner'],
    ['Accede a tu cuenta', 'Access your account'],
    [
      'Ingresa tu información y selecciona el tipo de acceso correspondiente a tu rol.',
      'Enter your information and select the access type that matches your role.'
    ],
    [
      'Acceso temporal de pruebas. Actualmente el sistema redirige por rol,\n          pero todavía no valida usuario y contraseña contra el backend.',
      'Temporary testing access. The system currently redirects by role,\n          but it does not validate username and password against the backend yet.'
    ],
    ['Usuario', 'User'],
    ['Ingresa tu usuario', 'Enter your username'],
    ['Contraseña', 'Password'],
    ['Ingresa tu contraseña', 'Enter your password'],
    ['Selecciona tu rol', 'Select your role'],
    ['Estudiante', 'Student'],
    ['Docente', 'Teacher'],
    ['Coordinador', 'Coordinator'],
    ['Ingresar', 'Log in']
  ],

  'src/routes/coordinator/+page.svelte': [
    ['Coordinador', 'Coordinator'],
    ['Módulo coordinador', 'Coordinator module'],
    ['Panel de control académico', 'Academic control panel'],
    [
      'Gestiona proyectos, docentes, estudiantes y usuarios desde una interfaz clara, organizada e institucional.',
      'Manage projects, teachers, students, and users from a clear, organized, and institutional interface.'
    ]
  ],

  'src/routes/teacher/+page.svelte': [
    ['Docente', 'Teacher'],
    ['Módulo docente', 'Teacher module'],
    ['Seguimiento de proyectos asignados', 'Assigned project tracking'],
    [
      'Consulta la información académica, revisa proyectos disponibles y haz seguimiento a la actividad de tus proyectos asignados.',
      'Check academic information, review available projects, and track activity for your assigned projects.'
    ]
  ],

  'src/routes/students/+page.svelte': [
    ['Estudiante', 'Student'],
    ['Módulo estudiante', 'Student module'],
    ['Vista general de proyectos académicos', 'Academic projects overview'],
    [
      'Explora proyectos disponibles, revisa tus matrículas y consulta tu información personal dentro del sistema SGPA.',
      'Explore available projects, review your enrollments, and check your personal information within SGPA.'
    ]
  ]
};

Object.assign(files, {
  'src/routes/coordinator/create_users/+page.svelte': [
    ['Módulo coordinador', 'Coordinator module'],
    ['Crear usuario', 'Create user'],
    [
      'Registra estudiantes y docentes dentro del sistema SGPA, manteniendo la información\n          organizada para la gestión académica.',
      'Register students and teachers within SGPA while keeping the information\n          organized for academic management.'
    ],
    ['Gestión de usuarios', 'User management'],
    ['Formulario de registro', 'Registration form'],
    ['Completa los datos básicos del usuario que será creado.', 'Fill in the basic information for the user to be created.'],
    ['Coordinador', 'Coordinator'],
    ['Nombres', 'First names'],
    ['Ej: Alejandro', 'Example: Alexander'],
    ['Apellidos', 'Last names'],
    ['Ej: Gómez', 'Example: Gomez'],
    ['Correo electrónico', 'Email address'],
    ['Ej: usuario@correo.com', 'Example: user@email.com'],
    ['Teléfono', 'Phone'],
    ['Ej: 3001234567', 'Example: 3001234567'],
    ['Contraseña', 'Password'],
    ['Ingresa una contraseña', 'Enter a password'],
    ['Tipo de usuario', 'User type'],
    ['Selecciona un rol', 'Select a role'],
    ['Docente', 'Teacher'],
    ['Estudiante', 'Student'],
    ['Usuario activo', 'Active user'],
    ['Permite que el usuario aparezca habilitado dentro del sistema.', 'Allows the user to appear enabled within the system.'],
    ['Limpiar formulario', 'Clear form'],
    ['Crear usuario', 'Create user']
  ],

  'src/routes/coordinator/projects/create/+page.svelte': [
    ['Módulo coordinador', 'Coordinator module'],
    ['Crear proyecto', 'Create project'],
    [
      'Registra un nuevo proyecto académico y asigna el docente responsable desde el\n          formulario inicial del sistema.',
      'Register a new academic project and assign the responsible teacher from the\n          initial system form.'
    ],
    ['Volver a proyectos', 'Back to projects'],
    ['Información del proyecto', 'Project information'],
    ['Completa los datos principales. Los campos marcados con asterisco son obligatorios.', 'Fill in the main information. Fields marked with an asterisk are required.'],
    ['Nombre del proyecto *', 'Project name *'],
    ['Ej: Sistema de seguimiento académico', 'Example: Academic tracking system'],
    ['Descripción', 'Description'],
    ['Describe brevemente el propósito, alcance o enfoque del proyecto', 'Briefly describe the purpose, scope, or focus of the project'],
    ['Fecha de inicio *', 'Start date *'],
    ['Fecha de finalización', 'End date'],
    ['Estado', 'Status'],
    ['Grupo de investigación', 'Research group'],
    ['Opcional', 'Optional'],
    ['Docente asignado *', 'Assigned teacher *'],
    ['Selecciona un docente', 'Select a teacher'],
    ['Cancelar', 'Cancel'],
    ['Creando proyecto...', 'Creating project...'],
    ['Crear proyecto', 'Create project']
  ],

  'src/routes/coordinator/projects/+page.svelte': [
    ['Total de proyectos', 'Total projects'],
    ['Registros visibles', 'Visible records'],
    ['Módulo coordinador', 'Coordinator module'],
    ['Gestión de proyectos', 'Project management'],
    ['Consulta, administra y crea proyectos académicos registrados dentro del sistema SGPA.', 'View, manage, and create academic projects registered in SGPA.'],
    ['+ Agregar proyecto', '+ Add project'],
    ['Listado de proyectos', 'Project list'],
    ['Revisa los proyectos registrados, su estado y docente asignado.', 'Review registered projects, their status, and assigned teacher.'],
    ['registros', 'records'],
    ['Proyectos', 'Projects'],
    ['No hay proyectos para mostrar.', 'No projects to display.'],
    ['Buscar proyecto por nombre, docente o estado...', 'Search project by name, teacher, or status...']
  ],

  'src/routes/coordinator/students/+page.svelte': [
    ['Lista de estudiantes', 'Student list'],
    ['Consulta y administra el estado de acceso de los estudiantes registrados.', 'View and manage the access status of registered students.'],
    ['registrados', 'registered'],
    ['Estudiantes registrados', 'Registered students'],
    ['Busca por nombre, correo o estado de cuenta.', 'Search by name, email, or account status.'],
    ['Buscar estudiante...', 'Search student...'],
    ['Buscar estudiante', 'Search student'],
    ['Nombre completo', 'Full name'],
    ['Correo', 'Email'],
    ['Estado', 'Status'],
    ['Acción de seguridad', 'Security action'],
    ['Deshabilitar acceso', 'Disable access'],
    ['Habilitar acceso', 'Enable access'],
    ['No se encontraron estudiantes.', 'No students found.'],
    ['Mostrando', 'Showing'],
    [' de ', ' of '],
    [' registros', ' records'],
    ['Anterior', 'Previous'],
    ['Página', 'Page'],
    ['Siguiente', 'Next']
  ],

  'src/routes/coordinator/teachers/+page.svelte': [
    ['Lista de docentes', 'Teacher list'],
    ['Consulta y administra el estado de acceso de los docentes registrados.', 'View and manage the access status of registered teachers.'],
    ['registrados', 'registered'],
    ['Docentes registrados', 'Registered teachers'],
    ['Busca por nombre, correo o estado de cuenta.', 'Search by name, email, or account status.'],
    ['Buscar docente...', 'Search teacher...'],
    ['Buscar docente', 'Search teacher'],
    ['Nombre del docente', 'Teacher name'],
    ['Correo institucional', 'Institutional email'],
    ['Estado', 'Status'],
    ['Acción de seguridad', 'Security action'],
    ['Deshabilitar acceso', 'Disable access'],
    ['Habilitar acceso', 'Enable access'],
    ['No se encontraron docentes.', 'No teachers found.'],
    ['Mostrando', 'Showing'],
    [' de ', ' of '],
    [' registros', ' records'],
    ['Anterior', 'Previous'],
    ['Página', 'Page'],
    ['Siguiente', 'Next']
  ],

  'src/routes/students/projects/+page.svelte': [
    ['Proyectos disponibles', 'Available projects'],
    ['Módulo estudiante', 'Student module'],
    ['Consulta los proyectos académicos disponibles y realiza tu matrícula cuando corresponda.', 'View available academic projects and enroll when applicable.'],
    ['Estudiante', 'Student'],
    ['No hay proyectos disponibles.', 'No projects available.'],
    ['Buscar proyecto por nombre, fecha o estado...', 'Search project by name, date, or status...']
  ],

  'src/routes/students/myprojects/+page.svelte': [
    ['Mis proyectos', 'My projects'],
    ['Módulo estudiante', 'Student module'],
    ['Consulta los proyectos académicos en los que ya te encuentras inscrito.', 'View the academic projects you are already enrolled in.'],
    ['Seguimiento', 'Tracking'],
    ['No tienes proyectos inscritos todavía.', 'You do not have enrolled projects yet.'],
    ['Buscar proyecto inscrito...', 'Search enrolled project...']
  ],

  'src/routes/students/profile/+page.svelte': [
    ['Módulo estudiante', 'Student module'],
    ['Perfil del estudiante', 'Student profile'],
    ['Consulta tu información personal, rol asignado y estado de cuenta dentro del sistema.', 'Check your personal information, assigned role, and account status within the system.'],
    ['Perfil', 'Profile']
  ],

  'src/routes/students/schedules/+page.svelte': [
    ['Registros disponibles', 'Available records'],
    ['Módulo estudiante', 'Student module'],
    ['Horarios y actividades', 'Schedules and activities'],
    [
      'Vista temporal de actividades y proyectos relacionados. Esta sección puede adaptarse\n          luego a entregas programadas o cronograma académico.',
      'Temporary view of related activities and projects. This section can later be adapted\n          to scheduled deliveries or an academic timeline.'
    ],
    ['Cronograma', 'Timeline'],
    ['Información obtenida desde la API para consulta del estudiante.', 'Information obtained from the API for student consultation.'],
    ['Fecha de inicio:', 'Start date:'],
    ['No definida', 'Not defined'],
    ['Sin descripción disponible', 'No description available'],
    ['Estado ID:', 'Status ID:'],
    ['Matricularse al proyecto', 'Enroll in project'],
    ['No hay registros disponibles actualmente.', 'There are no available records at the moment.'],
    ['La función de matriculación requiere inicio de sesión real. No disponible actualmente.', 'The enrollment feature requires real login. It is not currently available.']
  ],

  'src/routes/teacher/projects/+page.svelte': [
    ['Proyectos disponibles', 'Available projects'],
    ['Módulo docente', 'Teacher module'],
    ['Consulta los proyectos académicos registrados y su información general.', 'View registered academic projects and their general information.'],
    ['Docente', 'Teacher'],
    ['No hay proyectos para mostrar.', 'No projects to display.'],
    ['Buscar proyecto por nombre, docente o estado...', 'Search project by name, teacher, or status...']
  ],

  'src/routes/teacher/myprojects/+page.svelte': [
    ['Mis proyectos', 'My projects'],
    ['Módulo docente', 'Teacher module'],
    ['Mis proyectos asignados', 'My assigned projects'],
    ['Consulta los proyectos académicos asignados directamente a tu perfil docente.', 'View the academic projects assigned directly to your teacher profile.'],
    ['Asignaciones', 'Assignments'],
    ['No hay proyectos asignados para mostrar.', 'No assigned projects to display.'],
    ['Buscar proyecto asignado...', 'Search assigned project...']
  ],

  'src/routes/teacher/profile/+page.svelte': [
    ['Módulo docente', 'Teacher module'],
    ['Perfil del docente', 'Teacher profile'],
    ['Consulta tu información personal, rol asignado y estado de cuenta dentro del sistema.', 'Check your personal information, assigned role, and account status within the system.'],
    ['Perfil', 'Profile']
  ],

  'src/routes/teacher/schedules/+page.svelte': [
    ['Registros disponibles', 'Available records'],
    ['Módulo docente', 'Teacher module'],
    ['Horarios y actividades', 'Schedules and activities'],
    [
      'Vista temporal de actividades y proyectos relacionados. Esta sección puede adaptarse\n          luego a entregas programadas o cronograma académico.',
      'Temporary view of related activities and projects. This section can later be adapted\n          to scheduled deliveries or an academic timeline.'
    ],
    ['Cronograma', 'Timeline'],
    ['Información obtenida desde la API para consulta del docente.', 'Information obtained from the API for teacher consultation.'],
    ['Fecha de inicio:', 'Start date:'],
    ['No definida', 'Not defined'],
    ['Sin descripción disponible', 'No description available'],
    ['Estado ID:', 'Status ID:'],
    ['Ver detalles', 'View details'],
    ['No hay registros disponibles actualmente.', 'There are no available records at the moment.'],
    ['Esta acción requiere integración completa con el backend de horarios o entregas.', 'This action requires full integration with the schedules or deliverables backend.']
  ]
});

Object.assign(files, {
  'src/lib/server/project-helpers.js': [
    ['No se pudo consultar', 'Could not query'],
    ['Estado', 'Status'],
    ['Unknown', 'Unknown']
  ],

  'src/routes/coordinator/create_users/+page.server.js': [
    ['Todos los campos son obligatorios.', 'All fields are required.'],
    ['El rol seleccionado no es válido. Solo se permite Estudiante o Profesor.', 'The selected role is not valid. Only Student or Teacher is allowed.'],
    ['No autorizado. El token del coordinador expiró o no es válido.', 'Unauthorized. The coordinator token expired or is not valid.'],
    ['Usuario creado correctamente.', 'User created successfully.'],
    ['Falló la conexión o el procesamiento del servidor.', 'The server connection or processing failed.']
  ],

  'src/routes/coordinator/projects/+page.server.js': [
    ['Sin nombre', 'Unnamed'],
    ['Sin descripción', 'No description'],
    ['Fecha de inicio:', 'Start date:'],
    ['No definida', 'Not defined'],
    ['Estado:', 'Status:'],
    ['Docente:', 'Teacher:'],
    ['Sin asignar', 'Unassigned'],
    ['No se pudieron obtener los proyectos.', 'Could not load projects.']
  ],

  'src/routes/coordinator/projects/create/+page.server.js': [
    ['Activo', 'Active'],
    ['No se pudo cargar la información del formulario', 'Could not load form information'],
    ['No se pudo consultar project-users. Estado', 'Could not query project-users. Status'],
    ['No se pudo registrar el profesor en project-users. Estado', 'Could not register the teacher in project-users. Status'],
    ['Respuesta:', 'Response:'],
    [
      'La API respondió OK al registrar el profesor, pero la relación no aparece en /project-users.',
      'The API returned OK when registering the teacher, but the relationship does not appear in /project-users.'
    ],
    ['Debes completar nombre del proyecto, fecha de inicio y profesor asignado.', 'You must complete the project name, start date, and assigned teacher.'],
    ['No se pudo crear el proyecto. Estado', 'Could not create the project. Status'],
    [
      'El proyecto se creó, pero no se pudo recuperar el id_project para asignar el docente.',
      'The project was created, but id_project could not be retrieved to assign the teacher.'
    ],
    ['Error interno al crear el proyecto o asignar el docente', 'Internal error while creating the project or assigning the teacher']
  ],

  'src/routes/coordinator/students/+page.server.js': [
    ['No se recibió un ID válido para actualizar el estudiante.', 'A valid student ID was not received for update.'],
    ['falló. Estado', 'failed. Status'],
    ['No se pudo actualizar el estado del estudiante.', 'Could not update the student status.'],
    ['Sin nombre', 'Unnamed'],
    ['Sin correo', 'No email'],
    ['Activo', 'Active'],
    ['Inactivo', 'Inactive'],
    ['Error al cargar los estudiantes', 'Error loading students'],
    ['No se encontró el estudiante a actualizar.', 'The student to update was not found.'],
    ['El acceso de', 'Access for'],
    ['fue habilitado correctamente.', 'was enabled successfully.'],
    ['fue deshabilitado correctamente.', 'was disabled successfully.'],
    ['No se pudo actualizar el acceso de', 'Could not update access for']
  ],

  'src/routes/coordinator/teachers/+page.server.js': [
    ['No se recibió un ID válido para actualizar el docente.', 'A valid teacher ID was not received for update.'],
    ['falló. Estado', 'failed. Status'],
    ['No se pudo actualizar el estado del docente.', 'Could not update the teacher status.'],
    ['Sin nombre', 'Unnamed'],
    ['Sin correo', 'No email'],
    ['Activo', 'Active'],
    ['Inactivo', 'Inactive'],
    ['Error al cargar los docentes', 'Error loading teachers'],
    ['No se encontró el docente a actualizar.', 'The teacher to update was not found.'],
    ['El acceso de', 'Access for'],
    ['fue habilitado correctamente.', 'was enabled successfully.'],
    ['fue deshabilitado correctamente.', 'was disabled successfully.'],
    ['No se pudo actualizar el acceso de', 'Could not update access for']
  ],

  'src/routes/students/projects/+page.server.js': [
    ['Ingresar al proyecto', 'Enter project'],
    ['Sin nombre', 'Unnamed'],
    ['Sin descripción', 'No description'],
    ['Fecha de inicio:', 'Start date:'],
    ['No definida', 'Not defined'],
    ['Estado:', 'Status:'],
    ['Error al cargar proyectos disponibles', 'Error loading available projects'],
    ['Proyecto inválido.', 'Invalid project.'],
    ['El estudiante fue inscrito correctamente en el proyecto.', 'The student was successfully enrolled in the project.'],
    ['No se pudo registrar al estudiante en el proyecto.', 'Could not enroll the student in the project.']
  ],

  'src/routes/students/myprojects/+page.server.js': [
    ['Sin nombre', 'Unnamed'],
    ['Sin descripción', 'No description'],
    ['Fecha de inicio:', 'Start date:'],
    ['No definida', 'Not defined'],
    ['Estado:', 'Status:'],
    ['Mi proyecto', 'My project'],
    ['No se pudieron cargar los proyectos del estudiante', 'Could not load the student projects']
  ],

  'src/routes/students/profile/+page.server.js': [
    ['Sesión expirada o no autorizada.', 'Session expired or unauthorized.'],
    ['Error de API:', 'API error:'],
    ['Error de conexión con el servidor.', 'Server connection error.']
  ],

  'src/routes/students/schedules/+page.server.js': [
    ['Sesión expirada o no autorizada.', 'Session expired or unauthorized.'],
    ['Error de API:', 'API error:'],
    ['No se pudo conectar con el servidor de proyectos.', 'Could not connect to the project server.']
  ],

  'src/routes/teacher/projects/+page.server.js': [
    ['No se pudo obtener project-users. Estado', 'Could not get project-users. Status'],
    ['Sin nombre', 'Unnamed'],
    ['Sin descripción', 'No description'],
    ['Fecha de inicio:', 'Start date:'],
    ['No definida', 'Not defined'],
    ['Estado:', 'Status:'],
    ['Docente:', 'Teacher:'],
    ['Sin asignar', 'Unassigned'],
    ['No se pudieron obtener los proyectos.', 'Could not load projects.']
  ],

  'src/routes/teacher/myprojects/+page.server.js': [
    ['No se pudo obtener project-users. Estado', 'Could not get project-users. Status'],
    ['Sin nombre', 'Unnamed'],
    ['Sin descripción', 'No description'],
    ['Fecha de inicio:', 'Start date:'],
    ['No definida', 'Not defined'],
    ['Estado:', 'Status:'],
    ['Mi proyecto', 'My project'],
    ['No se pudieron cargar los proyectos del profesor', 'Could not load the teacher projects']
  ],

  'src/routes/teacher/profile/+page.server.js': [
    ['Sesión expirada o no autorizada.', 'Session expired or unauthorized.'],
    ['Error de API:', 'API error:'],
    ['Error de conexión con el servidor.', 'Server connection error.']
  ],

  'src/routes/teacher/schedules/+page.server.js': [
    ['Sesión expirada o no autorizada.', 'Session expired or unauthorized.'],
    ['Error de API:', 'API error:'],
    ['No se pudo conectar con el servidor de proyectos.', 'Could not connect to the project server.']
  ]
});

function replaceAllSafe(text, from, to) {
  if (!from) return { text, count: 0 };

  const parts = text.split(from);

  return {
    text: parts.join(to),
    count: parts.length - 1
  };
}

let total = 0;
const missing = [];

for (const [file, replacements] of Object.entries(files)) {
  const fullPath = path.join(process.cwd(), file);

  if (!fs.existsSync(fullPath)) {
    missing.push(file);
    continue;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let fileChanges = 0;

  for (const [from, to] of replacements) {
    const result = replaceAllSafe(content, from, to);
    content = result.text;
    fileChanges += result.count;
  }

  if (fileChanges > 0) {
    fs.writeFileSync(fullPath, content, 'utf8');
  }

  total += fileChanges;
  console.log(`${file}: ${fileChanges} replacement(s)`);
}

console.log(`\nDone. Total replacements: ${total}`);

if (missing.length > 0) {
  console.log('\nFiles not found:');
  for (const file of missing) {
    console.log(`- ${file}`);
  }
}