// hooks/location/useLocationServices.ts
import { useState } from 'react';
import { Categories } from '@/types/components';

export const useLocationServices = () => {
    const [categories, setCategories] = useState<Categories>({
        exercise: true,
        shopping: false,
        frequent: false
    });

    const handleCategoryChange = (category: keyof Categories) => {
        setCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    return {
        categories,
        handleCategoryChange
    };
};