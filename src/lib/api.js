const API_BASE = 'https://academic-project-management-api.onrender.com/api';

// Función helper para hacer requests
async function fetchAPI(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    };

    try {
        const response = await fetch(url, config);
        
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.detail || `Error ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error(`API Error [${endpoint}]:`, error);
        throw error;
    }
}

// USERS 
export const usersAPI = {
    getAll: () => fetchAPI('/users'),
    getById: (id) => fetchAPI(`/users/${id}`),
    create: (data) => fetchAPI('/users', {
        method: 'POST',
        body: JSON.stringify(data)
    }),
    update: (id, data) => fetchAPI(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    }),
    delete: (id) => fetchAPI(`/users/${id}`, {
        method: 'DELETE'
    })
};

// STUDENTS 
export const studentsAPI = {
    getAll: () => fetchAPI('/students'),
    getById: (id) => fetchAPI(`/students/${id}`),
    create: (data) => fetchAPI('/students', {
        method: 'POST',
        body: JSON.stringify(data)
    }),
    update: (id, data) => fetchAPI(`/students/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    }),
    delete: (id) => fetchAPI(`/students/${id}`, {
        method: 'DELETE'
    })
};

//  PROJECTS 
export const projectsAPI = {
    getAll: () => fetchAPI('/projects'),
    getById: (id) => fetchAPI(`/projects/${id}`),
    create: (data) => fetchAPI('/projects', {
        method: 'POST',
        body: JSON.stringify(data)
    }),
    update: (id, data) => fetchAPI(`/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    }),
    delete: (id) => fetchAPI(`/projects/${id}`, {
        method: 'DELETE'
    })
};

//  PROJECT USERS 
export const projectUsersAPI = {
    getAll: () => fetchAPI('/project-users'),
    getById: (id) => fetchAPI(`/project-users/${id}`),
    assign: (data) => fetchAPI('/project-users', {
        method: 'POST',
        body: JSON.stringify(data)
    }),
    delete: (id) => fetchAPI(`/project-users/${id}`, {
        method: 'DELETE'
    })
};

// PROGRESS 
export const progressAPI = {
    getAll: () => fetchAPI('/progress'),
    getById: (id) => fetchAPI(`/progress/${id}`),
    create: (data) => fetchAPI('/progress', {
        method: 'POST',
        body: JSON.stringify(data)
    }),
    update: (id, data) => fetchAPI(`/progress/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    }),
    delete: (id) => fetchAPI(`/progress/${id}`, {
        method: 'DELETE'
    })
};

//DOCUMENTS 
export const documentsAPI = {
    getAll: () => fetchAPI('/documents'),
    getById: (id) => fetchAPI(`/documents/${id}`),
    create: (data) => fetchAPI('/documents', {
        method: 'POST',
        body: JSON.stringify(data)
    }),
    update: (id, data) => fetchAPI(`/documents/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    }),
    delete: (id) => fetchAPI(`/documents/${id}`, {
        method: 'DELETE'
    })
};

// DOCUMENT TYPES 
export const documentTypesAPI = {
    getAll: () => fetchAPI('/document-types'),
    getById: (id) => fetchAPI(`/document-types/${id}`),
    create: (data) => fetchAPI('/document-types', {
        method: 'POST',
        body: JSON.stringify(data)
    }),
    update: (id, data) => fetchAPI(`/document-types/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    }),
    delete: (id) => fetchAPI(`/document-types/${id}`, {
        method: 'DELETE'
    })
};

//ROLES 
export const rolesAPI = {
    getAll: () => fetchAPI('/roles'),
    getById: (id) => fetchAPI(`/roles/${id}`),
    create: (data) => fetchAPI('/roles', {
        method: 'POST',
        body: JSON.stringify(data)
    }),
    update: (id, data) => fetchAPI(`/roles/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    }),
    delete: (id) => fetchAPI(`/roles/${id}`, {
        method: 'DELETE'
    })
};

// STATUS 
export const statusAPI = {
    getAll: () => fetchAPI('/status'),
    getById: (id) => fetchAPI(`/status/${id}`),
    create: (data) => fetchAPI('/status', {
        method: 'POST',
        body: JSON.stringify(data)
    }),
    update: (id, data) => fetchAPI(`/status/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    }),
    delete: (id) => fetchAPI(`/status/${id}`, {
        method: 'DELETE'
    })
};

// RESEARCH LINES 
export const researchLinesAPI = {
    getAll: () => fetchAPI('/research-lines'),
    getById: (id) => fetchAPI(`/research-lines/${id}`),
    create: (data) => fetchAPI('/research-lines', {
        method: 'POST',
        body: JSON.stringify(data)
    }),
    update: (id, data) => fetchAPI(`/research-lines/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    }),
    delete: (id) => fetchAPI(`/research-lines/${id}`, {
        method: 'DELETE'
    })
};

// RESEARCH GROUPS 
export const researchGroupsAPI = {
    getAll: () => fetchAPI('/research-groups'),
    getById: (id) => fetchAPI(`/research-groups/${id}`),
    create: (data) => fetchAPI('/research-groups', {
        method: 'POST',
        body: JSON.stringify(data)
    }),
    update: (id, data) => fetchAPI(`/research-groups/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    }),
    delete: (id) => fetchAPI(`/research-groups/${id}`, {
        method: 'DELETE'
    })
};

// COMMENTS 
export const commentsAPI = {
    getAll: () => fetchAPI('/comments'),
    getById: (id) => fetchAPI(`/comments/${id}`),
    create: (data) => fetchAPI('/comments', {
        method: 'POST',
        body: JSON.stringify(data)
    }),
    update: (id, data) => fetchAPI(`/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    }),
    delete: (id) => fetchAPI(`/comments/${id}`, {
        method: 'DELETE'
    })
};

// SCHEDULED DELIVERIES 
export const scheduledDeliveriesAPI = {
    getAll: () => fetchAPI('/scheduled-deliveries'),
    getById: (id) => fetchAPI(`/scheduled-deliveries/${id}`),
    create: (data) => fetchAPI('/scheduled-deliveries', {
        method: 'POST',
        body: JSON.stringify(data)
    }),
    update: (id, data) => fetchAPI(`/scheduled-deliveries/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    }),
    delete: (id) => fetchAPI(`/scheduled-deliveries/${id}`, {
        method: 'DELETE'
    })
};

// PROJECT STATUS HISTORY 
export const projectStatusHistoryAPI = {
    getAll: () => fetchAPI('/project-status-history'),
    getById: (id) => fetchAPI(`/project-status-history/${id}`),
    create: (data) => fetchAPI('/project-status-history', {
        method: 'POST',
        body: JSON.stringify(data)
    }),
    update: (id, data) => fetchAPI(`/project-status-history/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    }),
    delete: (id) => fetchAPI(`/project-status-history/${id}`, {
        method: 'DELETE'
    })
};

//  DELIVERY STATUS 
export const deliveryStatusAPI = {
    getAll: () => fetchAPI('/delivery-status'),
    getById: (id) => fetchAPI(`/delivery-status/${id}`),
    create: (data) => fetchAPI('/delivery-status', {
        method: 'POST',
        body: JSON.stringify(data)
    }),
    update: (id, data) => fetchAPI(`/delivery-status/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    }),
    delete: (id) => fetchAPI(`/delivery-status/${id}`, {
        method: 'DELETE'
    })
};