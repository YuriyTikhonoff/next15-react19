import axios from "axios"
import { mutate } from "swr"

import { Endpoints } from "@/constants/endpoints"
import { MemoCard } from "@/types/app"

class CardsRepository {
  private static instance: CardsRepository
  private cards: MemoCard[] = []

  private constructor() {}

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
      categoryId: card.category?.id,
    }
    console.log("Adding card to backend:", cardPayload)
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
      mutate(Endpoints.Cards)
    } catch (error) {
      console.error("Error adding card to backend:", error)
    }
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
      mutate(Endpoints.Cards)
    } catch (error) {
      console.error("Error updating card to backend:", error)
    }
  }

  public getCards(): MemoCard[] {
    const cards = null
    this.cards = cards ? JSON.parse(cards) : []
    return this.cards
  }

  public async removeCard(cardId: MemoCard["id"]): Promise<void> {
    try {
      await axios.delete(`/api/memo-cards/${cardId}`)
      mutate(Endpoints.Cards)
    } catch (error) {
      console.error("Error removing card from backend:", error)
    }
  }
}

export default CardsRepository.getInstance()
