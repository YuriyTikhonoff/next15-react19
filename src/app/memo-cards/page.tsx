"use server"
import CardsList from "@/components/CardsList"

const MemoCardsPage: React.FC = async () => {
  const apiBaseUrl = process.env.API_BASE_URL || ""
  let cards = []
  let error: string | null = null

  try {
    const fetchedCards = await fetch(`${apiBaseUrl}/memo-cards`, {
      cache: "no-store",
    })

    if (!fetchedCards.ok) {
      throw new Error(`Failed to fetch: ${fetchedCards.status}`)
    }

    cards = await fetchedCards.json()
    console.log("fetched cards ", cards)
  } catch (err) {
    error =
      err instanceof Error ? err.message : "Unknown error fetching memo cards"
    console.log("Error fetching memo cards:", error)
  }

  return (
    <div>
      <h1>Memo Cards</h1>
      <p>This is the memo cards page.</p>
      {error ? (
        <p>Error loading cards: {error}</p>
      ) : (
        <CardsList cards={cards} />
      )}
    </div>
  )
}

export default MemoCardsPage
