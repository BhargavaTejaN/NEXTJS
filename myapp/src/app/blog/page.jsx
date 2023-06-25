"use client"

import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

async function getData() {
  const res = await fetch("/api/posts",{
    cache : 'no-store'
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Blog = async () => {
  const data = await getData();

  return (
    <div className={styles.mainContainer}>
      {data.map((each) => (
        <Link key={each._id} href={`/blog/${each._id}`} className={styles.container}>
          <div className={styles.imageContainer}>
            <Image
              src="https://images.pexels.com/photos/17255021/pexels-photo-17255021/free-photo-of-papershoot-camera.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              width={400}
              height={250}
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>{each.title}</h1>
            <p className={styles.desc}>Description</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Blog;
