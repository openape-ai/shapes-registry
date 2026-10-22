# pdf-text

`pdf-text read --dir ABSOLUTE_DIR --name FILE.pdf [--max-chars N]` prints the text of one
PDF as `pdf-text/v1` JSON: the text layer, or OCR (`pdftoppm` + `tesseract -l deu+eng`) when
the layer is empty. The permission is bound to the directory, and the tool reads only a
regular `*.pdf` directly inside it.
