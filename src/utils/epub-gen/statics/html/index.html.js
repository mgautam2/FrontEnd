export const INDEX_HTML = (
  title,
  nav_contents,
  content,
) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial scale=1.0, maximum-scale=5.0, user-scalable=yes">
    <title>${title}</title>
    <link rel="stylesheet" type="text/css" href="styles/style.css" />
    <link rel="stylesheet" type="text/css" href="styles/katex.min.css" />
  </head>
  <body>
    <div id="root" role="main">
      <h1 id="epub_title">${title}</h1>

      <a id="skip_toc" href="#content">Skip the table of Content</a>

      <div id="toc_container">
        <h2 id="toc_title">Contents</h2>
        <div id="toc_list">
          ${nav_contents}
        </div>
      </div>

      <div id="epub_content">
        ${content}
      </div>
    </div>
  </body>
</html>
`