import {AxiosResponse} from "axios";
import {Tokens} from "../types";

export function addTokensFromResponseToLocalStorage(response: AxiosResponse<any, any>): void {
    const responseTokens: Tokens = response.data;

    localStorage.setItem('access_token', responseTokens.access_token);
    localStorage.setItem('refresh_token', responseTokens.refresh_token);
}