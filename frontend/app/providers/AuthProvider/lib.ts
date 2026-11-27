export type AuthenticationLevel = "authenticated" | "unauthenticated" | "loading"

export type AuthContextProps = {
    userData: UserData | null,
    authenticated: AuthenticationLevel
}


export type UserData = Record<string, any>