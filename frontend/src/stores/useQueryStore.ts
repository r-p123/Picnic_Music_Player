import { axiosInstance } from "@/lib/axios";
import { Song } from "@/types";
import {create} from "zustand";


interface QueryStore{
    isLoading: boolean;
    error: string | null;
    queryResponse: Song[] ;
    sendQuery: (userId: string) => Promise<void>;
}



export const useQueryStore = create<QueryStore>(  (set, get) => ({
    isLoading: false,
    error: null,
    queryResponse: [],


    sendQuery: async (query:string) => {
        set({isLoading: true, error: null});
        try{
            const response = await axiosInstance.get(`songs/${query}`);
            set({queryResponse: response.data});
        } catch(error: any){
            set({error: error.response.data.message});
        }finally{
            set({isLoading: false});
        }
    }
}));

