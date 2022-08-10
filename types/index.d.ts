type Theme = "light-color" | "light-mono" | "dark-color" | "dark-mono";

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
  autoCloseOnConfirm?: boolean;
  hideHeader?: boolean;
}

interface CatchOptions {
  theme?: Theme;
  pageType?: PageType;
}

interface CatchHandle {
  setTheme: (theme: Theme) => void;
  setPageType: (pageType: PageType) => void;
  trackPaymentMethodSelected: () => void;
  openCheckout: (checkoutId: string, options?: OpenCheckoutOptions) => void;
  closeConfirmedCheckout: () => void;
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

declare module "@get-catch/catchjs" {
  const loadCatchjs: (options: CatchLoadOptions) => Promise<CatchSDK>;
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
