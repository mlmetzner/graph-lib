import { GraphLinkArea, GraphLinkLine, GraphNode } from "../../types";
import { getLinks as getLinksArea, pointsToBezierCurve } from "./link-area";
import { getLinks as getLinksLine, getPath } from "./link-line";

export function getLinks({
  type,
  nodes,
  levels,
}: {
  type: "Area" | "Line" | "CurvedLine";
  nodes: GraphNode[];
  levels?: number;
}) {
  if (type === "Area") {
    if (!levels) throw new Error("Levels is required for Area type");
    return getLinksArea(nodes, 60, levels) as GraphLinkArea[];
  }
  return getLinksLine(nodes, 60) as GraphLinkLine[];
}

export function getPathString({
  type,
  link,
}: {
  type: "Area" | "Line" | "CurvedLine";
  link: GraphLinkLine | GraphLinkArea;
}) {
  if (type === "Area") {
    return pointsToBezierCurve(link as GraphLinkArea);
  }
  if (type === "Line") {
    return getPath(link as GraphLinkLine, false);
  }
  if (type === "CurvedLine") {
    return getPath(link as GraphLinkLine, true);
  } else {
    throw new Error("Invalid type");
  }
}

export function getArrow({
  x,
  y,
  size,
}: {
  x: number;
  y: number;
  size: number;
}) {
  let p = `M ${x} ${y}`;
  p += `L ${x - size / 2} ${y - size}`;
  p += `L ${x + size / 2} ${y - size}`;
  p += `L ${x} ${y}`;
  return p;
}
