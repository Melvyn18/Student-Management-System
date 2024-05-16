import { apiClient } from "./ApiClient"

export const retrieveAllCoursesApi = () => apiClient.get('list-courses');

export const deleteCourseApi = (id) => apiClient.delete(`delete-course?id=${id}`);

export const addCourseApi = (course) => apiClient.post(`add-course`, course);

export const retrieveCourseApi = (id) => apiClient.get(`retrieve-course?id=${id}`);

export const updateCourseApi = (course) => apiClient.put(`update-course`, course);

