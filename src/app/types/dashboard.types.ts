export namespace TransactionNS {
    /**
    * @interface
    * Used in list by date transactions API which provides list of transactions by date wise along with values
    * like **debit**, **credit**, **date of transaction** and **count** (no of transactions).
    */
    export interface IList {
        debit: number;
        credit: number;
        date: string;
        count: number;
        date_link: string;
    }

    export interface ITransactionByDate {
        id: string;
        amount: number;
        description: string;
        type: TransactionType;
        from_bank: string | null;
        to_bank: string | null;
        category: string;
    }

    export interface IDataByDate {
        debit: number;
        credit: number;
        partial_debit: number;
        partial_credit: number;
        transactions: ITransactionByDate[];
    }

    export interface IListParams {
        date: string;
    }

    export enum TransactionType {
        Debit = 1,
        Credit = 2,
        PartialDebit = 3,
        PartialCredit = 4
    }
    
    export interface ITransactionInsertPayload {
        amount: number;
        type: TransactionType;
        description: string;
        date: string;
        due: boolean;
        from_bank: string;
        to_bank: string;
        category_id: string;
    }
}

export namespace BankNS {
    export interface IList {
        id: string;
        name: string;
    }

    export interface IPayload {
        name: string;
    }
}

export namespace CategoryNS {
    export interface IList {
        id: string;
        name: string;
    }

    export interface IPayload {
        name: string;
    }
}