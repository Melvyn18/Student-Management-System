import { apiClient } from "./ApiClient"

export const retrieveAllCoursesApi = (token) => apiClient.get('list-courses',
{
    headers: {
        'Authorization' : token
    }
}
);

export const deleteCourseApi = (id, token) => apiClient.delete(`delete-course?id=${id}`,
{
    headers: {
        'Authorization' : token
    }
}
);

export const addCourseApi = (course, token) => apiClient.post(`add-course`, course,
{
    headers: {
        'Authorization' : token
    }
}
);

export const retrieveCourseApi = (id, token) => apiClient.get(`retrieve-course?id=${id}`,
{
    headers: {
        'Authorization' : token
    }
}
);

export const updateCourseApi = (course, token) => apiClient.put(`update-course`, course,
{
    headers: {
        'Authorization' : token
    }
}
);

