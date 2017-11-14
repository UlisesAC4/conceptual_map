var elementsOfMap = []
var relationsOfMap = []
var de,a,texto
var relation = {}
var go = require('./go.js')
//{from: 0, to: 0, text: ''}

function deleteAll ()
{
  elementsOfMap = []
  relationsOfMap = []
  document.getElementById('lisEle').innerHTML = ''
  document.getElementById('lisRel').innerHTML = ''
  document.getElementById('from').innerHTML = '<option value="" selected>Seleccionar</option>'
  document.getElementById('to').innerHTML = '<option value="" selected>Seleccionar</option>'
}

function drawMap ()
{

}

function nodeExist ()
{
  for (i = 0; i < elementsOfMap.length; i++)
  {
    if (elementsOfMap[i]['text'] === document.getElementById('node').value)
    {
      return true
    }
  }
  return false
}

function drawElemenList ()
{
  document.getElementById('lisEle').innerHTML = ''
  document.getElementById('from').innerHTML = '<option value="" selected>Seleccionar</option>'
  for (i = 0; i<elementsOfMap.length ; i++)
  {
    document.getElementById('lisEle').innerHTML += '<p>' + elementsOfMap[i]['text'] + '</p>'
    document.getElementById('from').innerHTML += '<option id="valuef' + i +'"' +  '>' + elementsOfMap[i]['text'] + '</option>'
  }
  document.getElementById('node').value = ''
}

function addElement ()
{
  if (document.getElementById('node').value === '')
  {
    alert('Tu caja de nodos se encuentra vacia')
  }
  else
  {
    if (elementsOfMap.length === 0)
    {
      x = {key: 0, text: ''}
      text = document.getElementById('node').value
      x['key'] = 1
      x['text'] = text
      elementsOfMap.push(x)
      drawElemenList()

    }
    else
    {
      if (nodeExist() === true)
      {
        alert('Ese elemento ya existe')
      }
      else
      {
        x = {key: 0, text: ''}
        text = document.getElementById('node').value
        last = elementsOfMap[elementsOfMap.length - 1]
        x['key'] = last['key'] + 1
        x['text'] = text
        elementsOfMap.push(x)
        drawElemenList()
      }
    }
  }
}

function addFrom ()
{
  de = document.getElementById('from').selectedIndex
  document.getElementById('to').innerHTML = '<option value="" selected>Seleccionar</option>'
  for (i = 0; i<elementsOfMap.length ; i++)
  {

    document.getElementById('to').innerHTML += '<option id="valuett' + i +'"' + '>' + elementsOfMap[i]['text'] + '</option>'
  }
}

function addTo ()
{
  if ((document.getElementById('to').selectedIndex) === document.getElementById('from').selectedIndex)
  {
    alert('Su origen y destino en la relacion no puede se el mismo numero')
  }
  else
  {
      a = document.getElementById('to').selectedIndex
  }
}

function drawRelations()
{
  document.getElementById('lisRel').innerHTML = ''
  for(i = 0; i<relationsOfMap.length; i++)
  {
    document.getElementById('lisRel').innerHTML += '<p>' + relationsOfMap[i]['from'] + '-' + relationsOfMap[i]['to'] + relationsOfMap[i]['text'] + '</p>'
  }
}

function addRelation ()
{
  if(relation['from'] === 0 && relation['to'] === 0)
  {
    alert('Todos los elementos de la relacion deben ser rellenados antes de continuar')
  }
  else
  {
      texto = document.getElementById('labe').value
      relation = {from: de, to: a, text: texto}
      relationsOfMap.push(relation)
      drawRelations()
  }
}

function inicio()
{

   var $ = go.GraphObject.make
   var myDiagram =
   $(go.Diagram, "myDiagramDiv",
         {
           initialAutoScale: go.Diagram.Uniform,
           contentAlignment: go.Spot.Center,
           layout:
             $(go.ForceDirectedLayout,  
               { defaultSpringLength: 30, defaultElectricalCharge: 100 })
         });

    myDiagram.nodeTemplate =
   $(go.Node, "Auto",
     { locationSpot: go.Spot.Center },

     $(go.Shape, "Rectangle",
       { fill: $(go.Brush, "Linear", { 0: "rgb(254, 201, 0)", 1: "rgb(254, 162, 0)" }), stroke: "black" }),
     $(go.TextBlock,
       { font: "bold 10pt helvetica, bold arial, sans-serif", margin: 4 },
       new go.Binding("text", "text"))
   );

   myDiagram.linkTemplate =
  $(go.Link,
    $(go.Shape,
      { stroke: "black" }),
    $(go.Shape,
      { toArrow: "standard", stroke: null }),
    $(go.Panel, "Auto",
      $(go.Shape,
        { fill: $(go.Brush, "Radial", { 0: "rgb(240, 240, 240)", 0.3: "rgb(240, 240, 240)", 1: "rgba(240, 240, 240, 0)" }),
          stroke: null }),
      $(go.TextBlock,
        { textAlign: "center",
          font: "10pt helvetica, arial, sans-serif",
          stroke: "#555555",
          margin: 4 },
        new go.Binding("text", "text"))
    )
  );

    var model = $(go.GraphLinksModel);
    model.nodeDataArray = elementsOfMap;
    model.linkDataArray = relationsOfMap;
    myDiagram.model = model;

 }
