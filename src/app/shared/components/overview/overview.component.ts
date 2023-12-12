import { Component, Input, TemplateRef } from '@angular/core';
import { OverviewTableColumn } from '../../classes/overview-table-column';
import { StringFormatterService } from 'src/app/core/services/string-formatter.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
  @Input() items!: any[];
  @Input() tableBodyExtensionHtml!:TemplateRef<any>;
  @Input() tableHeadExtensionHtml!:TemplateRef<any>;
  @Input() columns!: OverviewTableColumn[]; 

  constructor(private stringFormatter:StringFormatterService){} 

  get columnKeys(): string[] {
    return this.columns.map(column => column.key);
  }
  
  get columnNames(): string[] {
    return this.columns.map(column => column.name);
  }
  
  formatValue(value:any):string{
    return this.stringFormatter.formatValue(value);
  }
}