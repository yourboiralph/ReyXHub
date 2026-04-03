"use server"

import { headers } from "next/headers"
import { auth } from "../auth"


export async function registerEmail(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirm-password") as string
    const name = formData.get("name") as string

    await auth.api.signUpEmail({
        body: {
            name,
            email,
            password
        },
        headers: await headers()
    })
}