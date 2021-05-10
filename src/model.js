import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

import ConvertCommonmarkCommand from "./command";

const CMD_NAME = "convertCommonmark";

export default class CommonmarkdownAndBackModel extends Plugin {
  init() {
    const editor = this.editor;

    editor.commands.add(
      CMD_NAME,
      new ConvertCommonmarkCommand(editor, CMD_NAME)
    );

    this._defineSchema();
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register("convertCommonmark", {
      allowWhere: "$text",
      isInline: false,
      isObject: true,

      allowAttributes: ["name", "class"],
    });
  }
}
