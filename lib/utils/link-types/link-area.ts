import { GraphLinkArea, GraphNode } from "../../types";

export function getLinks(nodes: GraphNode[], height: number, levels: number) {
  const all_links: GraphLinkArea[] = [];
  for (const i of [...Array(levels).keys()]) {
    const nodesOnLevel = nodes.filter((node) => node.level === i + 1);
    const sourcesX = nodesOnLevel.map((node) => node.x);
    const sourcesY = nodesOnLevel.map((node) => node.y + height);
    const targetIds = nodesOnLevel[0].linksTo;
    const targetsX = targetIds.map((id) => {
      const node = nodes.find((node) => node.id === id);
      return node ? node.x : 0;
    });
    const targetsY = targetIds.map((id) => {
      const node = nodes.find((node) => node.id === id);
      return node ? node.y : 0;
    });
    const nodesWidth = nodesOnLevel[0].width;
    const targetNodesWidth =
      nodes.find((node) => node.id === targetIds[0])?.width || 0;
    all_links.push({
      nodeIds: nodesOnLevel.map((node) => node.id),
      sourcesX,
      sourcesY,
      targetsX,
      targetsY,
      sourceNodesWidth: nodesWidth,
      targetNodesWidth: targetNodesWidth,
    });
  }

  return all_links;
}

export function pointsToBezierCurve(points: GraphLinkArea): string {
  const sourcesX = points.sourcesX.map((x) => [
    x - points.sourceNodesWidth / 2,
    x + points.sourceNodesWidth / 2,
  ]);
  const targetsX = points.targetsX.map((x) => [
    x - points.targetNodesWidth / 2,
    x + points.targetNodesWidth / 2,
  ]);
  if (!sourcesX.length || !targetsX.length) return "";
  const sourcesY = points.sourcesY[0];
  const targetsY = points.targetsY[0];
  const halfY = sourcesY + (targetsY - sourcesY) / 2;
  let d = "";
  for (let i = 0; i < sourcesX.length; i++) {
    if (i === 0) {
      d += `M ${sourcesX[i][0]} ${sourcesY} `;
      d += `H ${sourcesX[i][0]} ${sourcesX[i][1]} `;
    } else {
      d += `Q ${sourcesX[i - 1][1] + (sourcesX[i][0] - sourcesX[i - 1][1]) / 2} ${halfY} ${sourcesX[i][0]} ${sourcesY}`;
      d += `H ${sourcesX[i][0]} ${sourcesX[i][1]} `;
    }
  }
  if (sourcesX.length === 1) {
    d += `H ${sourcesX[0][1]} `;
  }

  for (let i = targetsX.length - 1; i >= 0; i--) {
    if (i === targetsX.length - 1) {
      d += `Q ${sourcesX[sourcesX.length - 1][1] - (sourcesX[sourcesX.length - 1][1] - targetsX[targetsX.length - 1][0]) / 3} ${halfY} ${targetsX[i][1]} ${targetsY}`;
      d += `H ${targetsX[i][1]} ${targetsX[i][0]} `;
    } else {
      d += `Q ${targetsX[i][1] - (targetsX[i][1] - targetsX[i + 1][0]) / 2} ${halfY} ${targetsX[i][1]} ${targetsY}`;
      d += `H ${targetsX[i][1]} ${targetsX[i][0]} `;
    }
  }
  if (targetsX.length === 1) {
    d += `H ${targetsX[0][0]} `;
  }
  d += `H ${targetsX[0][1]} ${targetsX[0][0]} `;
  d += `Q ${targetsX[0][0] + (sourcesX[0][1] - targetsX[0][0]) / 3} ${halfY} ${sourcesX[0][0]} ${sourcesY}`;
  return d;
}
