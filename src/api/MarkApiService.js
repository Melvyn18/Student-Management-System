import { apiClient } from "./ApiClient"

export const retrieveAllMarksApi = (token) => apiClient.get('list-marks',
{
    headers: {
        'Authorization' : token
    }
}
);

export const deleteMarkApi = (id, token) => apiClient.delete(`delete-mark?id=${id}`,
{
    headers: {
        'Authorization' : token
    }
}
);

export const addMarkApi = (mark, studentId, courseId, token) => apiClient.post(`add-mark?studentId=${studentId}&courseId=${courseId}`, mark,
{
    headers: {
        'Authorization' : token
    }
}    
);

// export const retrieveRegistrationApi = (id) => apiClient.get(`retrieve-registration?id=${id}`);

// export const updateRegistrationApi = (registration) => apiClient.put(`update-registration`, registration);

