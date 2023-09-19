import { loadCultureFiles } from '../common/culture-loader';

import { Gantt, Edit, Selection, Toolbar, DayMarkers } from '@syncfusion/ej2-gantt';
import { editingData, editingResources } from './data-source';

/**
 * Editing Gantt sample
 */
Gantt.Inject(Edit, Selection, Toolbar, DayMarkers);
(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: editingData,
            dateFormat: 'MMM dd, y',
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                child: 'subtasks',
                notes: 'info',
                resourceInfo: 'resources'
            },
            editSettings: {
                allowAdding: true,
                allowEditing: true,
                allowDeleting: true,
                allowTaskbarEditing: true,
                showDeleteConfirmDialog: true
            },
            toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'Indent', 'Outdent'],
            allowSelection: true,
            gridLines: 'Both',
            height: '450px',
            treeColumnIndex: 1,
            resourceFields: {
                id: 'resourceId',
                name: 'resourceName'
            },
            resources: editingResources,
            highlightWeekends: true,
            timelineSettings: {
                topTier: {
                    unit: 'Week',
                    format: 'MMM dd, y',
                },
                bottomTier: {
                    unit: 'Day',
                },
            },
            columns: [
                { field: 'TaskID', width: 80 },
                { field: 'TaskName', headerText: 'Job Name', width: '250', clipMode: 'EllipsisWithTooltip' },
                { field: 'StartDate' },
                { field: 'Duration' },
                { field: 'Progress' },
                { field: 'Predecessor' }
            ],
            eventMarkers: [
                { day: '4/17/2019', label: 'Project approval and kick-off' },
                { day: '5/3/2019', label: 'Foundation inspection' },
                { day: '6/7/2019', label: 'Site manager inspection' },
                { day: '7/16/2019', label: 'Property handover and sign-off' },
            ],
            labelSettings: {
                leftLabel: 'TaskName',
                rightLabel: 'resources'
            },
            editDialogFields: [
                { type: 'General', headerText: 'General' },
                { type: 'Dependency' },
                { type: 'Resources' },
                { type: 'Notes' },
            ],
            splitterSettings: {
                position: "35%"
            },
            projectStartDate: new Date('03/25/2019'),
            projectEndDate: new Date('07/28/2019')
        });
    gantt.appendTo('#Editing');
};
