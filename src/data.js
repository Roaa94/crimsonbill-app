export const types = [
    {
        id: 0,
        name: 'Type-1',
    },
    {
        id: 1,
        name: 'Type-2',
    },
    {
        id: 3,
        name: 'Type-3',
    },
];

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

export const categories = [
    {
        id: 0,
        name: 'Groceries',
        icon: 'category_rounded_icon',
    },
    {
        id: 1,
        name: 'Gas',
        icon: 'category_rounded_icon',
    },
    {
        id: 2,
        name: 'Misc',
        icon: 'category_rounded_icon',
    },
];

export const defaultSpendingCategories = [
    {
        name: 'Miscellaneous',
        icon: 'category_rounded_icon',
    },
    {
        name: 'Personal',
        icon: 'face_rounded_icon',
    },
    {
        name: 'Entertainment',
        icon: 'theaters_rounded_icon',

    },
    {
        name: 'Utilities',
        icon: 'flash_on_rounded_icon',
    },
    {
        name: 'Food',
        icon: 'fast_food_rounded_icon',

    },
    {
        name: 'Transportation',
        icon: 'commute_rounded_icon',
    },
    {
        name: 'Housing',
        icon: 'home_rounded_icon',
    }
];

export const defaultAccountTypes = [
    {
        name: 'Bank Account',
        icon: 'account_balance_rounded_icon',
    },
    {
        name: 'Online Banking Account',
        icon: 'language_rounded_icon',
    },
    {
        name: 'Cash',
        icon: 'account_balance_wallet_rounded_icon',
    }
];

export const appTaxonomies = [
    {
        name: 'accountTypes',
        defaultValues: defaultAccountTypes,
    },
    {
        name: 'spendingCategories',
        defaultValues: defaultSpendingCategories,
    }
];