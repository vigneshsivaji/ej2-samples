import { loadCultureFiles } from '../common/culture-loader';
import { Ribbon, ItemOrientation, RibbonItemSize, RibbonItemType, RibbonTabModel, RibbonColorPicker, DisplayMode, RibbonGroupButtonSelection, RibbonFileMenu, BackstageItemModel, RibbonBackstage, LauncherClickEventArgs } from '@syncfusion/ej2-ribbon';
import { ListView, SelectEventArgs as SelectListEventArgs } from "@syncfusion/ej2-lists";
import { MenuEventArgs } from "@syncfusion/ej2-navigations";
import { SelectEventArgs } from "@syncfusion/ej2-dropdowns";
import { Toast } from '@syncfusion/ej2/notifications';
import { ColorPickerEventArgs } from '@syncfusion/ej2-inputs';
import * as data from './datasource.json';

Ribbon.Inject(RibbonFileMenu, RibbonColorPicker, RibbonBackstage);

(window as any).default = (): void => {
    loadCultureFiles();
    let fontSize: string[] = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72', '96'];
    let fontStyle: string[] = ['Algerian', 'Arial', 'Calibri', 'Cambria', 'Cambria Math', 'Courier New', 'Candara', 'Georgia', 'Impact', 'Segoe Print', 'Segoe Script', 'Segoe UI', 'Symbol', 'Times New Roman', 'Verdana', 'Windings'
    ];
    let tabs: RibbonTabModel[] = [{
        header: "Home",        
        groups: [{
            id: 'clipboard',
            header: "Clipboard",
            showLauncherIcon: true,
            groupIconCss: 'e-icons e-paste',
            collections: [{
                items: [{
                    type: RibbonItemType.SplitButton,
                    allowedSizes: RibbonItemSize.Large,
                    disabled: true,
                    id: 'pastebtn',
                    splitButtonSettings: {
                        iconCss: 'e-icons e-paste',
                        items: [{ text: 'Keep Source Format' }, { text: 'Merge Format' }, { text: 'Keep Text Only' }],
                        content: 'Paste',
                        select: (args: MenuEventArgs) => { updateContent("Paste -> " + args.item.text) },
                        click: () => { updateContent("Paste"); }
                    }
                }]
            }, {
                items: [{
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: 'Cut',
                        iconCss: 'e-icons e-cut',
                        clicked: () => { updateContent("Cut"); enablePaste(); }
                    }
                }, {
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: 'Copy',
                        iconCss: 'e-icons e-copy',
                        clicked: () => { updateContent("Copy"); enablePaste(); }
                    }
                }, {
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: 'Format Painter',
                        iconCss: 'e-icons e-format-painter',
                        clicked: () => { updateContent("Format Painter") }
                    }
                }]
            }]
        }, {
            header: "Font",
            isCollapsible: false,
            enableGroupOverflow: true,
            orientation: ItemOrientation.Row,
            overflowHeader: 'More Font Options',
            groupIconCss: 'e-icons e-bold',
            cssClass: 'font-group',
            collections: [{
                items: [{
                    type: RibbonItemType.ComboBox,
                    comboBoxSettings: {
                        dataSource: fontStyle,
                        label: 'Font Style',
                        index: 3,
                        allowFiltering: true,
                        width: '115px',
                        popupWidth: '150px',
                        change: (args: SelectEventArgs) => {
                            if (args.itemData) {
                                updateContent("Font Style -> " + args.itemData.text)
                            }
                        }
                    }
                }, {
                    type: RibbonItemType.ComboBox,
                    comboBoxSettings: {
                        dataSource: fontSize,
                        label: 'Font Size',
                        index: 3,
                        width: '65px',
                        popupWidth: '85px',
                        allowFiltering: true,
                        change: (args: SelectEventArgs) => {
                            if (args.itemData) {
                                updateContent("Font Style -> " + args.itemData.text)
                            }
                        }
                    }
                }]
            }, {
                items: [{
                    type: RibbonItemType.ColorPicker,
                    allowedSizes: RibbonItemSize.Small,
                    displayOptions: DisplayMode.Simplified | DisplayMode.Classic,
                    colorPickerSettings: {
                        value: '#123456',
                        change: (args: ColorPickerEventArgs) => { updateContent(args.currentValue.hex + ' color') }
                    }
                }, {
                    type: RibbonItemType.Button,
                    allowedSizes: RibbonItemSize.Small,
                    buttonSettings: {
                        content: 'Bold',
                        iconCss: 'e-icons e-bold',
                        isToggle: true,
                        clicked: () => { updateContent("Bold") }
                    }
                }, {
                    type: RibbonItemType.Button,
                    allowedSizes: RibbonItemSize.Small,
                    buttonSettings: {
                        content: 'Italic',
                        iconCss: 'e-icons e-italic',
                        isToggle: true,
                        clicked: () => { updateContent("Italic") }
                    }
                }, {
                    type: RibbonItemType.Button,
                    allowedSizes: RibbonItemSize.Small,
                    buttonSettings: {
                        content: 'Underline',
                        iconCss: 'e-icons e-underline',
                        isToggle: true,
                        clicked: () => { updateContent("Underline") }
                    }
                }, {
                    allowedSizes: RibbonItemSize.Small,
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: 'Strikethrough',
                        iconCss: 'e-icons e-strikethrough',
                        isToggle: true,
                        clicked: () => { updateContent("Strikethrough") }
                    }
                }, {
                    type: RibbonItemType.Button,
                    allowedSizes: RibbonItemSize.Small,
                    buttonSettings: {
                        content: 'Change Case',
                        iconCss: 'e-icons e-change-case',
                        isToggle: true,
                        clicked: () => { updateContent("Change Case") }
                    }
                }]
            }]
        }, {
            id: 'paragraph',
            header: "Paragraph",
            orientation: ItemOrientation.Row,
            groupIconCss: 'e-icons e-align-center',
            collections: [{
                items: [{
                    type: RibbonItemType.Button,
                    allowedSizes: RibbonItemSize.Small,
                    buttonSettings: {
                        iconCss: 'e-icons e-decrease-indent',
                        content: 'Decrease Indent',
                        clicked: () =>  { updateContent("Decrease Indent") }
                    }
                }, {
                    type: RibbonItemType.Button,
                    allowedSizes: RibbonItemSize.Small,
                    buttonSettings: {
                        iconCss: 'e-icons e-increase-indent',
                        content: 'Increase Indent',
                        clicked: () =>  { updateContent("Increase Indent") }
                    }
                }, {
                    type: RibbonItemType.Button,
                    allowedSizes: RibbonItemSize.Small,
                    buttonSettings: {
                        iconCss: 'e-icons e-paragraph',
                        content: 'Paragraph',
                        clicked: () =>  { updateContent("Paragraph Mark") }
                    }
                }]
            }, {
                items: [{
                    type: RibbonItemType.GroupButton,
                    allowedSizes: RibbonItemSize.Small,
                    groupButtonSettings: {
                        selection: RibbonGroupButtonSelection.Single,
                        header: 'Alignment',
                        items: [{
                            iconCss: 'e-icons e-align-left',
                            selected: true,
                            click: () =>  { updateContent("Align Left") }
                        },
                        {
                            iconCss: 'e-icons e-align-center',
                            click: () =>  { updateContent("Align Center") }
                        },
                        {
                            iconCss: 'e-icons e-align-right',
                            click: () =>  { updateContent("Align Right") }
                        },
                        {
                            iconCss: 'e-icons e-justify',
                            click: () =>  { updateContent("Justify") }
                        }]
                    }
                }]
            }]
        }, {
            header: "Editing",
            groupIconCss: 'e-icons e-edit',
            orientation: ItemOrientation.Column,
            collections: [{
                items: [{
                    type: RibbonItemType.SplitButton,
                    splitButtonSettings: {
                        iconCss: 'e-icons e-search',
                        content: 'Find',
                        items: [
                            { text: 'Find', iconCss: 'e-icons e-search' },
                            { text: 'Advanced find', iconCss: 'e-icons e-search' },
                            { text: 'Go to', iconCss: 'e-icons e-arrow-right' }
                        ],
                        select: (args: MenuEventArgs) => { updateContent("Find -> " + args.item.text) },
                        click: () => { updateContent("Find"); }
                    }
                }, {
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: 'Replace',
                        iconCss: 'e-icons e-replace',
                        clicked: () => { updateContent("Replace") }
                    }
                }, {
                    type: RibbonItemType.SplitButton,
                    splitButtonSettings: {
                        iconCss: 'e-icons e-mouse-pointer',
                        content: 'Select',
                        items: [{ text: 'Select All' },
                        { text: 'Select Objects' }],
                        select: (args: MenuEventArgs) => { updateContent("Select -> " + args.item.text) },
                        click: () => { updateContent("Select"); }
                    }
                }]
            }]
        }, {
            header: "Voice",
            isCollapsible: false,
            groupIconCss: 'sf-icon-dictate',
            collections: [{
                items: [{
                    type: RibbonItemType.SplitButton,
                    allowedSizes: RibbonItemSize.Large,
                    splitButtonSettings: {
                        content: 'Dictate',
                        iconCss: 'sf-icon-dictate',
                        items: [{ text: 'Chinese' }, { text: 'English' }, { text: 'German' }, { text: 'French' }],
                        select: (args: MenuEventArgs) => { updateContent("Dictate -> " + args.item.text) },
                        click: () => { updateContent("Dictate"); }
                    }
                }]
            }]
        }, {
            header: "Editor",
            isCollapsible: false,
            groupIconCss: 'sf-icon-editor',
            collections: [{
                items: [{
                    type: RibbonItemType.Button,
                    allowedSizes: RibbonItemSize.Large,
                    buttonSettings: {
                        content: 'Editor',
                        iconCss: 'sf-icon-editor',
                        clicked: () => { updateContent("Editor") }
                    }
                }]
            }]
        }, {
            header: "Reuse Files",
            isCollapsible: false,
            groupIconCss: 'sf-icon-reuse',
            collections: [{
                items: [{
                    type: RibbonItemType.Button,
                    allowedSizes: RibbonItemSize.Large,
                    disabled: true,
                    buttonSettings: {
                        iconCss: 'sf-icon-reuse',
                        content: 'Reuse Files',
                        clicked: () => { updateContent("Reuse Files") }
                    }
                }]
            }]
        }]
    }, {
        header: 'Insert',
        groups: [{
            header: 'Tables',
            isCollapsible: false,
            collections: [{
                items: [{
                    type: RibbonItemType.DropDown,
                    allowedSizes: RibbonItemSize.Large,
                    dropDownSettings: {
                        iconCss: 'e-icons e-table',
                        content: 'Table',
                        items: [
                            { text: 'Insert Table' }, { text: 'Draw Table' },
                            { text: 'Convert Table' }, { text: 'Excel Spreadsheet' }
                        ],
                        select: (args: MenuEventArgs) => { updateContent("Table -> " + args.item.text) }
                    }
                }]
            }]
        }, {
            id: 'illustration',
            header: 'Illustrations',
            showLauncherIcon: true,
            orientation: ItemOrientation.Row,
            enableGroupOverflow: true,
            overflowHeader: 'Illustrations',
            groupIconCss: 'e-icons e-image',
            collections: [{
                items: [{
                    type: RibbonItemType.DropDown,
                    id: 'pictureddl',
                    dropDownSettings: {
                        content: 'Pictures',
                        iconCss: 'e-icons e-image',
                        target: '#pictureList'
                    }
                }, {
                    type: RibbonItemType.DropDown,
                    dropDownSettings: {
                        content: 'Shapes',
                        iconCss: 'sf-icon-shapes',
                        items: [{ text: 'Lines' }, { text: 'Rectangles' }, { text: 'Basic Arrows' }, { text: 'Basic Shapes' }, { text: 'FlowChart' }],
                        select: (args: MenuEventArgs) => { updateContent("Shapes -> " + args.item.text) }
                    }
                }, {
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: '3D Models',
                        iconCss: 'sf-icon-3d-model',
                        clicked: () => { updateContent("3D Models") }
                    }
                }, {
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        iconCss: 'sf-icon-smart-art',
                        content: 'SmartArt',
                        clicked: () => { updateContent("SmartArt") }
                    }
                }, {
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: 'Chart',
                        iconCss: 'sf-icon-chart',
                        clicked: () => { updateContent("Chart") }
                    }
                }, {
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: 'Screenshot',
                        iconCss: 'sf-icon-screenshot',
                        clicked: () => { updateContent("Screenshot") }
                    }
                }]
            }]
        }, {
            id: 'header_footer',
            header: 'Header & Footer',
            showLauncherIcon: true,
            orientation: ItemOrientation.Column,
            groupIconCss: 'e-icons e-table',
            collections: [{
                items: [{
                    type: RibbonItemType.DropDown,
                    dropDownSettings: {
                        content: 'Header',
                        iconCss: 'e-icons e-header',
                        items: [{ text: 'Insert Header' }, { text: 'Edit Header' }, { text: 'Remove Header' }],
                        select: (args: MenuEventArgs) => { updateContent("Header -> " + args.item.text) }
                    }
                }, {
                    type: RibbonItemType.DropDown,
                    dropDownSettings: {
                        iconCss: 'e-icons e-footer',
                        content: 'Footer',
                        items: [{ text: 'Insert Footer' }, { text: 'Edit Footer' }, { text: 'Remove Footer' }],
                        select: (args: MenuEventArgs) => { updateContent("Footer -> " + args.item.text) }
                    }
                }, {
                    type: RibbonItemType.DropDown,
                    dropDownSettings: {
                        content: 'Page Number',
                        iconCss: 'e-icons e-page-numbering',
                        items: [{ text: 'Insert Top of page' }, { text: 'Insert Bottom of page' }, { text: 'Format Page Number' }, { text: 'Remove Page Number' }],
                        select: (args: MenuEventArgs) => { updateContent("Page Numbering -> " + args.item.text) }
                    }
                }]
            }]
        },
        {
            header: 'Comments',
            isCollapsible: false,
            collections: [{
                items: [{
                    type: RibbonItemType.Button,
                    allowedSizes: RibbonItemSize.Large,
                    buttonSettings: {
                        content: 'New Comment',
                        iconCss: 'e-icons e-comment-add',
                        clicked: () => { updateContent("New Comment") }
                    }
                }]
            }]
        }, {
            header: 'Links',
            groupIconCss: 'e-icons e-link',
            isCollapsible: false,
            collections: [{
                items: [{
                    type: RibbonItemType.DropDown,
                    allowedSizes: RibbonItemSize.Large,
                    dropDownSettings: {
                        content: 'Link',
                        iconCss: 'e-icons e-link',
                        items: [{ text: 'Insert Link', iconCss: 'e-icons e-link' },
                        { text: 'Recent Links', iconCss: 'e-icons e-clock' },
                        { text: 'Bookmarks', iconCss: 'e-icons e-bookmark' }
                        ],
                        select: (args: MenuEventArgs) => { updateContent("Link -> " + args.item.text) }
                    }
                }]
            }]
        }]
    }, {
        header: 'View',
        groups: [{
            header: 'Views',
            groupIconCss: 'e-icons e-print',
            orientation: ItemOrientation.Row,
            collections: [{
                items: [{
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        iconCss: 'sf-icon-read',
                        content: 'Read Mode',
                        clicked: () => { updateContent("Read Mode") }
                    }
                }, {
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: 'Print Layout',
                        iconCss: 'e-print e-icons',
                        clicked: () => { updateContent("Print Layout") }
                    }
                }, {
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        iconCss: 'sf-icon-web-layout',
                        content: 'Web Layout',
                        clicked: () => { updateContent("Web Layout") }
                    }
                }]
            }]
        }, {
            header: 'Zoom',
            orientation: ItemOrientation.Row,
            groupIconCss: 'e-icons e-zoom-to-fit',
            collections: [{
                items: [{
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: 'Zoom In',
                        iconCss: 'e-icons e-zoom-in',
                        clicked: () => { updateContent("Zoom In") }
                    }
                }, {
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        iconCss: 'e-icons e-zoom-out',
                        content: 'Zoom Out',
                        clicked: () => { updateContent("Zoom Out") }
                    }
                }]
            }]
        }, {
            header: 'Show',
            isCollapsible: false,
            collections: [{
                items: [{
                    type: RibbonItemType.CheckBox,
                    checkBoxSettings: {
                        label: 'Ruler',
                        checked: false,
                        change: () => { updateContent("Ruler") }
                    }
                }, {
                    type: RibbonItemType.CheckBox,
                    checkBoxSettings: {
                        checked: false,
                        label: 'Gridlines',
                        change: () => { updateContent("Gridlines") }
                    }
                }, {
                    type: RibbonItemType.CheckBox,
                    checkBoxSettings: {
                        label: 'Navigation Pane',
                        checked: true,
                        change: () => { updateContent("Navigation Pane") }
                    }
                }]
            }]
        }, {
            header: 'Dark Mode',
            isCollapsible: false,
            collections: [{
                items: [{
                    type: RibbonItemType.Button,
                    allowedSizes: RibbonItemSize.Large,
                    buttonSettings: {
                        iconCss: 'sf-icon-mode',
                        content: 'Dark Mode',
                        clicked: () => { updateContent("Dark Mode") }
                    }
                }]
            }]
        }]
    }];
    let list: ListView = new ListView({
        showHeader: true,
        headerTitle: 'Insert Picture From',
        dataSource: ['This Device', 'Stock Images', 'Online Images'],
        select: (args: SelectListEventArgs) => { updateContent("Pictures -> " + args.text) }
    });
    list.appendTo('#pictureList');
    let menuItems: BackstageItemModel[] = [
        { id: 'home', text: 'Home', iconCss: 'e-icons e-home', content: getBackstageContent('home') },
        { id: 'new', text: 'New', iconCss: 'e-icons e-file-new', content: getBackstageContent('new') },
        { id: 'open', text: 'Open', iconCss: 'e-icons e-folder-open', content: getBackstageContent('open') },
        { separator: true },
        { text: 'Info', content: getBackstageContent('info') },
        { text: 'Save as', content: getBackstageContent('save') },
        { text: 'Export', content: getBackstageContent('export') },
        { text: 'Print', backStageItemClick: backstageClickHandler },
        { text: 'Share', content: getBackstageContent('share') },
        { separator: true, isFooter: true },
        { text: 'Account', isFooter: true, content: getBackstageContent('account') },
        { text: 'Feedback', isFooter: true, content: getBackstageContent('feedback') }
    ];
    let ribbon: Ribbon = new Ribbon({
        tabs: tabs,
        launcherIconClick: (args: LauncherClickEventArgs) => {
            if (args.groupId == "clipboard") {
                updateContent("Clipboard LauncherIcon");
            }
            else if (args.groupId == "illustration") {
                updateContent("Illustration LauncherIcon");
            }
            else if (args.groupId == "header_footer") {
                updateContent("Header & Footer LauncherIcon");
            }
        },
        backStageMenu: {
            text: 'File',
            visible: true,
            items: menuItems,
            backButton: {
                text: 'Close',
            }
        }
    });
    ribbon.appendTo("#ribbon");

    let toast: Toast = new Toast({
        target: '#ribbonPlaceHolder',
        cssClass: 'e-toast-info',
        height: 25,
        width: 'auto',
        timeOut: 2000,
        newestOnTop: true,
        animation: { show: { effect: 'FadeIn' }, hide: { effect: 'FadeOut' } },
        position: { X: "Right" },
        showCloseButton: true
    });
    toast.appendTo('#toast');

    let isBackstageOpened = false;

    function handleClickInsideBackstageContent(e: any) {
        e.stopPropagation();
        let cName: string = e.target.className;
        if (cName !== "section-title" && cName !== "home-wrapper" && cName !== "new-wrapper" && cName !== "block-wrapper" && cName !== "e-ribbon-backstage-content") {
            ribbon.ribbonBackstageModule.hideBackstage();
            toast.show({ content: 'Backstage content is interacted and closed.' });
            ribbon.element.querySelector('.e-ribbon-backstage-content').removeEventListener('click', handleClickInsideBackstageContent);
        }
    }
    if (!isBackstageOpened) {
        ribbon.element.querySelector('.e-ribbon-backstage').addEventListener('click', () => {
            isBackstageOpened = true;
            ribbon.element.querySelector('.e-ribbon-backstage-content').addEventListener('click', handleClickInsideBackstageContent);
        });
    }

    function backstageClickHandler() {
        ribbon.ribbonBackstageModule.hideBackstage(); 
        toast.show({ content: 'Print action is selected' });
    }

    function updateContent(args: string) {
        toast.show({ content: "Last clicked item is " + args });
    }

    let isPasteDisabled: boolean = true;
    function enablePaste() {
        if (!isPasteDisabled) { return; }
        ribbon.enableItem('pastebtn')
        isPasteDisabled = false;
    }
    function getBackstageContent(item: string): string {
        let homeContentTemplate = `
        <div class="home-wrapper">
            {{newSection}}
            {{recentSection}}
        </div>`;
        let newSection = `
        <div class='new-wrapper'>
            <div class="section-title"> New </div>
            <div class="category_container">
                <div class="doc_category_image"></div> <span class="doc_category_text"> New document </span>
            </div>
        </div>`;
        let recentSection = `
        <div class="block-wrapper">
            <div class="section-title"> Recent </div>
            {{recentWrapper}}
        </div>`;
        let recentWrapper = `
        <div class="section-content">
            <table>
                <tbody>
                    <tr>
                        <td> <span class="doc_icon e-icons {{icon}}"></span> </td>
                        <td> 
                            <span style="display: block; font-size: 14px"> {{title}} </span>
                            <span style="font-size: 12px"> {{description}} </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>`;
        let blockSection = "<div class='block-wrapper'> <div class='section-title'> {{blockTitle}} </div> {{blockSection}} </div>";
        let content = "";
        switch (item) {
            case 'home': {
                let recentDocUpdatedString = "";
                data['recentDocuments'].slice(0,3).forEach((doc: any) => recentDocUpdatedString += recentWrapper.replace(/{{icon}}/g, 'e-notes').replace(/{{title}}/g, doc.fileName).replace(/{{description}}/g, doc.location));
                let updatedRecentSection = recentSection.replace(/{{recentWrapper}}/g, recentDocUpdatedString);
                content = homeContentTemplate.replace(/{{newSection}}/g, newSection).replace(/{{recentSection}}/g, updatedRecentSection);
                break;
            }
            case 'new': {
                content = newSection;
                break;
            }
            case 'open': {
                let recentDocUpdatedString = "";
                data['recentDocuments'].forEach((doc: any) => recentDocUpdatedString += recentWrapper.replace(/{{icon}}/g, 'e-notes').replace(/{{title}}/g, doc.fileName).replace(/{{description}}/g, doc.location));
                content = recentSection.replace(/{{recentWrapper}}/g, recentDocUpdatedString);
                break;
            }
            default:
                let infoUpdatedString = "";
                data['dataOptions'][item].forEach((doc: any) => infoUpdatedString += recentWrapper.replace(/{{icon}}/g, doc.icon).replace(/{{title}}/g, doc.title).replace(/{{description}}/g, doc.description));
                content = blockSection.replace(/{{blockSection}}/g, infoUpdatedString).replace(/{{blockTitle}}/g, (item.charAt(0).toUpperCase() + item.slice(1)));
                break;
        }
        return content;
    }
};
