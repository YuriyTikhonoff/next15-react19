import React from "react"

import type { Post } from "@/types/app"

import PostComponent from "./Post/component"

const ContactsPage: React.FC = async () => {
  const data = await fetch("https://api.vercel.app/blog")
  const posts: Post[] = await data.json()
  console.log(posts)
  return (
    <div>
      <h1>Contacts</h1>
      <p>This is a contacts page </p>
      <div>
        {posts.map(post => (
          <div key={post.id}>
            <PostComponent post={post} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContactsPage
