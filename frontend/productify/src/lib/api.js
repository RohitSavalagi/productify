import api from './axios';

// Users api
export const syncUser = async (userData) => {
    console.log('called sync');

    const { data } = await api.post("/users/sync", userData);

    console.log(userData);

    return data;
}
export  const getAllProducts = async () => {
    const { data } = await api.get("/products");
    return data;
}

export const getProductById = async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
}

export const getMyProducts = async () => {
    const { data } = await api.get('products/my');
    return data;
}

export const createProduct = async (productData) => {
    const { data } = await api.post(productData, productData);
    return data;
}

export const updateProduct = async ({id, ...productData}) => {
    const { data } = await api.put(`/productData/${id}`, productData);
    return data;
}

export const deleteProduct = async (id) => {
    const { data } = await api.delete(`/products/${id}`);
    return data;
}

// comments api
export const createComment = async ({ productId, content }) => {
    const { data } = await api.post(`/comments/${productId}`, { content }); 
    return data;
}

export const deleteComment = async ({ commentId }) => {
    const { data } = await api.delete(`/comments/${commentId}`);
    return data;
}
