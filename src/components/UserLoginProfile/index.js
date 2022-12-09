import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getUserInfo } from "../../utils/functions";
import styles from "./UserLoginProfile.module.scss";

const UserLoginProfile = ({ width = 44, classname }) => {
  const [img, setImg] = React.useState("");
  
  React.useEffect(() => {
    const { user } = JSON.parse(getUserInfo());

    if (user.photoURL !== null) {
      setImg(user.photoURL);
    }
  }, []);

  return (
    <Link href="/user">
      <a href="" className={`${styles["user-logged"]} ${classname}`} style={{width: width}}>
        <Image
          src={img || "/images/deadpool.svg"}
          width={width}
          height={width}
          alt="image profile"
        />
      </a>
    </Link>
  );
}

export default UserLoginProfile;
