import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor Image Editor integration sample
 */
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar, NodeSelection, ToolbarClickEventArgs } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar);
import { Dialog } from '@syncfusion/ej2-popups';
import { ImageEditor } from '@syncfusion/ej2-image-editor';
import { isNullOrUndefined  as isNOU } from '@syncfusion/ej2-base';

(window as any).default = (): void => {
    loadCultureFiles();

    let selection = new NodeSelection();
    let header = 'Image Editor';
    let range: Range;
    let saveSelection: NodeSelection;
    let dataURL;
    let isLoaded = false;
    let imageEditorObj: ImageEditor;
    let dlgButtons = [
        {
          buttonModel: { content: 'Insert', isPrimary: true },
          click: onInsert.bind(this),
        },
        { buttonModel: { content: 'Cancel' }, click: onCancel },
      ];
    let defaultRTE: RichTextEditor = new RichTextEditor({
        quickToolbarSettings: {
            image: [
              'Replace',
              'Align',
              'Caption',
              'Remove',
              '-',
              'InsertLink',
              'Display',
              'AltText',
              {
                tooltipText: 'Image Editor',
                template:
                  '<button class="e-tbar-btn e-btn" id="imageEditor"><span class="e-btn-icon e-icons e-rte-image-editor"></span></button>',
              },
            ],
          },
          toolbarClick: onToolbarClick,
    });
    defaultRTE.appendTo('#defaultRTE');

      let dialogObj: Dialog = new Dialog({
        buttons: dlgButtons,
        open: OnOpen,
        header: header,
        visible: false,
        showCloseIcon: true,
        width: '800px',
        height: '800px',
        isModal: true,
      });
      dialogObj.appendTo('#defaultDialog');

    function onToolbarClick(args: ToolbarClickEventArgs){
        if (args.item.tooltipText === 'Image Editor') {
            range = selection.getRange(document);
            saveSelection = selection.save(range, document);
            dialogObj.show();
            defaultRTE.quickToolbarModule.imageQTBar.hidePopup();
          }
    }

    function onInsert() {
        if (defaultRTE.formatter.getUndoRedoStack().length === 0) {
          defaultRTE.formatter.saveData();
        }
        saveSelection.restore();
        let canvas = document.createElement('CANVAS') as HTMLCanvasElement;
        let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        const imgData = imageEditorObj.getImageData();
        canvas.height = imgData.height;
        canvas.width = imgData.width;
        ctx.putImageData(imgData, 0, 0);
        isLoaded = true;
        defaultRTE.executeCommand('editImage', {
          url: canvas.toDataURL(),
          width: { width: canvas.width },
          height: { height: canvas.height },
          selection: saveSelection,
        });
        defaultRTE.formatter.saveData();
        defaultRTE.formatter.enableUndo(defaultRTE);
        dialogObj.hide();
        isLoaded = false;
      }
      
      function onCancel() {
        dialogObj.hide();
        imageEditorObj.reset();
      }
      
      function OnOpen() {
        if (isNOU(imageEditorObj)) {
          imageEditorObj = new ImageEditor({
            height: '450px',
          });
          imageEditorObj.appendTo('#imageeditor');
        }
        let imageELement: HTMLImageElement;
        let selectNodes: Node[] = defaultRTE.formatter.editorManager.nodeSelection.getNodeCollection(range);
        if (selectNodes.length == 1 && (selectNodes[0] as HTMLElement).tagName == 'IMG') {
          imageELement = selectNodes[0] as HTMLImageElement;
          imageELement.crossOrigin = 'anonymous';
          let imageUrl = imageELement.src + '?timestamp=' + Date.now();
          imageELement.src = imageUrl;
          let canvas = document.createElement('CANVAS') as HTMLCanvasElement;
          let ctx = canvas.getContext('2d');
          canvas.height = imageELement.offsetHeight;
          canvas.width = imageELement.offsetWidth;
          imageELement.onload = function () {
            ctx.drawImage(imageELement, 0, 0, canvas.width, canvas.height);
            dataURL = canvas.toDataURL();
            if (!isLoaded) {
              imageEditorObj.open(dataURL);
            }
          };
        }
      }
};
