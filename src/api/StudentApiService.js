import { apiClient } from "./ApiClient"

export const retrieveAllStudentsApi = (token) => apiClient.get('list-students',
    {
        headers: {
            'Authorization' : token
        }
    }
);

export const deleteStudentApi = (id, token) => apiClient.delete(`delete-student?id=${id}`,
    {
        headers: {
            'Authorization' : token
        }
    }
);

export const addStudentApi = (student, token) => apiClient.post(`add-student`, student,
{
    headers: {
        'Authorization' : token
    }
}
);

export const retrieveStudentApi = (id, token) => apiClient.get(`retrieve-student?id=${id}`,
{
    headers: {
        'Authorization' : token
    }
}
);

export const updateStudentApi = (student, token) => apiClient.put(`update-student`, student,
{
    headers: {
        'Authorization' : token
    }
}
);

