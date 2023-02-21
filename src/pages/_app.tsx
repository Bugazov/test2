import "@/styles/globals.css";
import { AppProps, AppContext } from "next/app";
import { useRouter } from "next/router";
import { useState, useEffect, FC } from "react";

import { wrapper } from "../store/store";
import Loader from './../components/Loader';

const Loading:FC = ()=>{
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleStart = (url:string)=> (url !== router.asPath) && setLoading(true)
    const handleComplete = (url:string)=> (url !== router.asPath) && setLoading(false)
    router.events.on("routeChangeStart",handleStart);
    router.events.on("routeChangeComplete",handleComplete);
    router.events.on("routeChangeError",handleComplete);
    return ()=>{
      router.events.off("routeChangeStart",handleStart);
      router.events.off("routeChangeComplete",handleComplete);
      router.events.off("routeChangeError",handleComplete)
    }
  }, []);


  if(loading){
    return(
      <Loader/>
    )
  }else{
    return(
      <div></div>
    )
  }

  
  

  
}

function App({ Component, pageProps }: AppProps) {
  return (<><div className= "loader"><Loading/></div><Component {...pageProps} /></>);
}

export default wrapper.withRedux(App);
