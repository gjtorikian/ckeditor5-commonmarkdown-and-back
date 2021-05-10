import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import icon from "../theme/icons/icon.svg";

export default class CommonmarkdownAndBackUI extends Plugin {
  init() {
    const editor = this.editor;
    const t = editor.t;

    editor.ui.componentFactory.add("convertCommonmark", (locale) => {
      const command = editor.commands.get("convertCommonmark");
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: t("Markdown"), // translate to passed locale
        withText: false, // don't display the label on the button face
        tooltip: true, // show a tooltip with the label then the mouse hover the button
        icon: icon,
      });

      buttonView.bind("isOn", "isEnabled").to(command, "value", "isEnabled");

      // Execute the command then the button is clicked (executed)
      this.listenTo(buttonView, "execute", () => {
        editor.execute("convertCommonmark");
        editor.editing.view.focus();
      });

      return buttonView;
    });
  }
}
