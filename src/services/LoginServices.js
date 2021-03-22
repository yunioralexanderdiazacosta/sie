import http from '../http-common';

class LoginServices {
  getAll() {
    return http.get('/auth/local');
  }

  get(id) {
    return http.get(`/products/${id}`);
  }

  login(data) {
    return http.post('/auth/local', data);
  }

  signup(data) {
    return http.post('/auth/register', data);
  }

  update(id, data) {
    return http.put(`/products/${id}`, data);
  }

  delete(id, data) {
    return http.put(`/products/${id}`, data);
  }
}

export default new LoginServices();
