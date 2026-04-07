import prisma from "@/lib/prisma"
import { getSession } from "../auth-actions"
import { PetPotion, PETRARITY, PetVariant } from "@/app/generated/prisma/enums"

type InventoryPet = {
    id: string
    name: string
    quantity: number
    thumbnailImage: string | null
    accountCount: number
    pet: {
        variant: PetVariant
        potion: PetPotion
        rarity: PETRARITY
    } | null
}

export async function getInventoryPets(): Promise<InventoryPet[]> {
    const session = await getSession()

    if (!session?.user?.id) {
        return []
    }

    const inventoryPets = await prisma.item.findMany({
        where: {
            type: "PET",
            playerAccount: {
                userId: session.user.id,
            },
        },
        include: {
            pet: true,
            playerAccount: {
                select: {
                    id: true,
                },
            },
        },
    })

    const petMap = new Map<
        string,
        {
            id: string
            name: string
            quantity: number
            thumbnailImage: string | null
            pet: {
                variant: PetVariant
                potion: PetPotion
                rarity: PETRARITY
            } | null
            accountIds: Set<string>
        }
    >()

    for (const item of inventoryPets) {
        const key = [
            item.name,
            item.pet?.variant ?? "NORMAL",
            item.pet?.potion ?? "NONE",
        ].join("|")

        if (!petMap.has(key)) {
            petMap.set(key, {
                id: item.id,
                name: item.name,
                quantity: 0,
                thumbnailImage: item.thumbnailImage ?? null,
                pet: item.pet
                    ? {
                        variant: item.pet.variant,
                        potion: item.pet.potion,
                        rarity: item.pet.rarity
                    }
                    : null,
                accountIds: new Set(),
            })
        }

        const existing = petMap.get(key)!
        existing.quantity += item.quantity
        existing.accountIds.add(item.playerAccount.id)
        if (!existing.thumbnailImage && item.thumbnailImage) {
            existing.thumbnailImage = item.thumbnailImage
        }
    }

    return Array.from(petMap.values()).map((pet) => ({
        id: pet.id,
        name: pet.name,
        quantity: pet.quantity,
        thumbnailImage: pet.thumbnailImage,
        pet: pet.pet,
        accountCount: pet.accountIds.size,
    }))
}