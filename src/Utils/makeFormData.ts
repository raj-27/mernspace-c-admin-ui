import { ImageField, MakeFormData } from '../types';

export const makeFormData = (data: MakeFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (key === 'image') {
            // do something
            formData.append(key, (value as unknown as ImageField).file);
        } else if (key === 'priceConfiguration' || key === 'attributes') {
            formData.append(key, JSON.stringify(value));
        } else {
            formData.append(key, value as unknown as string);
        }
    });
    return formData;
};
