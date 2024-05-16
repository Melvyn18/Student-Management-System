import { apiClient } from "./ApiClient"

export const retrieveAllRegistrationsApi = () => apiClient.get('list-registrations');

export const deleteRegistrationApi = (id) => apiClient.delete(`delete-registration?id=${id}`);

export const addRegistrationApi = (registration, studentId, courseId) => apiClient.post(`add-registration?studentId=${studentId}&courseId=${courseId}`, registration
// {
//     headers: {
//         'Content-Type': 'application/json',
//     }
// }
    
);

// export const retrieveRegistrationApi = (id) => apiClient.get(`retrieve-registration?id=${id}`);

// export const updateRegistrationApi = (registration) => apiClient.put(`update-registration`, registration);

