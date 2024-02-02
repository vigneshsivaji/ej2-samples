import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor form validation sample
 */
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, Count, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
import { FormValidator } from '@syncfusion/ej2-inputs';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, Count, QuickToolbar);

(window as any).default = (): void => {
    loadCultureFiles();

    let formValidatorOptions = {
        rules: {
            defaultRTE: {
                required: true,
                minLength: [
                    () => {
                        const contentElement = document.querySelector(
                            '.e-rte-content .e-content'
                        ) as HTMLElement;
                        const textContent = contentElement.textContent?.trim() || '';
                        const imgElements = contentElement.querySelectorAll('img');
                        const textLengthValid = textContent.length >= 20;
                        return imgElements.length > 0 || textLengthValid;
                    }, 'Please enter at least 20 characters'],
            },
        },
    };
    let formObject: FormValidator = new FormValidator('#form-element', formValidatorOptions);

    let defaultRTE: RichTextEditor = new RichTextEditor({
        showCharCount: true, maxLength: 100,
        placeholder: 'Type something',
    });
    defaultRTE.appendTo('#defaultRTE');
};

