import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import HomeHeader from "../../src/components/HomeHeader";
import Spinner from "../../src/components/Spinner";
import styles from "./blog.module.scss";

const index = () => {
  const [blogs, setBlogs] = useState();

  useEffect(() => {
    axios
      .get("http://prekuel.com/wp-json/wp/v2/posts/?per_page=5")
      .then((res) => setBlogs(res.data));
  }, []);

  return (
    <div className="landing">
      <HomeHeader />

      <div className={styles.header}>
        <h1>Read Latest Articles</h1>
        <h2>Anything that makes a better you</h2>
      </div>

      {blogs ? (
        <div className={`${styles.cardList}`}>
          {blogs.map((blog) => {
            return (
              <div key={blog.id} className={`${styles.card}`}>
                <div>
                  <img
                    src={blog.better_featured_image.source_url}
                    alt={blog.title.rendered}
                  />
                  <p
                    className={styles.title}
                    dangerouslySetInnerHTML={{ __html: blog.title.rendered }}
                    title={blog.title.rendered}
                  ></p>
                  <p
                    className={styles.body}
                    dangerouslySetInnerHTML={{ __html: blog.excerpt.rendered }}
                  ></p>
                </div>

                <Link href={`/blog/${blog.id}`}>
                  <a className={styles.link}>
                    <p>Continue Reading</p>
                    <img src="images/ic_arrow.svg" alt="Arrow" />
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.center} style={{ marginTop: "5rem" }}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default index;
