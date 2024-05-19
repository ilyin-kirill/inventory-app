import { faker } from '@faker-js/faker';

export type TAvailibility = {
    amount: number;
};

export type TEquipment = {
    name: string;
    code: string;
    invetoryCode: string;
    okeiCode: string;
    pasportCode: string;
    price: number;
    fact: TAvailibility;
    accountant: TAvailibility;
    unit: string;
};

const range = (len: number) => {
    const arr: number[] = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const newEqipment = (): TEquipment => {
    const amount = faker.number.int(100);

    return {
        name: faker.commerce.productName(),
        code: faker.finance.accountNumber(),
        invetoryCode: faker.finance.accountNumber(),
        okeiCode: faker.finance.accountNumber(),
        pasportCode: faker.finance.accountNumber(),
        price: faker.number.int(1000),
        fact: {
            amount,
        },
        accountant: {
            amount,
        },
        unit: 'шт.',
    };
};

export function makeInventoryData(...lens: number[]) {
    const makeDataLevel = (depth = 0): TEquipment[] => {
        const len = lens[depth]!;
        return range(len).map((d): TEquipment => {
            return {
                ...newEqipment(),
            };
        });
    };

    return makeDataLevel();
}
