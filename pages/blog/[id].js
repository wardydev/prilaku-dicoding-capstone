import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HomeHeader from "../../src/components/HomeHeader";
import styles from "./blog.module.scss";
import Spinner from "../../src/components/Spinner";
import { formatDate } from "../../src/utils/functions";

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blogs, setBlogs] = useState();
  const [blog, setBlog] = useState();

  useEffect(() => {
    axios
      .get("http://prekuel.com/wp-json/wp/v2/posts/?per_page=5")
      .then((res) => setBlogs(res.data));
  }, []);
  
  useEffect(() => {
    if (blogs) {
      const blog = blogs.filter((blog) => blog.id == id)[0];
      blog ? setBlog(blog) : setBlog(false);
    }
  }, [blogs]);

  return (
    <div className="landing">
      <HomeHeader />

      {blog ? (
        <div className={styles.articles}>
          <p className={styles.date}>
            {formatDate(new Date(blog.date))} <span>∙</span> Prilaku
          </p>
          <h1 dangerouslySetInnerHTML={{ __html: blog.title.rendered }}></h1>
          <img
            src={blog.better_featured_image.source_url}
            alt={blog.title.rendered}
          />
          <p dangerouslySetInnerHTML={{ __html: blog.content.rendered }}></p>
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
