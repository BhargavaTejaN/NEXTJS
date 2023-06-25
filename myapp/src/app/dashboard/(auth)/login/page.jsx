"use client";

import React,{ useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession,signIn,getProviders } from "next-auth/react";
import Link from "next/link";

import styles from "./page.module.css";

const Login = () => {

  const session = useSession();
  const router = useRouter();

  const [formData,setFormData] = useState({
    email : '',
    password : ''
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if(session.status === "loading"){
    return <p>Loading...</p>
  }

  if(session.status === "authenticated"){
    router?.push("/dashboard");
  }


  const handleChange = event => {
    setFormData((prevstate) => ({
      ...prevstate,
      [event.target.name]: event.target.value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const {email,password} = formData;

    signIn("credentials",{email,password})

  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{success ? success : "Welcome Back"}</h1>
      <h2 className={styles.subtitle}>Please sign in to see the dashboard.</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Email"
          required
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          required
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={styles.input}
        />
        <button className={styles.button}>Login</button>
        {error && error}
      </form>
      <button
        onClick={() => {
          signIn("google");
        }}
        className={styles.button + " " + styles.google}
      >
        Login with Google
      </button>
      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href="/dashboard/signup">
        Create new account
      </Link>
      {/* <button
      onClick={() => {
        signIn("github");
      }}
      className={styles.button + " " + styles.github}
    >
      Login with Github
    </button> */}
    </div>
  );
};

export default Login;

// "use client"

// import React from 'react'
// import { useSession,signIn,signOut } from 'next-auth/react'

// const Login = () => {

//   const {data : session} = useSession();

//   if(session){
//     return (
//       <div>
//         <h2>Welcome {session.user.email}</h2>
//         <button onClick={() => signOut("google")}>Sign out</button>
//       </div>
//     )
//   } else {
//     return(
//       <div>
//         <p>You're not signed in</p>
//         <button onClick={() => signIn("google")}>Signin With Google</button>
//       </div>
//     )
//   }
// }

// export default Login