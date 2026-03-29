import conf from "../conf/conf";

export class AuthService {

    constructor() {
        this.apiBaseUrl = conf.apiBaseUrl;
    }

    async createAccount({email, password, username}) {
        try{
            const res = await fetch (`${this.apiBaseUrl}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    username,
                    role: "ADMIN", 
                }),
            })
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.message || "Registration failed");
            }
            return data

        } catch(error) {
            console.log("createAccount error:", error)
            throw error
        }
    }

    async login({email, password}) {
        try{
            const res = await fetch (`${this.apiBaseUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
            },
            body: JSON.stringify({email, password})
        })
        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.message || "Login failed");
        }
        localStorage.setItem("token", data.data?.accessToken);

        return data;

        }catch(error) {
            console.log("login error:", error)
            throw error
        }
    }

    async getUser() {
        try{
            const token = this.getToken()
            if(!token) return null

            const res = await fetch(`${this.apiBaseUrl}/current-user`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.message || "Failed to fetch user");
            }
            return data
        }catch(error) {
            console.log("getUser error:", error)
            return null
        }
    }

    async logout() {
        try{
            const token = this.getToken()
            if(token) {
                await fetch(`${this.apiBaseUrl}/logout`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            }
            localStorage.removeItem("token")
        }catch(error) {
            console.log("logout error:", error)
        }
    }

    getToken() {
    return localStorage.getItem("token");
}

}

const authService = new AuthService()
export default authService