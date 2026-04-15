import { store } from "@/data/store";

export function Footer() {
  return (
    <footer className="flex flex-col gap-3 bg-ink px-5 py-7 text-white sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
      <p className="m-0 font-black">{store.name}</p>
      <a href={store.instagram} target="_blank" rel="noreferrer" className="text-white/90 hover:text-white">
        @mb.multimarcas_infantil
      </a>
    </footer>
  );
}
