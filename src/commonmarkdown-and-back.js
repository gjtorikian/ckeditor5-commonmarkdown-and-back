import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import Markdown from "@ckeditor/ckeditor5-markdown-gfm/src/markdown";

import CommonmarkdownAndBackModel from "./model";
import CommonmarkdownAndBackUI from "./ui";

export default class CommonmarkdownAndBack extends Plugin {
  static get requires() {
    return [Markdown, CommonmarkdownAndBackModel, CommonmarkdownAndBackUI];
  }

  /**
   * @inheritDoc
   */
  static get pluginName() {
    return "CommonmarkdownAndBack";
  }

  /**
   * @inheritDoc
   */
  init() {}
}
