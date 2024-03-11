export interface GraphNodeIn {
  id: number;
  label: string;
  linksTo: number[];
  linksFrom: number[];
}

export interface GraphLinkIn {
  sourceId: number;
  targetId: number;
}

export interface GraphNode {
  id: number;
  x: number;
  y: number;
  color?: string;
  label: string;
  width: number;
  level: number;
  linksFrom: number[];
  linksTo: number[];
}

export interface GraphLinkArea {
  nodeIds: number[];
  sourcesX: number[];
  sourcesY: number[];
  sourceNodesWidth: number;
  targetsX: number[];
  targetsY: number[];
  targetNodesWidth: number;
}

export interface GraphLinkLine {
  nodeIds: number[];
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}

export interface GraphDataIn {
  nodes: GraphNodeIn[];
  width: number;
}
