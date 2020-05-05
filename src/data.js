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
    },
    {
        id: 1,
        name: 'Gas',
    },
    {
        id: 2,
        name: 'Misc',
    },
];

export const defaultSpendingCategories = [
    {
        name: 'Groceries',
        icon: '',
    },
    {
        name: 'Gas',
        icon: '',
    },
    {
        name: 'Miscellaneous',
        icon: '',
    },
    {
        name: 'Personal',
        icon: '',
    },
    {
        name: 'Entertainment',
        icon: '',

    },
    {
        name: 'Utilities',
        icon: '',
    },
    {
        name: 'Food',
        icon: '',

    },
    {
        name: 'Transportation',
        icon: '',
    },
    {
        name: 'Housing',
        icon: '',
    }
];

export const defaultAccountTypes = [
    {
        name: 'Bank Account',
        icon: '',
    },
    {
        name: 'Online Banking Account',
        icon: '',
    },
    {
        name: 'Cash',
        icon: '',
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