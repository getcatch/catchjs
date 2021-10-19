type Theme = "default";

type PageType =
  | "unknown"
  | "home"
  | "product"
  | "mini-cart"
  | "cart"
  | "checkout"
  | "demo";

interface CheckoutPrefill {
  userPhone?: string;
  userName?: string;
  userEmail?: string;
}

interface OpenCheckoutOptions {
  inline?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
  prefill?: CheckoutPrefill;
}

interface CatchOptions {
  theme?: Theme;
  pageType?: PageType;
}

interface CatchHandle {
  setPageType: (pageType: PageType) => void;
  openCheckout: (checkoutId: string, options?: OpenCheckoutOptions) => void;
}

interface SDKInfo {
  packageVersion: string;
  releaseId: string;
  mode: string;
}

interface CatchSDK {
  init: (publicKey: string, options?: CatchOptions) => Promise<CatchHandle>;
  info: SDKInfo;
}

interface CatchLoadOptions {
  live?: boolean;
}

interface CatchWindow extends Window {
  catchjs?: CatchSDK;
}

export type {
  Theme,
  PageType,
  CheckoutPrefill,
  OpenCheckoutOptions,
  CatchOptions,
  CatchHandle,
  SDKInfo,
  CatchSDK,
  CatchLoadOptions,
  CatchWindow,
};