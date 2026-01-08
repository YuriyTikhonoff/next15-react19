import { MemoCard } from "@/types/app"
import axios from "axios"

class CardsRepository {
  private static instance: CardsRepository
  private cards: MemoCard[] = []

  private constructor() {}

  public saveCardsPersistently(cards: MemoCard[]): void {
    console.log("Saving cards persistently:", cards)
  }

  public static getInstance(): CardsRepository {
    if (!this.instance) {
      this.instance = new CardsRepository()
    }
    return this.instance
  }

  public async addCard(card: MemoCard): Promise<void> {
    const cardPayload = {
      title: card.title,
      front: card.front,
      back: card.back,
      categoryId: card.category,
    }
    try {
      const response = await fetch(`/api/memo-cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardPayload),
      })
      if (!response.ok) {
        throw new Error(`Failed to add card: ${response.status}`)
      }
    } catch (error) {
      console.error("Error adding card to backend:", error)
    }
    this.cards.push(card)
    this.saveCardsPersistently(this.cards)
  }

  public async updateCard(card: MemoCard): Promise<void> {
    const cardPayload = {
      title: card.title,
      front: card.front,
      back: card.back,
      categoryId: card.category?.id,
    }
    try {
      const response = await fetch(`/api/memo-cards/${card.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardPayload),
      })
      if (!response.ok) {
        throw new Error(`Failed to update card: ${response.status}`)
      }
    } catch (error) {
      console.error("Error updating card to backend:", error)
    }
    const updatedCards = this.cards.map(currentCard =>
      currentCard.id === card.id ? card : currentCard
    )
    this.cards = updatedCards
    this.saveCardsPersistently(this.cards)
  }

  public getCards(): MemoCard[] {
    const cards = null
    this.cards = cards ? JSON.parse(cards) : []
    return this.cards
  }

  public async removeCard(cardId: MemoCard["id"]): Promise<void> {
    try {
      await axios.delete(`/api/memo-cards/${cardId}`)
      this.cards = this.cards.filter(card => card.id !== cardId)
      this.saveCardsPersistently(this.cards)
    } catch (error) {
      console.error("Error removing card from backend:", error)
    }
  }
}

export default CardsRepository.getInstance()
