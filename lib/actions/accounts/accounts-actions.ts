import prisma from "@/lib/prisma";

export async function getAccountsLinked(apiKeyId?: string) {
    if (!apiKeyId) {
        return []
    }

    const accounts = await prisma.playerAccount.findMany({
        where: {
            apiKeyId
        }
    })

    return accounts
}