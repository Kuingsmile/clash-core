import directoryTree from 'directory-tree'
import fs from 'fs'
import metadataParser from 'markdown-yaml-metadata-parser'

function getMetadataFromDoc(path: string): { sidebarTitle?: string, sidebarOrder?: number } {
  const fileContents = fs.readFileSync(path, 'utf8')

  return metadataParser(fileContents).metadata
}

export function generateSidebarChapter(locale:string, chapterDirName: Map<string,string>): any[] {
  if (chapterDirName.size < 1) {
    console.error(chapterDirName)
    throw new Error(`Could not genereate sidebar: chapterDirName is empty`)
  }

  var chapterPath = ''
  var sidebar: any[] = []

  for (const chapterDirKey of chapterDirName.keys()) {
    if (locale !== 'en_US') {
      chapterPath = `./${locale}/${chapterDirKey}`
    } else {
      chapterPath = `./${chapterDirKey}`
    }

    const tree = directoryTree(chapterPath)

    if (!tree || !tree.children) {
      console.error(tree)
      throw new Error(`Could not genereate sidebar: invalid chapter at ${chapterPath}`)
    }

    let items: { sidebarOrder: number, text: string, link: string }[] = []

    // Look into files in the chapter
    for (const doc of tree.children) {
      // make sure it's a .md file
      if (doc.children || !doc.name.endsWith('.md'))
        continue

      const { sidebarOrder, sidebarTitle } = getMetadataFromDoc(doc.path)

      if (!sidebarOrder)
        throw new Error('Cannot find sidebarOrder in doc metadata: ' + doc.path)

      if (!sidebarTitle)
        throw new Error('Cannot find sidebarTitle in doc metadata: ' + doc.path)

      if (chapterDirKey === 'introduction' && doc.name === '_dummy-index.md') {
        // Override index page link
        items.push({
          sidebarOrder,
          text: sidebarTitle,
          link: '/' + (locale === 'en_US' ? '' : locale + '/') 
        })
      } else {
        items.push({
          sidebarOrder,
          text: sidebarTitle,
          link: "/" + doc.path
        })
      }
    }

    items = items.sort((a, b) => a.sidebarOrder - b.sidebarOrder)

    // remove dash and capitalize first character of each word as chapter title
    const text = chapterDirName.get(chapterDirKey) || chapterDirKey.split('-').join(' ').replace(/\b\w/g, l => l.toUpperCase())
    sidebar.push({
      text,
      collapsed: false,
      items,
    })
  }

  return sidebar
}