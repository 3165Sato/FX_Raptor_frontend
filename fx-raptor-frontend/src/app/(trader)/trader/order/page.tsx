"use client";

import { useState } from "react";

import { Header } from "@/components/layout/Header";
import { MarketOrderForm } from "@/features/orders/components/MarketOrderForm";
import { OrderSubmitResult } from "@/features/orders/components/OrderSubmitResult";
import { QuotePanel } from "@/features/orders/components/QuotePanel";
import { useMarketOrderMutation, useQuoteQuery } from "@/features/orders/hooks";
import { MarketOrderRequest, MarketOrderResponse } from "@/features/orders/types";

const initialOrder: MarketOrderRequest = {
  accountId: "A-100",
  currencyPair: "USD/JPY",
  side: "BUY",
  quantity: 10000,
};

export default function TraderOrderPage() {
  const [selectedPair, setSelectedPair] = useState(initialOrder.currencyPair);
  const [submitResult, setSubmitResult] = useState<MarketOrderResponse | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const quoteQuery = useQuoteQuery(selectedPair);
  const marketOrderMutation = useMarketOrderMutation();

  async function handleSubmit(payload: MarketOrderRequest) {
    setSelectedPair(payload.currencyPair);
    setSubmitResult(null);
    setSubmitError(null);

    try {
      const response = await marketOrderMutation.mutateAsync(payload);
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
      <Header title="成行注文" description="現在レートを確認しながら、投資家向けの成行注文を送信できます。" />
      <main className="space-y-6 p-6">
        <section className="grid gap-6 xl:grid-cols-[1.1fr_1fr]">
          <QuotePanel quote={quoteQuery.data} isLoading={quoteQuery.isLoading || quoteQuery.isFetching} />
          <MarketOrderForm
            initialValue={initialOrder}
            onSubmit={handleSubmit}
            isSubmitting={marketOrderMutation.isPending}
            onCurrencyPairChange={handleCurrencyPairChange}
          />
        </section>

        <OrderSubmitResult result={submitResult} errorMessage={submitError} />
      </main>
    </div>
  );
}
