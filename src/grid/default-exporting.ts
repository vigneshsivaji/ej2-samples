import { Grid, Page, Toolbar, ExcelExport, PdfExport, Group, Aggregate } from '@syncfusion/ej2-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { orderData } from './datasource';

Grid.Inject(Page, Toolbar, ExcelExport, PdfExport, Group, Aggregate);
/**
 * Excel,PDF, CSV export sample
 */
this.default = (): void => {
    let grid: Grid = new Grid(
        {
            dataSource: orderData.splice(0, 200),
            allowExcelExport: true,
            allowPdfExport: true,
            allowPaging: true,
            allowGrouping: true,
            toolbar: ['excelexport', 'pdfexport', 'csvexport'],
            groupSettings: { showDropArea: false, columns: ['ShipCountry'] },
            pageSettings: { pageCount: 5 },
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'right' },
                { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'right' },
                { field: 'Freight', width: 120, format: 'C2', textAlign: 'right' },
                { field: 'ShipCountry', visible: false, headerText: 'Ship Country', width: 150 },
                { field: 'ShipCity', visible: false, headerText: 'Ship City', width: 150 }
            ],
            aggregates: [{
                columns: [{
                    type: 'sum',
                    field: 'Freight',
                    format: 'C2',
                    groupFooterTemplate: 'Total freight: ${sum}'
                }]
            }]
        });
    grid.appendTo('#Grid');
    grid.toolbarClick = (args: ClickEventArgs) => {
        if (args.item.id === 'Grid_pdfexport') {
            grid.pdfExport();
        }
        if (args.item.id === 'Grid_excelexport') {
            grid.excelExport();
        }
        if (args.item.id === 'Grid_csvexport') {
            grid.csvExport();
        }
    };
};