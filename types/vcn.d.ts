interface Amounts {
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount_total?: number;
  currency: string;
}

interface Billing {
  name: string;
  address_1: string;
  address_2?: string;
  city: string;
  area?: string;
  zone_code: string;
  country_code: string;
  postal_code: string;
  phone_number?: string;
}

interface Shipping {
  name: string;
  address_1: string;
  address_2?: string;
  city: string;
  area?: string;
  zone_code: string;
  country_code: string;
  postal_code: string;
  phone_number?: string;
}

interface Price {
  amount: number;
  currency: string;
}

interface Item {
  name: string;
  sku: string;
  price: Price;
  quantity: number;
  category?: Array<string>;
  image_url: string;
}

type Items = Array<Item>;

interface Platform {
  platform_type?: string;
  platform_version?: string;
}

interface CreateVirtualCardCheckoutPayload {
  merchant_order_id: string;
  merchant_user_id: string;
  amounts: Amounts;
  billing: Billing;
  shipping: Shipping;
  shipping_method: string;
  user_cohorts: Array<string>;
  items: Items;
  platform: Platform;
}

interface CardDetails {
  card_number: string;
  expiration_year: string;
  expiration_month: string;
  cvc: string;
  zip_code: string;
}

export type { CardDetails, CreateVirtualCardCheckoutPayload };
