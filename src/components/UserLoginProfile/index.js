import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getUserInfo } from "../../utils/functions";

const UserLoginProfile = ({ width = 48 }) => {
  const [img, setImg] = React.useState("");
  
  React.useEffect(() => {
    const { user } = JSON.parse(getUserInfo());

    if (user.photoURL !== null) {
      setImg(user.photoURL);
    }
  }, []);

  return (
    <Link href="/user">
      <a href="" style={{textDecoration: 'none'}} data-userlogged>
        <Image
          src={img || "/images/deadpool.svg"}
          width={width}
          height={width}
          alt="image profile"
          style={{borderRadius: '50%'}}
        />
      </a>
    </Link>
  );
}

export default UserLoginProfile;
