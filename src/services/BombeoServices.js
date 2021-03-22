import http from '../http-common';

class BombeoServices {
  getAll() {
    return http.get('/bombeos');
  }

  get(id) {
    return http.get(`/bombeos?id=${id}`);
  }

  create(data) {
    return http.post('/bombeos', data);
  }

  update(id, data) {
    return http.put(`/bombeos/${id}`, data);
  }

  delete(id, data) {
    return http.put(`/bombeos/${id}`, data);
  }
}

export default new BombeoServices();
