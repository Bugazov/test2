import React, { Suspense } from 'react';
import type { user } from '@/types/users.types';
import { GetServerSideProps, GetStaticProps } from 'next';
import { wrapper } from '@/store/store';
import { addUsers, fetchUsers } from '@/features/usersSlice';
import Link from 'next/link';

interface usersProps{
    users:user[],
}



   
  


const users = ({users}:usersProps) => {

    
    return (
        <div>
            <h1>Все пользователи</h1>
          <ul>
                {users?.map((item)=>{
                    return <li><Link href={`/users/${item.id}`}>{item.name}</Link></li>
                })}
            </ul>

        </div>
    );
};

export default users;

export const getStaticProps:GetStaticProps  = wrapper.getStaticProps((store) => async(ctx) => {
    const data = await store.dispatch(fetchUsers())
   const users = data.payload
   store.dispatch(addUsers(users))
    return {props:{users}};
})

