import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { TransactionService } from '../../../services/export.service';
import { IApiResonse, StatusCode, IListByDate } from "../../../types/export.types";
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'dashboard',
    standalone: true,
    imports: [MatTableModule, MatButtonModule, CommonModule],
    templateUrl: './transactions.component.html',
    styleUrl: './transactions.component.scss'
})
export class TransactionListComponent implements OnInit, OnDestroy {
    columns: string[] = ['date', 'debit', 'credit', 'count'];
    error: boolean = false;
    message: string = "";
    private subscription: Subscription = new Subscription();
    dataSource: IListByDate[] = [
        { date: "2024-08-03", credit: 12.5, debit: 10, count: 10 },
        { date: "2024-08-04", credit: 1.5, debit: 20, count: 20 }
    ];

    @ViewChild('footer', { read: ViewContainerRef })
    footer!: ViewContainerRef;

    /**
     * @param TRANSACTION Service that allows to call `transactions` APIs as methods
     */
    constructor(private readonly TRANSACTION: TransactionService, private readonly ROUTER: Router, private readonly ACTIVEROUTE: ActivatedRoute) { }

    ngOnInit(): void {
        this.fetchTransactions();
    }

    private fetchTransactions(): void {
        this.TRANSACTION.listByDate().subscribe({ next: this.fetchTransactionsSuccess.bind(this), error: this.fetchTransactionsError.bind(this) });
    }

    private fetchTransactionsSuccess(response: IApiResonse<IListByDate[]>): void {
        if (response.status_code === StatusCode.OK) {
            this.dataSource = response?.result || [];
            return;
        }
    }

    private fetchTransactionsError(error: Error): void {
        this.message = JSON.stringify(error?.message);
        this.error = true;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    toAddView(): void {
        this.ROUTER.navigate(['add'], {relativeTo: this.ACTIVEROUTE});
    }
}
