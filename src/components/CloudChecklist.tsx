"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import { useApp } from "@/services/store";

type CloudItem = { id: string; label: string; done: boolean };

export function CloudChecklist() {
  const { sync } = useApp();
  const [items, setItems] = useState<CloudItem[]>([]);
  const [message, setMessage] = useState("Carregando dados da nuvem…");

  const refresh = useCallback(async () => {
    if (!sync.spaceId) return;
    setMessage("Carregando dados da nuvem…");
    const { data, error } = await supabase
      .from("shared_link_spaces")
      .select("data,updated_at")
      .eq("id", sync.spaceId)
      .single();

    if (error) {
      setMessage(`Erro ao consultar o Supabase: ${error.message}`);
      return;
    }

    const state = data?.data as { checklist?: unknown } | null;
    const checklist = Array.isArray(state?.checklist) ? state.checklist : [];
    setItems(checklist.filter((item): item is CloudItem =>
      !!item && typeof item.id === "string" && typeof item.label === "string" && typeof item.done === "boolean"
    ));
    setMessage(`Consulta concluída: ${new Date(data.updated_at ?? Date.now()).toLocaleString("pt-BR")}`);
  }, [sync.spaceId]);

  useEffect(() => { void refresh(); }, [refresh, sync.lastSync]);

  if (!sync.spaceId) return null;

  return (
    <section className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-bold">Checklist vindo da nuvem</h3>
        <button className="btn btn-soft !px-3 !py-2 text-xs" onClick={() => void refresh()}>Atualizar</button>
      </div>
      <p role="status" className="mt-2 text-xs text-[#a6a0cc]">{message}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.id} className="rounded-xl bg-white/[0.04] px-3 py-2 text-sm">
            {item.done ? "✓" : "○"} {item.label}
          </li>
        ))}
      </ul>
      {items.length === 0 && !message.startsWith("Erro") && <p className="mt-2 text-xs">Nenhum item cadastrado na viagem.</p>}
    </section>
  );
}
