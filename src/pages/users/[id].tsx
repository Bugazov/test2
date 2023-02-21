import {fetchUsers,addUsers,fetchUserId, addUserId,
} from "@/features/usersSlice";
import { store, wrapper } from "@/store/store";
import { user } from "@/types/users.types";
import { Button } from "@mui/material";
import {  GetStaticProps } from "next";
import Link from 'next/link';
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";


interface Props {
  user: user;
}
interface IParams extends ParsedUrlQuery {
  id: string;
}

export default function ({ user }: Props) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }


  return (
    <>
      <div>Пользователя зовут {user.name}</div>
     <Link href="/users"><Button variant="contained">Назад</Button></Link>
    </>
  );
}

export async function getStaticPaths() {
  const data = await store.dispatch(fetchUsers());
  const users = data.payload;
  const paths = users.map((user: user) => {
    return {
      params: { id: user.id.toString() },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

// `getStaticPaths` requires using `getStaticProps`
export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    const { id } = context.params as IParams;
    const data = await store.dispatch(fetchUserId(id));
    const user = data.payload;
    store.dispatch(addUserId(user));
    return { props: { user } };
  }
);
