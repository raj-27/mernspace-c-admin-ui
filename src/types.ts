export type Credentials = {
    email: string;
    password: string;
};

export enum PaymentMode {
    CARD = 'card',
    CASH = 'cash',
}

export enum OrderStatus {
    RECIEVED = 'recieved',
    CONFIRMED = 'confirmed',
    PREPARED = 'prepared',
    // READY_FOR_DELIVERY = "ready_for_delivery",
    OUT_FOR_DELIVERY = 'out_for_delivery',
    DELIVERED = 'delivered',
}

export enum PaymentStatus {
    PENDING = 'pending',
    PAID = 'paid',
    FAILED = 'failed',
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    tenant: Tenant | null;
}

export interface CreateUserData {
    email: string;
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    tenantId: number | null;
}

export type UsersFilterProps = {
    onFilterChange?: (filterName: string, filterValue: string) => void;
    children: React.ReactNode;
};

export interface Tenant {
    id: number;
    name: string;
    address: string;
}

export interface FieldsData {
    name: string[];
    value?: string;
}

export interface PriceConfiguration {
    [key: string]: {
        priceType: 'base' | 'aditional';
        availableOptions: string[];
    };
}

export interface Attribute {
    name: string;
    widgetType: 'switch' | 'radio';
    defaultValue: string;
    availableOptions: string[];
}

export interface Category {
    _id: string;
    name: string;
    priceConfiguration: PriceConfiguration;
    attributes: Attribute[];
}

export type ProductAttribute = {
    name: string;
    value: string | boolean;
};

export type Product = {
    _id: string;
    name: string;
    description: string;
    category: Category;
    priceConfiguration: PriceConfiguration;
    attributes: ProductAttribute[];
    isPublish: boolean;
    createdAt: string;
    image: string;
};

export interface Topping {
    _id: string;
    name: string;
    image: string;
    price: number;
    tenantId: string;
    isPublish: boolean;
}

export type PricingProp = {
    selectedCategory: string;
};

export type ImageField = { file: File };
export type CreateProductData = Product & { image: ImageField };
export type CreateToppingData = Topping & { image: ImageField };

export type MakeFormData = {
    data: CreateProductData | CreateToppingData;
};

export interface Customer {
    _id: string;
    firstName: string;
    lastName: string;
}

export interface CartItem extends Pick<Product, '_id' | 'name' | 'image' | 'priceConfiguration'> {
    chosenConfiguration: {
        priceConfiguration: {
            [key: string]: string;
        };
        selectedToppings: Topping[];
    };
    qty: number;
}

export interface Order {
    _id: string;
    cart: CartItem[];
    customer: Customer[];
    totalAmount: number;
    discount: number;
    taxes: number;
    deliveryCharges: number;
    address: string;
    tenantId: number | string;
    comment?: string;
    paymentMode: PaymentMode;
    orderStatus: OrderStatus;
    paymentStatus: PaymentStatus;
    paymentId?: string | number;
    createdAt: string;
}
