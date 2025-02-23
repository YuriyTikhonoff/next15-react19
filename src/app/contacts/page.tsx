import { Post } from "@/types/app";
import React from "react";

const ContactsPage: React.FC = async () => {
  const data = await fetch("https://api.vercel.app/blog");
  const posts: Post[] = await data.json();
  console.log(posts);
  return (
    <div>
      <h1>Contacts</h1>
      <p>This is a contacts page </p>
      <div>
        {posts.map((post) => (
          <div key={post.id} style={{}}>
            <div>{`${post.author} - ${post.title}`}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsPage;
