import React from "react"
import { useStore } from "@/store"

const SendMessagePage: React.FC = () => {
  const { theme } = useStore.getState()
  console.log("theme from store in server compnent ", theme);
  return (
    <div>
      <h1>Send Message</h1>
      <p>This is the send message page.</p>
      <div>{`The current theme is ${theme}`}</div>
    </div>
  )
}

export default SendMessagePage
