import { apiClient } from "./ApiClient"

export const retrieveAllStudentsApi = () => apiClient.get('list-students');

export const deleteStudentApi = (id) => apiClient.delete(`delete-student?id=${id}`);

export const addStudentApi = (student) => apiClient.post(`add-student`, student);

export const retrieveStudentApi = (id) => apiClient.get(`retrieve-student?id=${id}`);

export const updateStudentApi = (student) => apiClient.put(`update-student`, student);

