import { useEffect, useState } from "react";

type TaxaResponse = {
  nome: string;
  valor: number;
};

export function useSelicRate() {
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSelic() {
      try {
        const response = await fetch("https://brasilapi.com.br/api/taxas/v1/selic");
        
        if (!response.ok) {
          throw new Error("Falha ao buscar taxa Selic");
        }

        const data: TaxaResponse = await response.json();
        setRate(data.valor);
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar taxa Selic:", err);
        setError(err instanceof Error ? err.message : "Erro desconhecido");
        // Fallback para taxa padrão se a API falhar
        setRate(11.25);
      } finally {
        setLoading(false);
      }
    }

    fetchSelic();
  }, []);

  return { rate, loading, error };
}
