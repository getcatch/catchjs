import { CardDetails, CreateVCNCheckoutPayload } from "./vcn";

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

interface VirtualCardCheckoutOptions extends OpenCheckoutOptions {
  onConfirm?: (cardDetails?: CardDetails) => void;
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
  createAndOpenVirtualCardCheckout: (
    orderId: string,
    createVCNCheckoutPayload: CreateVCNCheckoutPayload,
    options?: VirtualCardCheckoutOptions
  ) => void;
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

type CatchEnvironment = "development" | "staging" | "production";

interface CatchLoadOptions {
  live?: boolean;
  environment?: CatchEnvironment;
}

interface CatchWindow extends Window {
  catchjs?: CatchSDK;
}

declare module "@get-catch/catchjs" {
  const loadCatchjs: (options?: CatchLoadOptions) => Promise<CatchSDK>;
}

export type {
  Theme,
  PageType,
  CheckoutPrefill,
  OpenCheckoutOptions,
  VirtualCardCheckoutOptions,
  CatchOptions,
  CatchHandle,
  CreateVCNCheckoutPayload,
  SDKInfo,
  CatchSDK,
  CatchLoadOptions,
  CatchWindow,
  CatchEnvironment,
};
