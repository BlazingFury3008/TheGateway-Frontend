import { useEffect, useState } from "react";

export default function Signup({ swapTab }: { swapTab: () => void }) {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    email: "",
    password: "",
    conf_pass: "",
  });

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    if (
      credentials.username == "" ||
      credentials.email == "" ||
      credentials.password == "" ||
      credentials.conf_pass == ""
    ) {
      setErrorMessage("")
      setIsDisabled(true);
      return;
    }

    if (credentials.password != credentials.conf_pass) {
      setIsDisabled(true);
      setErrorMessage("Passwords must match");
      return;
    }

    setErrorMessage("");
    setIsDisabled(false);
  }, [credentials]);

  async function signup() {
    try {
      const res = await fetch("/api/credentials/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        setErrorMessage(`${res.statusText}`);
        return;
      }
      else
      {
        alert("THIS WILL BE USER HANDLING")
      }

    } catch {
      setErrorMessage("Internal Server Error");
    }
  }

  return (
    <section aria-labelledby="signup-title">
      <h1 id="signup-title" className="text-3xl font-semibold tracking-tight">
        Create your Gateway Account
      </h1>

      <div className="mt-7 space-y-4 rounded-2xl border border-border bg-surface p-5 motion-safe:transition-colors motion-safe:duration-200 sm:p-6">
        <label className="block text-sm font-medium">
          Username
          <input
            className="form-input"
            name="username"
            type="text"
            autoComplete="username"
            required
            value={credentials?.username}
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                username: e.target.value,
              }))
            }
          />
        </label>
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
        <label className="block text-sm font-medium">
          Confirm password
          <input
            className="form-input"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={credentials?.conf_pass}
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                conf_pass: e.target.value,
              }))
            }
          />
        </label>

        <div className="min-h-2 max-h-2">
          <p className="error-text">{errorMessage}</p>
        </div>
        <div className="pt-2">
          <button
            onClick={() => signup()}
            type="button"
            disabled={isDisabled}
            className="button button-primary w-full"
          >
            Create account
          </button>
          <p className="mt-2 text-center text-xs text-muted">
            Already have an account?{" "}
            <button type="button" className="text-action" onClick={swapTab}>
              Log in
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
