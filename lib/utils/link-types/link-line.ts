import { GraphLinkLine, GraphNode } from "../../types";

export function getLinks(nodes: GraphNode[], height: number) {
  const all_links: GraphLinkLine[] = [];
  for (const node of nodes) {
    for (const targetId of node.linksTo) {
      const targetNode = nodes.find((node) => node.id === targetId);
      if (targetNode) {
        all_links.push({
          nodeIds: [node.id, targetNode.id],
          sourceX: node.x,
          sourceY: node.y + height,
          targetX: targetNode.x,
          targetY: targetNode.y,
        });
      }
    }
  }
  return all_links;
}

export function getPath(link: GraphLinkLine, isCurved: boolean = true) {
  const halfwayY = link.sourceY - (link.sourceY - link.targetY) / 2;
  let path = `M ${link.sourceX} ${link.sourceY}`;
  if (isCurved) {
    if (link.sourceX < link.targetX) {
      path += `L ${link.sourceX} ${halfwayY - 10} `;
      path += `Q ${link.sourceX} ${halfwayY} ${link.sourceX + 10} ${halfwayY}`;
    } else if (link.sourceX > link.targetX) {
      path += `L ${link.sourceX} ${halfwayY - 10} `;
      path += `Q ${link.sourceX} ${halfwayY} ${link.sourceX - 10} ${halfwayY}`;
    } else {
      path += `L ${link.sourceX} ${halfwayY}`;
    }
  } else {
    path += `L ${link.sourceX} ${halfwayY}`;
  }
  if (isCurved) {
    if (link.sourceX < link.targetX) {
      path += `L ${link.targetX - 10} ${halfwayY}`;
      path += `Q ${link.targetX} ${halfwayY} ${link.targetX} ${link.targetY}`;
      path += `L ${link.targetX} ${halfwayY + 10}`;
    } else if (link.sourceX > link.targetX) {
      path += `L ${link.targetX + 10} ${halfwayY}`;
      path += `Q ${link.targetX} ${halfwayY} ${link.targetX} ${link.targetY}`;
      path += `L ${link.targetX} ${halfwayY + 10}`;
    } else {
      path += `L ${link.targetX} ${halfwayY}`;
    }
  } else {
    path += `L ${link.targetX} ${halfwayY}`;
  }

  path += `L ${link.targetX} ${link.targetY}`;
  return path;
}
