"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction } from "./actions";
import Image from "next/image";

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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
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

          {state?.error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {state.error}
            </p>
          )}

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
