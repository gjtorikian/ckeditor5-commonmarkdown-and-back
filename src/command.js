import Command from "@ckeditor/ckeditor5-core/src/command";

import {
  stringify,
  parse,
} from "@ckeditor/ckeditor5-engine/src/dev-utils/view";

export default class ConvertCommonmarkCommand extends Command {
  constructor(editor, attributeKey) {
    super(editor);

    this.dataProcessor = editor.data.processor;
    this.attributeKey = attributeKey;
    this.hasAutoformat = editor.plugins._plugins.get("Autoformat");
    this.hasAutoformatEnabled =
      this.hasAutoformat && this.hasAutoformat.isEnabled;
  }

  /**
   * @inheritDoc
   */
  refresh() {
    // this apparently must be called value to trigger pressed state
    this.value = this._inMarkdownMode();
    this.isEnabled = this._checkEnabled();
    this.dataProcessor = this.editor.data.processor;
  }

  execute() {
    if (!this.isEnabled) {
      return;
    }

    const editor = this.editor;

    let data = editor.getData();

    // if not markdown mode
    if (!this.value) {
      editor.sourceElement.setAttribute("data-markdown", true);

      let cleanData = this._convertOutOfBracket(data.replace(/\n/g, "<br/>"));
      let markdown = parse(cleanData);
      let mdData = this._convertIntoBracket(
        this.dataProcessor.toData(markdown)
      );
      editor.data.set(mdData, { suppressErrorInCollaboration: true });

      if (this.hasAutoformat) {
        editor.plugins._plugins.get("Autoformat").isEnabled = false;
      }
    } else {
      editor.sourceElement.removeAttribute("data-markdown");

      let cleanData = data.replace(/\\/g, "");
      let html = stringify(this.dataProcessor.toView(cleanData));
      editor.data.set(html, { suppressErrorInCollaboration: true });

      if (this.hasAutoformatEnabled) {
        editor.plugins._plugins.get("Autoformat").isEnabled = true;
      }
    }
  }

  _inMarkdownMode() {
    const editor = this.editor;

    return editor.sourceElement.hasAttribute("data-markdown");
  }

  _checkEnabled() {
    return true;
  }

  // next two are necessary because CKEditor uses [ ] for internal range info
  _convertIntoBracket(str) {
    return str
      .replace(/OPEN\\_BRACKET/g, "\\[")
      .replace(/CLOSE\\_BRACKET/g, "\\]");
  }

  _convertOutOfBracket(str) {
    return str.replace(/\[/g, "OPEN_BRACKET").replace(/\]/g, "CLOSE_BRACKET");
  }
}
