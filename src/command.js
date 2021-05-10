import Command from "@ckeditor/ckeditor5-core/src/command";

import html2markdown from "@ckeditor/ckeditor5-markdown-gfm/src/html2markdown/html2markdown";
import markdown2html from "@ckeditor/ckeditor5-markdown-gfm/src/markdown2html/markdown2html";

export default class ConvertCommonmarkCommand extends Command {
  constructor(editor, attributeKey) {
    super(editor);

    this.attributeKey = attributeKey;
  }

  /**
   * @inheritDoc
   */
  refresh() {
    const model = this.editor.model;
    const doc = model.document;

    this.value = this._getValueFromEditor();
    this.isEnabled = this._checkEnabled();
  }

  execute() {
    const editor = this.editor;

    let data = editor.getData();

    if (!this._getValueFromEditor()) {
      editor.sourceElement.setAttribute("data-markdown", true);
      let markdown = html2markdown(data);
      editor.setData(markdown);
    } else {
      editor.sourceElement.removeAttribute("data-markdown");
      let cleanData = data.replace(/\\/g, "");
      let html = markdown2html(cleanData);
      editor.setData(html);
    }
  }

  _getValueFromEditor() {
    const editor = this.editor;

    return editor.sourceElement.hasAttribute("data-markdown");
  }

  _checkEnabled() {
    return true;
  }
}
