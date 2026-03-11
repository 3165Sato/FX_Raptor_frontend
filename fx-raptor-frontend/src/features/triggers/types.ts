export type TriggerOrderRequest = {
  accountId: string | number;
  currencyPair: string;
  side: "BUY" | "SELL";
  triggerType: "STOP" | "TAKE_PROFIT";
  triggerPrice: number;
  quantity: number;
};

export type TriggerOrderResponse = {
  triggerOrderId: string | number;
  status: string;
  message: string;
  createdAt: string;
};

export type Quote = {
  currencyPair: string;
  bid: number;
  ask: number;
  timestamp: string;
};
