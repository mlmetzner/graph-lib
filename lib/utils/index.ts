import { GraphDataIn, GraphLinkIn, GraphNode } from "../types";

export function getInitialNodes({ data }: { data: GraphDataIn }): {
  nodes: GraphNode[];
  levels: number;
} {
  const width = data.width / 2;
  const allNodes: GraphNode[] = [];
  let levels = 0;
  const addNode = (
    id: number,
    label: string,
    x: number,
    y: number,
    nodeWith: number,
    level: number,
    linksFrom: number[],
    linksTo: number[]
  ) => {
    allNodes.push({
      id,
      label,
      x,
      y,
      width: nodeWith,
      level,
      linksFrom,
      linksTo,
    });
  };

  const addNodes = (links: GraphLinkIn[], y: number) => {
    if (links.length === 0) return;
    const targetNodes = new Set(links.map((link) => link.targetId));
    levels += 1;

    const uniqueTargets = Array.from(
      new Set(links.map((link) => link.targetId))
    );
    const nSiblings = uniqueTargets.length;
    const getWidth = (nSiblings: number) => {
      const maxWidth = 320;
      return Math.min((width * 2) / (nSiblings + 1), maxWidth);
    };
    const nodeWith = getWidth(nSiblings);
    const center = width / 2;
    const getX = (i: number) => {
      if (nSiblings === 1) {
        return center;
      }
      if (nSiblings === 2) {
        return [center - 0.3 * nodeWith, center + 0.3 * nodeWith][i];
      }
      if (nSiblings === 3) {
        return [center - 0.6 * nodeWith, center, center + 0.6 * nodeWith][i];
      }
      if (nSiblings === 4) {
        return [
          center - 0.9 * nodeWith,
          center - 0.3 * nodeWith,
          center + 0.3 * nodeWith,
          center + 0.9 * nodeWith,
        ][i];
      }
      if (nSiblings === 5) {
        return [center - 0.6 * nodeWith, center, center + 0.6 * nodeWith][i];
      } else {
        return center;
      }
    };
    let i = 0;
    for (const target of uniqueTargets) {
      const node = data.nodes.find((n) => n.id === target);
      if (node) {
        addNode(
          node.id,
          node.label,
          getX(i) * 2,
          y * 2,
          nodeWith,
          levels,
          node.linksFrom,
          node.linksTo
        );
        i++;
      }
    }
    const nodesOnLevel = data.nodes
      .filter((node) => targetNodes.has(node.id))
      .flatMap((node) => {
        return node.linksTo.map((targetId) => {
          return {
            sourceId: node.id,
            targetId,
          };
        });
      });

    addNodes(nodesOnLevel, y + 50);
  };
  const nodesWithoutParents = data.nodes
    .filter((node) => node.linksFrom.length === 0)
    .flatMap((noParent) => {
      return noParent.linksTo.map((node) => {
        return {
          sourceId: noParent.id,
          targetId: node,
        };
      });
    });

  console.log(nodesWithoutParents);

  console.log(nodesWithoutParents);
  addNodes(nodesWithoutParents, 10);
  return {
    nodes: allNodes,
    levels,
  };
}

export function calculateFontSize(
  text: string,
  width: number,
  height: number
): number {
  const longestWord = text
    .replace("-", "")
    .split(" ")
    .reduce((a, b) => {
      return a.length > b.length ? a : b;
    });
  if (
    text.length > 30 &&
    longestWord.length !== text.length &&
    longestWord.length > 20
  ) {
    return calculateFontSize(longestWord, width, height);
  } else if (text.length > 30) {
    return calculateFontSize(
      text.split(" ").slice(0, 4).join(" ").slice(0, 30),
      width,
      height
    );
  }
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return 0;
  let fontSize = 22;
  context.font = `${fontSize}px ui-sans-serif`;
  while (context.measureText(text).width > width || fontSize > height) {
    fontSize -= 2;
    context.font = `${fontSize}px ui-sans-serif`;
  }
  return fontSize + 1;
}
