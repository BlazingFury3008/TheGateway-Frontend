const BACKEND_URL = process.env.BACKEND_URL

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const { email, username, password } = data

        const res = await fetch(`${BACKEND_URL}/credentials/signup`, {
            method: "POST",
            body: JSON.stringify({
                email, username, password
            }),
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!res.ok) {
            return Response.json({
                error: res.statusText, status: res.status
            })
        }

        return res
    } catch {
        return Response.json({ error: "Expected a JSON body." }, { status: 400 });
    }
}
