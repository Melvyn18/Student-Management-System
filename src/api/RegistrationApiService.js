import { apiClient } from "./ApiClient"

export const retrieveAllRegistrationsApi = (token) => apiClient.get('list-registrations',
{
    headers: {
        'Authorization' : token
    }
}
);

export const deleteRegistrationApi = (id, token) => apiClient.delete(`delete-registration?id=${id}`,
{
    headers: {
        'Authorization' : token
    }
}
);

export const addRegistrationApi = (registration, studentId, courseId, token) => apiClient.post(`add-registration?studentId=${studentId}&courseId=${courseId}`, registration,
{
    headers: {
        'Authorization' : token
    }
}    
);

// export const retrieveRegistrationApi = (id) => apiClient.get(`retrieve-registration?id=${id}`);

// export const updateRegistrationApi = (registration) => apiClient.put(`update-registration`, registration);

