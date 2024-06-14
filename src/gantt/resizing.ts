import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Selection, Resize } from '@syncfusion/ej2-gantt';
import { projectNewData } from './data-source';

/**
 *  Resize support in Gantt sample
 */
Gantt.Inject(Selection, Resize );
(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: projectNewData,
            height: '450px',
            highlightWeekends: true,
            allowResizing: true,
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                child: 'subtasks'
            },
            columns: [
                { field: 'TaskID', headerText: 'ID', width: 80 , minWidth: 8},
                { field: 'TaskName', headerText: 'Job Name', width: 250, minWidth: 120, maxWidth: 300 },
                { field: 'StartDate', width: 135, minWidth: 8 },
                { field: 'EndDate', width: 135, minWidth: 8 },
                { field: 'Duration', allowResizing: false, width: 120 },
                { field: 'Progress', headerText: 'Progress', textAlign: 'Right', width: 120, minWidth: 8 },
                { field: 'Predecessor', headerText: 'Dependency', textAlign: 'Left', width: 135, minWidth: 8 }
            ],
            treeColumnIndex: 1,
            labelSettings: {
                leftLabel: 'TaskName'
            },
            splitterSettings: {
                columnIndex: 6
            },
            projectStartDate: new Date('03/24/2024'),
            projectEndDate: new Date('07/06/2024')
        });
    gantt.appendTo('#ColumnResize');
};
