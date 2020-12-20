import request from 'umi-request';

export async function queryArticle(params) {
  return request('article/searchArticle', {
    params,
  });
}
export async function removeArticle(params) {
  return request('/api/article', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addArticle(params) {
  return request('/api/article', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateArticle(params) {
  return request('/api/article', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
