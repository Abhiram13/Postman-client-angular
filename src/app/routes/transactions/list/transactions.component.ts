import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { TransactionService } from '../../../services/export.service';
import { IApiResonse, StatusCode, TransactionNS } from "../../../types/export.types";
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FooterService } from '../../../services/footer.service';
import { AppDirective, MarginDirective, TextDirective } from '../../../directives/directives';

@Component({
    selector: 'dashboard',
    standalone: true,
    imports: [MatTableModule, MatButtonModule, CommonModule, MarginDirective, TextDirective, AppDirective],
    templateUrl: './transactions.component.html',
    styleUrl: './transactions.component.scss'
})
export class TransactionListComponent implements OnInit, OnDestroy {
    public columns: string[] = ['date', 'debit', 'credit', 'count'];
    public error: boolean = false;
    public message: string = "";
    public dataSource: TransactionNS.IList[] = [];
    private subscription: Subscription = new Subscription();    

    @ViewChild('footer', { read: ViewContainerRef })
    public footer!: ViewContainerRef;

    /**
     * @param TRANSACTION Service that allows to call `transactions` APIs as methods
     */
    constructor(private readonly TRANSACTION: TransactionService, private readonly ROUTER: Router, private readonly ACTIVEROUTE: ActivatedRoute, private readonly FOOTER: FooterService) { }

    ngOnInit(): void {
        this.fetchTransactions();
    }

    private fetchTransactions(): void {
        this.subscription = this.TRANSACTION.list<TransactionNS.IList[]>().subscribe({ next: this.fetchTransactionsSuccess.bind(this), error: this.fetchTransactionsError.bind(this) });
    }

    private fetchTransactionsSuccess(response: IApiResonse<TransactionNS.IList[]>): void {
        if (response.status_code === StatusCode.OK) {
            this.dataSource = response?.result || [];
            return;
        } else {
            this.FOOTER.invoke(response?.message || "Something went wrong", "Dismiss");
        }
    }

    private fetchTransactionsError(error: Error): void {
        this.FOOTER.invoke(error?.message || "Something went wrong", "Dismiss");
    }

    toDateView(date: string): void {
        this.ROUTER.navigate([date], {relativeTo: this.ACTIVEROUTE});
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    toAddView(): void {
        this.ROUTER.navigate(['add'], {relativeTo: this.ACTIVEROUTE});
    }
}
