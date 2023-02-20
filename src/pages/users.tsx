import React from 'react';
import type { user } from '@/types/users.types';
import { GetServerSideProps } from 'next';
import { wrapper } from '@/store/store';
import { fetchUsers } from '@/features/usersSlice';

interface usersProps{
    users:user[],
    isLoading:boolean
}



   
  


const users = ({users}:usersProps) => {

    
    return (
        <div>
            <h1>Все пользователи</h1>
           <ul>
                {users?.map((item)=>{
                    return <li>{item.name}</li>
                })}
            </ul>
            
        </div>
    );
};

export default users;

export const getServerSideProps:GetServerSideProps  = wrapper.getServerSideProps((store) => async(ctx) => {
    const data = await store.dispatch(fetchUsers())
   const users = data.payload
    return {props:{users}};
})

