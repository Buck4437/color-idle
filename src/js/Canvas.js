function drawTree(canvasID, nodes, player){
  let canvas = document.getElementById(canvasID)
  if (!canvas.getContext) return

  let ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas

  for (let node of nodes){
    if (node.parents === undefined) continue //no parent
    drawNodeBranches(canvasID, node, nodes, player)
  }
}

function drawNodeBranches(id, node, nodes, player){
  for (let parentID of node.parents){
    if (findNode(parentID, nodes) === undefined) continue  //parent doesn't exist
    let parent = findNode(parentID, nodes)
    drawBranch(id, nodePos(id, node), nodePos(id, parent), player)
  }
}

function findNode(id, nodes){
  for (let node of nodes){
    if (node.id == id) return node
  }
  console.log(`Node with the ID '${id}' not found`)
}

function nodePos(canvasID, node){
  if (canvasID == "brightnessUpg-canvas"){
    return [node.pos[0]*720+40, node.pos[1]+40]
  }
}

function drawBranch(id, pos1, pos2, player){
  let canvas = document.getElementById(id)
  let ctx = canvas.getContext('2d');

  ctx.strokeStyle = branchColor(player)
  ctx.lineWidth = 10;

  ctx.beginPath();
  ctx.moveTo(pos1[0], pos1[1]);
  ctx.lineTo(pos2[0], pos2[1]);
  ctx.stroke();
  //
  // console.log(`Line drawn from ${pos1[0]}, ${pos1[1]} to ${pos2[0]}, ${pos2[1]}`)

  // ctx.beginPath();
  // ctx.moveTo(11, 11);
  // ctx.lineTo(400, 400);
  // ctx.stroke();
}

function branchColor(player){
  //refer to color palette
  if (player.options.theme == 0){
    return '#000000'
  }
  if (player.options.theme == 1) {
    return '#D9D9D9'
  }
}

export default drawTree
