export const currencies = [
    {
        id: 0,
        name: '$',
    },
    {
        id: 1,
        name: '$',
    },
    {
        id: 3,
        name: '$',
    },
];

export const defaultCurrency = {
    code: 'USD',
    name: 'United States Dollar',
    isDefault: true,
}

export const appCurrencies = [
    defaultCurrency,
    {
        code: 'TRY',
        name: 'Turkish Lira',
        isDefault: false,
    },
    {
        code: 'GBP',
        name: 'British Pound',
        isDefault: false,
    },
    {
        code: 'EUR',
        name: 'Euro',
        isDefault: false,
    }
];