import { createMachine } from "xstate";

const editorMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5SQJYBcD2AnAdAOwzQAJU0U8oBiUotATwAcwBtABgF1FQGNZ0UMeLiAAeiAEwBGAJw5WAVgDs46QBZxADlYaN4gMwA2ADQg6iSXsk414xZKmKNB+Xr0aAvu5Ols+QiQh+CmpA4gA3AEMAGwBXFg5hHj4yQWExBEkNWQVlGy0dfWNTRD15Vhw9RVVpA1UNeXlVSUzPb1DfAmJScipyWDAsYgIIeM4kECT+VPH08VZspRV1fN1DEzMEOfLHVUVHSSalF3FW8HbcbooiSNiwSgBjDABbJ-QA9DYx7l4poRnzaQLXLLbSrIobFSyaTNXYaPS7AziREGU4+C6hHq0Rh3R4vN6kT6JH4pP6gWYyOSLPKgwrrRAaKy7aG6BpaVisSQorxndC+PoDMgUHCXKBEPBgADuYowIyxTAez1eQ0l0tl9CYhPGkxJaUQBgsFU0kjKlmk8mh4IkmTknMaKnkMg50j0qPOOH5gx6woxV3FUuGYGu0TiCrxyv9MtGROSAlJonMiiBS00NLWxQQuysklYBkU8k0WlKZs83ID8HGaOjv11CAAtJa6wY5OyW63W4pXbzcJ13oKoFWdf8M+I6QgzRUGioi3pxPJ9Z3MOigqKbnEB7Ga-CNHJNIi9M7kWpFKO9NocHV2UtzQYNFVVAvfCK5WB19MySUbzunIoDIDdAYFFHaRylYXYqm0BoXGdB9cA9PtXzjdJShA3cfz-JFAPTCxyhcRRDFYfd9w5KoYPdPB+k9IUnz9VVA3VF8tWJDch33bdWFQ39pH-TCIWtE0EVUQx9S3Ui4K9aiVQDINbgQmsNCaHAGjw1R2NcRx5NHKRt34n9BIMYS6hLdwgA */
  createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5SQJYBcD2AnAdAOwzQAJU0U8oBiUotATwAcwBtABgF1FQGNZ0UMeLiAAeiAIwBOSTlYB2VgGZ5ANkkAmNa3UAaEHQmLxOSXICs6s6ymslrAByKAvk72ls+QiQj8K1H8QAbgCGADYAriwcwjx8ZILCYghSMvJ2cmqaktp6BgjqiuomZgAsJYWKZWZm4uYubgEepORQRCERYJQAxhgAtr3o3uhsnEggsfwJY0kpsgrKGRpauvoS9kUlKiX2JeKacuqS4s6u4I24zRS0jJ09-YOkIzG8k0LTEtJz6ZnLuYj2xm2ZhU5kUhVYFkKLlOBAgcGE7iwzziAjeoCSAFoVH8EBizCZpISiUSTg10B4CMRLlBka9EogSis8pJFLJCqU5HJ7JIqvY5PUzuSLgEWm0wpFafE0aJEJV7LJSiDuSVzFZxDipMZWJtyqZ7NYVPqSgLEThqdcmJLUfSEHKFZsuTzVdYcdlZCDNGY5IoLPZ9ZJoU4gA */
    states: {
      "not editing": {
        on: {
          "edit type": "editing type",
          "edit value": "editing value",
          "insert node": "inserting",
        },
      },

      "editing value": {
        on: {
          "commit edit": "not editing",
        },
      },

      "editing type": {
        on: {
          "commit edit": "not editing",
        },
      },

      inserting: {
        states: {
          "editing new node type": {
            on: {
              "commit new node type": "editing new node value",
            },
          },

          "editing new node value": {
            on: {
              "commit new node": "#editor.not editing",
            },
          },
        },

        initial: "editing new node type",
      },
    },

    initial: "not editing",
    id: "editor",
  });
