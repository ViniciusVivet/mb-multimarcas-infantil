"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { loginAction } from "./actions";
import Image from "next/image";
import { AdminNotice } from "./_components/AdminNotice";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="button button-primary w-full py-3 text-sm font-bold disabled:opacity-60"
    >
      {pending ? "Entrando..." : "Entrar"}
    </button>
  );
}

function wrappedLogin(_prev: unknown, formData: FormData) {
  return loginAction(formData);
}

export default function AdminLoginPage() {
  const [state, action] = useFormState(wrappedLogin, undefined);
  const [dismissedError, setDismissedError] = useState<string | null>(null);

  useEffect(() => {
    setDismissedError(null);
  }, [state?.error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <AdminNotice
        open={!!state?.error && dismissedError !== state.error}
        title="Não consegui entrar"
        message={state?.error}
        variant="error"
        onClose={() => setDismissedError(state?.error ?? null)}
      />

      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-soft">
        <div className="mb-6 flex justify-center">
          <Image src="/logo.jpg" alt="MB Multimarcas Infantil" width={80} height={80} className="rounded-2xl" />
        </div>
        <h1 className="mb-1 text-center text-xl font-black text-ink">Painel Admin</h1>
        <p className="mb-6 text-center text-sm text-muted">MB Multimarcas Infantil</p>

        <form action={action} className="flex flex-col gap-4">
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-ink">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              placeholder="Digite a senha de acesso"
              className="input w-full"
            />
          </div>

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
