import { create } from 'zustand'

 export interface User {
    id?: number;
    email?: string;
    username: string;
    password: string;
    name?: {
        firstname: string;
        lastname: string;
    }
    address?: {
        city: string
        street: string
        number: number
        zipcode: string
        geolocation:{
            lat: string
            long: string
        }
    }
    phone?: string
}

interface AuthStore{
    logged: boolean
    user: User | null

    changeLogged: ()=> void;
    setUser: (newUser: User) => void
}

export const useAuthStore = create<AuthStore>((set)=>({
    logged: false,
    user: null,
    changeLogged: ()=>{
        set((state)=>({logged: !state.logged}))
        
    },
    setUser: (newUser: User) => {
        set(()=>({user: newUser}))
    }
}))