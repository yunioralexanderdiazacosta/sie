import http from '../http-common';

class TermosolarServices {
    getAll() {
        return http.get('/termosolares');
    }
}

export default new TermosolarServices();