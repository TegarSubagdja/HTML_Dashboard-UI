/**
 * Global App Script
 * Mengelola interaksi Sidebar dan Inisialisasi CKEditor
 */

document.addEventListener("DOMContentLoaded", () => {
  const initSidebar = () => {
    const toggleBtn = document.getElementById("sidebarToggle");
    const sidebar = document.getElementById("sidebar");

    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("active");
      });
    }
  };

  const initEditor = () => {
    document.querySelectorAll(".editor").forEach((el) => {
      CKEDITOR.ClassicEditor.create(el, {
        toolbar: {
          items: [
            "undo",
            "redo",
            "|",
            "heading",
            "|",
            "fontFamily",
            "fontSize",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "subscript",
            "superscript",
            "|",
            "fontColor",
            "fontBackgroundColor",
            "highlight",
            "|",
            "removeFormat",
            "-",
            "alignment",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
            "|",
            "outdent",
            "indent",
            "|",
            "link",
            "blockQuote",
            "insertTable",
            "horizontalLine",
            "specialCharacters",
            "|",
            "findAndReplace",
            "selectAll",
            "sourceEditing",
          ],
          shouldNotGroupWhenFull: true,
        },
        placeholder: "Type or paste your content here!",
        fontFamily: {
          options: [
            "default",
            "Arial, Helvetica, sans-serif",
            "Courier New, Courier, monospace",
            "Georgia, serif",
            "Lucida Sans Unicode, Lucida Grande, sans-serif",
            "Tahoma, Geneva, sans-serif",
            "Times New Roman, Times, serif",
            "Trebuchet MS, Helvetica, sans-serif",
            "Verdana, Geneva, sans-serif",
          ],
          supportAllValues: true,
        },
        fontSize: {
          options: [10, 12, 14, "default", 18, 20, 22],
          supportAllValues: true,
        },
        plugins: [
          "Essentials",
          "Autoformat",
          "Bold",
          "Italic",
          "BlockQuote",
          "Heading",
          "Link",
          "List",
          "Paragraph",
          "Indent",
          "Table",
          "TableToolbar",

          "Alignment",
          "Autosave",
          "FindAndReplace",
          "Font",
          "Highlight",
          "HorizontalLine",
          "PasteFromOffice",
          "RemoveFormat",
          "SourceEditing",
          "SpecialCharacters",
          "SpecialCharactersEssentials",
          "Strikethrough",
          "Subscript",
          "Superscript",
          "TableCellProperties",
          "TableProperties",
          "TextTransformation",
          "TodoList",
          "Underline",
          "WordCount",
        ]
          .map((name) =>
            CKEDITOR.ClassicEditor.builtinPlugins.find(
              (plugin) => plugin.pluginName === name,
            ),
          )
          .filter((plugin) => plugin !== undefined),
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading1",
              view: "h1",
              title: "Heading 1",
              class: "ck-heading_heading1",
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3",
              view: "h3",
              title: "Heading 3",
              class: "ck-heading_heading3",
            },
            {
              model: "heading4",
              view: "h4",
              title: "Heading 4",
              class: "ck-heading_heading4",
            },
            {
              model: "heading5",
              view: "h5",
              title: "Heading 5",
              class: "ck-heading_heading5",
            },
            {
              model: "heading6",
              view: "h6",
              title: "Heading 6",
              class: "ck-heading_heading6",
            },
          ],
        },

        link: {
          addTargetToExternalLinks: true,
          decorators: {
            toggleDownloadable: {
              mode: "manual",
              label: "Downloadable",
              attributes: {
                download: "file",
              },
            },
          },
        },
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableCellProperties",
            "tableProperties",
          ],
        },
        removePlugins: [
          "CKBox",
          "CKFinder",
          "EasyImage",
          "RealTimeCollaborativeComments",
          "RealTimeCollaborativeTrackChanges",
          "RealTimeCollaborativeRevisionHistory",
          "PresenceList",
          "Comments",
          "TrackChanges",
          "TrackChangesData",
          "RevisionHistory",
          "Pagination",
          "WProofreader",
          "MathType",
        ],
      })
        .then((editor) => {
          console.log("CKEditor siap:", editor);
        })
        .catch((error) => {
          console.error("CKEditor error:", error);
        });
    });
  };

  initSidebar();
  initEditor();
});
