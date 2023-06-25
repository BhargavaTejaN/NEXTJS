"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import styles from './page.module.css'

const Signup = () => {

  const router = useRouter();

  const [formData,setFormData] = useState({
    name : '',
    email : '',
    password : ''
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      
      const options = {
        method : "POST",
        headers : {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({formData})
      }

      const response = await fetch('/api/auth/signup',options);

      response.status === 201 && router.push("/dashboard/login?success=Account has been created")


    } catch (error) {
      setError(error)
    }

  }

  const handleChange = (event) => {
    setFormData((prevstate) => ({
        ...prevstate,
        [event.target.name] : event.target.value
    }))
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create an Account</h1>
      <h2 className={styles.subtitle}>Please sign up to see the dashboard.</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Username"
          required
          className={styles.input}
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Email"
          required
          className={styles.input}
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className={styles.input}
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button className={styles.button}>Register</button>
        {error && "Something went wrong!"}
      </form>
      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href="/dashboard/login">
        Login with an existing account
      </Link>
    </div>
  )
}

export default Signup