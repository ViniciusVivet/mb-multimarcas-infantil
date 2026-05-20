export function friendlyAdminError(action: string) {
  return `${action}. Confira sua conexão e tente novamente. Se continuar acontecendo, revise a configuração do Supabase.`;
}
