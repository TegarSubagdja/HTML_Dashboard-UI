/**
 * Global App Script
 * Mengelola interaksi Sidebar dan Inisialisasi CKEditor
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Logika Sidebar ---
  const initSidebar = () => {
    const toggleBtn = document.getElementById("sidebarToggle");
    const sidebar = document.getElementById("sidebar");

    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("active");
      });
    }
  };

  // --- 2. Logika CKEditor ---
  const initEditor = () => {
    document.querySelectorAll(".editor").forEach((el) => {
      CKEDITOR.ClassicEditor.create(el, {
        // https://ckeditor.com/docs/ckeditor5/latest/features/toolbar/toolbar.html#extended-toolbar-configuration-format
        toolbar: {
          items: [
            "exportPDF",
            "exportWord",
            "|",
            "findAndReplace",
            "selectAll",
            "|",
            "heading",
            "|",
            "bold",
            "italic",
            "strikethrough",
            "underline",
            "code",
            "subscript",
            "superscript",
            "removeFormat",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
            "|",
            "outdent",
            "indent",
            "|",
            "undo",
            "redo",
            "-",
            "fontSize",
            "fontFamily",
            "fontColor",
            "fontBackgroundColor",
            "highlight",
            "|",
            "alignment",
            "|",
            "link",
            "insertImage",
            "blockQuote",
            "insertTable",
            "mediaEmbed",
            "codeBlock",
            "htmlEmbed",
            "|",
            "specialCharacters",
            "horizontalLine",
            "pageBreak",
            "|",
            "textPartLanguage",
            "|",
            "sourceEditing",
          ],
          shouldNotGroupWhenFull: true,
        },
        // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html
        //htmlSupport: {
        //    allow: [
        //        {
        //            name: /.*/,
        //            attributes: true,
        //            classes: true,
        //            styles: true
        //        }
        //    ]
        //},
        // https://ckeditor.com/docs/ckeditor5/latest/features/editor-placeholder.html#using-the-editor-configuration
        placeholder: "Type or paste your content here!",
        // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-family-feature
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
        // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-size-feature
        fontSize: {
          options: [10, 12, 14, "default", 18, 20, 22],
          supportAllValues: true,
        },
        // Be careful with the plugins list.
        // https://ckeditor.com/docs/ckeditor5/latest/features/plugins.html
        // Safely load plugins
        plugins: [
          // Essentials
          "Essentials",
          "Autoformat",
          "Bold",
          "Italic",
          "BlockQuote",
          "Heading",
          "Link",
          "List",
          "Paragraph",
          "Image",
          "ImageCaption",
          "ImageStyle",
          "ImageToolbar",
          "ImageUpload",
          "Indent",
          "Table",
          "TableToolbar",
          "MediaEmbed",

          // Extra plugins
          "Alignment",
          "AutoImage",
          "ImageInsert",
          "ImageResize",
          "LinkImage",
          "Autosave",
          "Code",
          "CodeBlock",
          "FindAndReplace",
          "Font",
          "Highlight",
          "HorizontalLine",
          "HtmlEmbed",
          "PageBreak",
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
        // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/image-upload.html
        image: {
          resizeOptions: [
            {
              name: "resizeImage:original",
              value: null,
              icon: "original",
            },
            {
              name: "resizeImage:50",
              value: "50",
              icon: "medium",
            },
            {
              name: "resizeImage:75",
              value: "75",
              icon: "large",
            },
          ],
          toolbar: [
            "imageTextAlternative",
            "toggleImageCaption",
            "|",
            "imageStyle:inline",
            "imageStyle:wrapText",
            "imageStyle:breakText",
            "|",
            "resizeImage",
          ],
        },
        // https://ckeditor.com/docs/ckeditor5/latest/features/link.html#custom-link-attributes-decorators
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: "https://",
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
        // https://ckeditor.com/docs/ckeditor5/latest/features/table.html
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableCellProperties",
            "tableProperties",
          ],
        },
        // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html
        // htmlSupport: {
        //     allow: [
        //         {
        //             name: /.*/,
        //             attributes: true,
        //             classes: true,
        //             styles: true
        //         }
        //     ]
        // },
        removePlugins: [
          // These two are commercial, but you can try them
          // 'ExportPdf',
          // 'ExportWord',
          "CKBox",
          "CKFinder",
          "EasyImage",
          // This sample uses the Base64UploadAdapter to handle image uploads as it requires no configuration.
          // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/base64-upload-adapter.html
          // Storing images as Base64 is usually a very bad idea.
          // Replace it on production website with other solutions:
          // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/image-upload.html
          // 'Base64UploadAdapter',
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
          // Careful, with the Mathtype plugin CKEditor will not load when loading this sample
          // from a local file system (file://) - load this site via HTTP server if you enable MathType
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
