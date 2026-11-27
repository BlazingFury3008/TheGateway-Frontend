import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login({ swapTab }: { swapTab: () => void }) {
  const [credentials, setCredentials] = useState<Credentials>({
    username: undefined,
    conf_pass: undefined,
    email: "",
    password: "",
  });

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const router = useRouter()

  useEffect(() => {
    if (
      credentials.email == "" ||
      credentials.password == ""
    ) {
      setErrorMessage("");
      setIsDisabled(true);
      return;
    }

    setErrorMessage("");
    setIsDisabled(false);
  }, [credentials]);

  async function login() {
    try {
      const res = await fetch("/api/credentials/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        setErrorMessage(`${res.statusText}`);
        return;
      }

      router.push("/account")
    } catch {
      setErrorMessage("Internal Server Error");
    }
  }

  return (
    <section aria-labelledby="signup-title">
      <h1 id="signup-title" className="text-3xl font-semibold tracking-tight">
        Return to the Gateway
      </h1>

      <div className="mt-7 space-y-4 rounded-2xl border border-border bg-surface p-5 motion-safe:transition-colors motion-safe:duration-200 sm:p-6">
        <label className="block text-sm font-medium">
          Email
          <input
            className="form-input"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={credentials?.email}
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
        </label>
        <label className="block text-sm font-medium">
          Password
          <input
            className="form-input"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={credentials?.password}
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
        </label>
        <div className="min-h-2 max-h-2">
          <p className="error-text">{errorMessage}</p>
        </div>
        <div className="pt-2">
          <button
            onClick={() => login()}
            type="button"
            disabled={isDisabled}
            className="button button-primary w-full"
          >
            Login account
          </button>
          <p className="mt-2 text-center text-xs text-muted">
            Don't have an account?{" "}
            <button type="button" className="text-action" onClick={swapTab}>
              SIgn up
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
