"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";

import styles from "./page.module.css";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const DashBoard = () => {
  // const [data, setData] = useState([]);
  // const [error, setError] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // const getData = async () => {
  //   setIsLoading(true);
  //   setError(null);

  //   const res = await fetch(
  //     `https://jsonplaceholder.typicode.com/posts`,
  //     {
  //       cache: "no-store",
  //     }
  //   );

  //   if (!res.ok) {
  //     setError(true);
  //     setIsLoading(false);
  //   }

  //   setIsLoading(false);
  //   setError(null);
  //   setData(res.json());
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  const session = useSession();

  console.log("SESSION : ", session);

  const router = useRouter();

  const { data,mutate, error, isLoading } = useSWR(
    `/api/posts?username=${session.data?.user.name}`,
    fetcher
  );

  const [formData,setFormData] = useState({
    title : '',
    desc : '',
    img : '',
    content : ''
  });

  if (error) return <div>Error While Fetching</div>;
  if (isLoading) return <div>...Loading</div>;

  console.log("Data : ", data);


  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
  }

  const handleChange = event => {
    setFormData((prevstate) => ({
      ...prevstate,
      [event.target.name] : event.target.value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      const {title,desc,img,content} = formData;

      const options = {
        method : "POST",
        body : JSON.stringify({title,desc,img,content,username : session.data.user.name})
      }

      await fetch('/api/posts',options);
      mutate();
      setFormData({
        title:"",
        desc: "",
        img: "",
        content : ''
      })
    } catch (error) {
      console.log("Error While Adding a New Post in Dashboard : ",error)
    }

  }

  const handleDelete = async (id) => {
    try {

      const options = {
        method : "DELETE"
      }

      await fetch(`/api/posts/${id}`,options);
      mutate();
    } catch (error) {
      console.log("Error While Deleting The Post in Dashboard Page : ",error);
    }
  }

  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          {isLoading
            ? "loading"
            : data?.map((post) => (
                <div className={styles.post} key={post._id}>
                  <div className={styles.imgContainer}>
                    <Image src={post.img} alt="" width={200} height={100} />
                  </div>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <span
                    className={styles.delete}
                    onClick={() => handleDelete(post._id)}
                  >
                    X
                  </span>
                </div>
              ))}
        </div>
        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Add New Post</h1>
          <input name="title" value={formData.title} onChange={handleChange} type="text" placeholder="Title" className={styles.input} />
          <input name="desc" value={formData.desc} onChange={handleChange} type="text" placeholder="Desc" className={styles.input} />
          <input name="img" value={formData.img} onChange={handleChange} type="text" placeholder="Image" className={styles.input} />
          <textarea
          name="content" value={formData.content} onChange={handleChange}
            placeholder="Content"
            className={styles.textArea}
            cols="30"
            rows="10"
          ></textarea>
          <button type="submit" className={styles.button}>Send</button>
        </form>
      </div>
    );
  }
};

export default DashBoard;
