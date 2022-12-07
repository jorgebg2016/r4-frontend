import { LoggedUser, UserCredentials } from "../types/AuthTypes";
import { Loading } from 'quasar';
import axios from "axios";


class AuthService {

    async login(data: UserCredentials): Promise<LoggedUser> {

        Loading.show();

        return axios.post(import.meta.env.VITE_API_BASE_URL + '/login', data)
            .then((response: any) => {

                console.log(response);

                return Promise.resolve(response.data);
            })
            .catch((error) => {
                return Promise.reject(error.response.data.message);
            })
            .finally(() => {

                Loading.hide();
            });
    };
};

export default new AuthService();