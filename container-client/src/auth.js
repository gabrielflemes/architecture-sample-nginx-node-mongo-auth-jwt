import axios from 'axios';

class Auth {


    login(email, password, cb) {

        const loginModel = {
            email: email,
            password: password
        };

        axios.post('auth/login', loginModel).then(res => {

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            cb();

        }).catch(err => {
            console.log(err.message);
        });

    }

    logout(cb) {

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        cb();
    }

    isAuthenticated() {
        
        const user = localStorage.getItem('user');

        if (user) {
            return true;
        } else {
            return false
        }


    }
}

export default new Auth();