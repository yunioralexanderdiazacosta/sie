import http from '../http-common';

class PotenciaServices {
    getAll() {
        return http.get('/potencias');
    }
}

export default new PotenciaServices();