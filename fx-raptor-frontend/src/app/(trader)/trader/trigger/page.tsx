"use client";

import { useState } from "react";

import { Header } from "@/components/layout/Header";
import { QuotePanel } from "@/features/triggers/components/QuotePanel";
import { TriggerOrderForm } from "@/features/triggers/components/TriggerOrderForm";
import { TriggerSubmitResult } from "@/features/triggers/components/TriggerSubmitResult";
import { useCreateTriggerMutation, useTriggerQuoteQuery } from "@/features/triggers/hooks";
import { TriggerOrderRequest, TriggerOrderResponse } from "@/features/triggers/types";

const initialTriggerOrder: TriggerOrderRequest = {
  accountId: "A-100",
  currencyPair: "USD/JPY",
  side: "BUY",
  triggerType: "STOP",
  triggerPrice: 149.15,
  quantity: 10000,
};

export default function TraderTriggerPage() {
  const [selectedPair, setSelectedPair] = useState(initialTriggerOrder.currencyPair);
  const [submitResult, setSubmitResult] = useState<TriggerOrderResponse | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const quoteQuery = useTriggerQuoteQuery(selectedPair);
  const createTriggerMutation = useCreateTriggerMutation();

  async function handleSubmit(payload: TriggerOrderRequest) {
    setSelectedPair(payload.currencyPair);
    setSubmitResult(null);
    setSubmitError(null);

    try {
      const response = await createTriggerMutation.mutateAsync(payload);
      setSubmitResult(response);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      setSubmitError(message);
      throw error;
    }
  }

  function handleCurrencyPairChange(currencyPair: string) {
    setSelectedPair(currencyPair);
    setSubmitResult(null);
    setSubmitError(null);
  }

  return (
    <div>
      <Header
        title="Trigger注文"
        description="現在レートを確認しながら、STOP / TAKE_PROFIT の Trigger 注文を登録できます。"
      />
      <main className="space-y-6 p-6">
        <section className="grid gap-6 xl:grid-cols-[1.1fr_1fr]">
          <QuotePanel quote={quoteQuery.data} isLoading={quoteQuery.isLoading || quoteQuery.isFetching} />
          <TriggerOrderForm
            initialValue={initialTriggerOrder}
            onSubmit={handleSubmit}
            isSubmitting={createTriggerMutation.isPending}
            onCurrencyPairChange={handleCurrencyPairChange}
          />
        </section>

        <TriggerSubmitResult result={submitResult} errorMessage={submitError} />
      </main>
    </div>
  );
}
