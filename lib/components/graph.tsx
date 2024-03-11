import Balancer from "react-wrap-balancer";
import { GraphLinkLine } from "../types";
import { calculateFontSize, getInitialNodes } from "../utils";
import { getArrow, getLinks, getPathString } from "../utils/link-types";
import GraphNodeComponent from "./graph-node";

interface GraphComponentProps {
  nodes: {
    id: number;
    label: string;
    linksTo: number[];
    linksFrom: number[];
  }[];
  width: number;
  type: "Area" | "Line" | "CurvedLine";
  nodeClassname?: string;
}

export default function GraphComponent({
  nodes,
  width,
  type = "Line",
  nodeClassname = "",
}: GraphComponentProps) {
  const nodeHeight = 60;
  const inintialNodes = getInitialNodes({
    data: {
      nodes,
      width,
    },
  });
  const levels = inintialNodes.levels;
  const links = getLinks({
    type,
    nodes: inintialNodes.nodes,
    levels,
  });

  const fontSizes = inintialNodes.nodes.map((node) => {
    return calculateFontSize(node.label, node.width, 80);
  });
  const minFontSize = Math.min(...fontSizes);
  return (
    <div>
      <svg width={width} height={levels * 100}>
        <defs>
          <linearGradient id="grad1" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="blue" />
            <stop offset="100%" stopColor="red" />
          </linearGradient>
        </defs>
        <g>
          {inintialNodes.nodes.map((node, i) => {
            const fontSize = Math.min(fontSizes[i], minFontSize + 4);
            return (
              <g key={node.id}>
                <foreignObject
                  x={node.x - 1 - node.width / 2}
                  y={node.y}
                  width={node.width}
                  fontSize={fontSize}
                  height={nodeHeight}
                >
                  <GraphNodeComponent className={nodeClassname}>
                    <p>
                      <Balancer>{node.label}</Balancer>
                    </p>
                  </GraphNodeComponent>
                </foreignObject>
              </g>
            );
          })}
          {links.map((link) => {
            const pathString = getPathString({
              type,
              link,
            });
            if (type === "Line" || type === "CurvedLine") {
              const arrow = getArrow({
                x: (link as GraphLinkLine).targetX,
                y: (link as GraphLinkLine).targetY,
                size: 10,
              });
              return (
                <>
                  <path
                    key={`${link.nodeIds.join("-")}`}
                    d={pathString}
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                  />
                  <path
                    key={`${link.nodeIds.join("-")}-arrow`}
                    d={arrow}
                    fill="black"
                  />
                </>
              );
            }
            if (type === "Area") {
              return (
                <path
                  key={`${link.nodeIds.join("-")}`}
                  d={pathString}
                  fill="url(#grad1)"
                  fillOpacity={0.2}
                />
              );
            }
          })}
        </g>
      </svg>
    </div>
  );
}
