import type { NextRequest } from "next/server"

const BACKEND_URL = process.env.BACKEND_URL


export async function GET(request: NextRequest) {

    // Set the cookie to grab otherwise it will drop the session token cookie
    const sessionToken = request.cookies.get("session_token")
    const headers = new Headers()
    if (sessionToken) {
        headers.set("Cookie", `session_token=${encodeURIComponent(sessionToken.value)}`)
    }

    try {
        const res = await fetch(`${BACKEND_URL}/credentials/me`, {
            headers,
            cache: "no-store",
        })

        if (!res.ok) {
            return Response.json({ message: res.statusText }, { status: res.status })
        }

        const data = await res.json()

        return Response.json({
            "data": data
        }, { status: 200 })
    } catch (error) {
        return Response.json({
            "message": "Error in /me route retrieval"
        }, { status: 500 })
    }
}