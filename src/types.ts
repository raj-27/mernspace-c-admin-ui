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
