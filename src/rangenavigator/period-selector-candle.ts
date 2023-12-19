import { loadCultureFiles } from '../common/culture-loader';
import { RangeNavigator, Chart, IChangedEventArgs, LineSeries, AreaSeries, DateTime, Crosshair } from '@syncfusion/ej2-charts';
import { ChartTheme, ChartAnnotation, PeriodSelector, CandleSeries, MacdIndicator, ColumnSeries } from '@syncfusion/ej2-charts';
import { RangeTooltip } from '@syncfusion/ej2-charts';
Chart.Inject(AreaSeries, DateTime, LineSeries, Crosshair, ChartAnnotation, CandleSeries, MacdIndicator, ColumnSeries);
RangeNavigator.Inject(AreaSeries, DateTime, PeriodSelector, RangeTooltip);
import { GetDateTimeData } from './data-service';
import { chartData } from './financial-data';

/**
 * Sample for Area Series
 */

let data: object[] = GetDateTimeData(new Date(2017, 0, 1), new Date(2017, 11, 31));
let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));

(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({

        primaryXAxis: {
            title: 'Months',
            valueType: 'DateTime',
            intervalType: 'Months',
            crosshairTooltip: { enable: true}
        },
        primaryYAxis: {
            title: 'Price',
            labelFormat: '${value}',
            minimum: 50, maximum: 180,
            interval: 30, rowIndex: 1
        },
        rows: [
            {
                height: '30%'
            }, {
                height: '70%'
            }
        ],
        series: [{
            name: 'AAPL',
            type: 'Candle',
            xName: 'x',
            low: 'low',
            high: 'high',
            open: 'open',
            animation: { enable: true },
            close: 'close',
            dataSource: chartData
        }],


        axes: [{ name: 'secondary', opposedPosition: true, rowIndex: 0 }],
        indicators: [{
            type: 'Macd',
            period: 3,
            fastPeriod: 8,
            slowPeriod: 5,
            seriesName: 'AAPL',
            macdType: 'Both',
            width: 2,
            fill: 'blue',
            yAxisName: 'secondary',
        }],
        theme: theme,
        tooltip: { enable: true, shared: true },
        crosshair: { enable: true },
        zoomSettings: {
            enableMouseWheelZooming: true,
            enableSelectionZooming: true,
            enableDeferredZooming: true,
            mode: 'XY'
        },
        title: 'AAPL - 2016/2017'

    });
    chart.appendTo('#chart');

    let range: RangeNavigator = new RangeNavigator(
        {
            labelPosition: 'Outside',
            enableGrouping: true,
            valueType: 'DateTime',
            height: '200',
            value: [new Date(2014, 0, 1), new Date(2015, 8, 18)],
            series: [{ dataSource: chartData, xName: 'x', yName: 'close', type: 'Line', width: 1}],
            changed : (args: IChangedEventArgs) => {
                chart.primaryXAxis.zoomFactor = args.zoomFactor;
                chart.primaryXAxis.zoomPosition = args.zoomPosition;
                chart.dataBind();
            },
            theme: theme,
            tooltip: { enable: true },
            periodSelectorSettings: {
                position: 'Top',
                periods: [
                    { text: '2w', interval: 2, intervalType: 'Weeks'},
                    { text: '1m', interval: 1, intervalType: 'Months'},
                    { text: '3q', interval: 3, intervalType: 'Quarter'},
                    { text: '2y', interval: 3, intervalType: 'Years'},
                    { text: 'all', interval: 3},
                    { text: 'ytd', interval: 3},
                ]
            }

        }
    );
    range.appendTo('#container');
};