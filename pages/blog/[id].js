import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HomeHeader from "../../src/components/HomeHeader";
import styles from "./blog.module.scss";
import Spinner from "../../src/components/Spinner";
import { formatDate } from "../../src/utils/functions";
import Image from "next/image";

const BlogDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blogs, setBlogs] = useState();
  const [blog, setBlog] = useState();

  useEffect(() => {
    axios
      .get("https://prekuel.com/wp-json/wp/v2/posts/?category=248&per_page=3")
      .then((res) => setBlogs(res.data));
  }, []);

  useEffect(() => {
    if (blogs) {
      const blog = blogs.filter((blog) => blog.id == id)[0];
      blog ? setBlog(blog) : setBlog(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogs]);

  if (blog === 0) {
    return (
      <div className="landing">
        <HomeHeader />
        <p className="text-center mt-5">Article not found</p>
      </div>
    );
  }

  return (
    <div className="landing">
      <HomeHeader />

      {blog ? (
        <div className={styles.articles}>
          <p className={styles.date}>
            {formatDate(new Date(blog.date))} <span>∙</span> Prilaku
          </p>
          <h1 dangerouslySetInnerHTML={{ __html: blog.title.rendered }}></h1>
          <Image
            src={blog.better_featured_image.source_url}
            alt={blog.title.rendered}
            width="700px"
            height="450px"
            objectFit="cover"
          />
          <div className={styles.body}>
            <p dangerouslySetInnerHTML={{ __html: blog.content.rendered }}></p>
          </div>
        </div>
      ) : (
        <div className={styles.center} style={{ marginTop: "5rem" }}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
