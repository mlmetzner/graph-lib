import type { Meta, StoryObj } from "@storybook/react";
import GraphNodeComponent from "./graph-node";

const meta: Meta<typeof GraphNodeComponent> = {
  title: "GraphNode",
  component: GraphNodeComponent,
};

export default meta;

type Story = StoryObj<typeof GraphNodeComponent>;

const GraphNodeComponentTemplate: Story = {
  render: ({ children, className }) => {
    return (
      <div className="w-64">
        <GraphNodeComponent className={className}>
          {children}
        </GraphNodeComponent>
      </div>
    );
  },
};

export const Primary = {
  ...GraphNodeComponentTemplate,
  args: {
    children: <p>Hello World</p>,
    className: "rounded-lg font-bold bg-blue-500 text-white",
  },
} as Story;
