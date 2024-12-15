export type Credentials = {
    email: string;
    password: string;
};

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

export type PricingProp = {
    selectedCategory: string;
};

export type ImageField = { file: File };
export type CreateProductData = Product & { image: ImageField };
