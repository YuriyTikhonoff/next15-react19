import Link from "next/link"

export default function Navigation() {
  return (
    <nav style={{ display: "flex", gap: "1rem" }}>
      <Link href="/about">About</Link>
      <Link href="/contacts">Contacts</Link>
      <Link href="/send-message">Send message</Link>
    </nav>
  )
}
