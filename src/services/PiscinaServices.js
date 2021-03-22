import http from '../http-common';

class PiscinaServices {
  getAll() {
    return http.get('/piscinas');
  }
}
export default new PiscinaServices();