import { apiClient } from "./ApiClient"

export const retrieveAllMarksApi = () => apiClient.get('list-marks');

export const deleteMarkApi = (id) => apiClient.delete(`delete-mark?id=${id}`);

export const addMarkApi = (mark, studentId, courseId) => apiClient.post(`add-mark?studentId=${studentId}&courseId=${courseId}`, mark
// {
//     headers: {
//         'Content-Type': 'application/json',
//     }
// }
    
);

// export const retrieveRegistrationApi = (id) => apiClient.get(`retrieve-registration?id=${id}`);

// export const updateRegistrationApi = (registration) => apiClient.put(`update-registration`, registration);

