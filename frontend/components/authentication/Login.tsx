export default function Login({ swapTab } : { swapTab : () => void}) {
  
  
  
  return (
    <section aria-labelledby="login-title">
      <h1 id="login-title" className="text-3xl font-semibold tracking-tight">
        Log in to The Gateway
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
          />
        </label>
        <label className="block text-sm font-medium">
          Password
          <input
            className="form-input"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </label>

        <div className="pt-2">
          <button
            type="button"
            disabled
            className="button button-primary w-full"
          >
            Log in
          </button>
          <p className="mt-2 text-center text-xs text-muted">
            Don't have an account?{" "}
            <button type="button" className="text-action" onClick={swapTab}>
              Create one here!
            </button>
          </p>

        </div>
      </div>
    </section>
  );
}
