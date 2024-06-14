import { LinearGauge, Annotations, ILoadEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';
LinearGauge.Inject(Annotations);
let textColor = '#000000';
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
(window as any).default = (): void => {
    let gauge1: LinearGauge = new LinearGauge({     
        container: {
            width: 30,
            roundedCornerRadius: 15,
            type: 'RoundedRectangle',
            border: { width: 1 },
            backgroundColor: 'transparent'
        },
        background:'transparent',
        axes: [{
            minimum: 0,
            maximum: 100,
            line: {
                width: 0
            },
            pointers: [{
                value: 100,
                width: 30,
                color: '#0074E3',
                type: 'Bar',
                position: 'Cross',
                roundedCornerRadius: 15,
                offset: -15
            }],
            majorTicks: {
                interval: 20,
                height: 0
            },
            minorTicks: {
                interval: 10, height: 0
            },
            labelStyle: {
                format:'Music {value} %',
                font: { size: '0px' }
            }
        }],
        annotations: [{
            axisIndex: 0,
            axisValue: 100,
            x: 1,
            y: 0, zIndex: '1',
        }, {
            content: '<div class="sf-icon-music" style="width:16px"></div>',
            axisIndex: 0,
            axisValue: 11,
            x: 9,
            y: 1, zIndex: '1',
        }
        ],
        load: (args1: ILoadEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args1.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            // custom code end            
            textColor = args1.gauge.theme.indexOf('Dark') > -1 || args1.gauge.theme.indexOf('HighContrast') > -1 ? '#FFFFFF' : '#000000';
            args1.gauge.annotations[0].content = `<div style="width: 70px;font-size: 16px;margin-left:64px;margin-top: -31px;font-family:inherit;color:${textColor};">100%</div>`;
        }
    });
    gauge1.appendTo('#gauge1');

    let gauge2: LinearGauge = new LinearGauge({
        container: {
            width: 30,
            roundedCornerRadius: 15,
            type: 'RoundedRectangle',
            border: { width: 1 },
            backgroundColor: 'transparent'
        },
        background:'transparent',
        axes: [{
            minimum: 0,
            maximum: 100,
            line: {
                width: 0
            },
            pointers: [{
                value: 85,
                width: 30,
                color: '#0074E3',
                type: 'Bar',
                position: 'Cross',
                roundedCornerRadius: 15,
                offset: -15
            }],
            majorTicks: {
                interval: 20,
                height: 0
            },
            minorTicks: {
                interval: 10, height: 0
            },
            labelStyle: {
                format:'Bell {value} %',
                font: { size: '0px' }
            }
        }],
        annotations: [{
            axisIndex: 0,
            axisValue: 100,
            x: 1,
            y: 0, zIndex: '1',
        }, {
            content: '<div class="sf-icon-bell" style="width:16px"></div>',
            axisIndex: 0,
            axisValue: 11,
            x: 9,
            y: 1, zIndex: '1',
        }],
        load: (args2: ILoadEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args2.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            // custom code end            
            textColor = args2.gauge.theme.indexOf('Dark') > -1 || args2.gauge.theme.indexOf('HighContrast') > -1 ? '#FFFFFF' : '#000000';
            args2.gauge.annotations[0].content = `<div style="width: 70px;font-size: 16px;margin-left:73px;margin-top: -31px;font-family:inherit;color:${textColor};"> 85%</div>`;
        }
    });
    gauge2.appendTo('#gauge2');

    let gauge3: LinearGauge = new LinearGauge({
        container: {
            width: 30,
            roundedCornerRadius: 15,
            type: 'RoundedRectangle',
            border: { width: 1 },
            backgroundColor: 'transparent'
        },
        background:'transparent',
        axes: [{
            minimum: 0,
            maximum: 100,
            line: {
                width: 0
            },
            pointers: [{
                value: 65,
                width: 30,
                color: '#0074E3',
                type: 'Bar',
                position: 'Cross',
                roundedCornerRadius: 15,
                offset: -15
            }],
            majorTicks: {
                interval: 20,
                height: 0
            },
            minorTicks: {
                interval: 10, height: 0
            },
            labelStyle: {
                format:'Clock {value} %',
                font: { size: '0px' }
            }
        }],
        annotations: [{
            axisIndex: 0,
            axisValue: 100,
            x: 0,
            y: 0, zIndex: '1',
        }, {
            content: '<div class="sf-icon-clock" style="width:16px"></div>',
            axisIndex: 0,
            axisValue: 11,
            x: 9,
            y: 1, zIndex: '1',
        }],
        load: (args3: ILoadEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
              args3.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            // custom code end            
            textColor = args3.gauge.theme.indexOf('Dark') > -1 || args3.gauge.theme.indexOf('HighContrast') > -1 ? '#FFFFFF' : '#000000';
            args3.gauge.annotations[0].content = `<div style="width: 70px;font-size: 16px;margin-left:71px;margin-top: -31px;font-family:inherit;color:${textColor};"> 65%</div>`;
        }
    });
    gauge3.appendTo('#gauge3');
};