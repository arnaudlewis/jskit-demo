import app from './conf/config'
const PORT = app.get('port')

app.listen(PORT, function() {
  console.log('Express server listening on port ' + app.get('port'));
});



const linksPerItem = 4
const links = ['link1', 'link2', 'link3', 'link4', 'link5','link6', 'link7', 'link8', 'link9', 'link10']
const itemsCount = links / linksPerItem + 1 //because it's an Euclide division so the two last links will be in the + 1 item

for(let i=0; i < itemsCount; i++) {
  const firstLinkIndex = i * linksPerItem
  const lastLinkIndex = firstLinkIndex + linksPerItem
  const linksCurrentItem = links.slice(firstLinkIndex, lastLinkIndex)

  linksCurrentItem.map((link) => {
    return `<a href="${link}"></a>`
  })
}
