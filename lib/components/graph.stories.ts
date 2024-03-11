import type { Meta, StoryObj } from "@storybook/react";

import GraphComponent from "./graph";

const meta: Meta<typeof GraphComponent> = {
  title: "Graph",
  component: GraphComponent,
};

export default meta;

type Story = StoryObj<typeof GraphComponent>;

const nodes = [
  {
    id: 0,
    label: "Testlabel 1",
    linksTo: [3, 4, 5],
    linksFrom: [],
  },
  {
    id: 1,
    label: "Testlabel 1",
    linksTo: [3, 4, 5],
    linksFrom: [],
  },
  {
    id: 2,
    label: "Testlabel 1",
    linksTo: [3, 4, 5],
    linksFrom: [],
  },
  {
    id: 3,
    label: "Testlabel 1",
    linksTo: [6, 7],
    linksFrom: [0, 1, 2],
  },
  {
    id: 4,
    label: "Testlabel 1",
    linksTo: [6, 7],
    linksFrom: [0, 1, 2],
  },
  {
    id: 5,
    label: "Testlabel 1",
    linksTo: [6, 7],
    linksFrom: [0, 1, 2],
  },
  {
    id: 6,
    label: "Testlabel 1",
    linksTo: [8, 9, 10],
    linksFrom: [3, 4, 5],
  },
  {
    id: 7,
    label: "Testlabel 1",
    linksTo: [8, 9, 10],
    linksFrom: [3, 4, 5],
  },
  {
    id: 8,
    label: "Testlabel 1",
    linksTo: [11],
    linksFrom: [6, 7],
  },
  {
    id: 9,
    label: "Testlabel 1",
    linksTo: [11],
    linksFrom: [6, 7],
  },
  {
    id: 10,
    label: "Testlabel 1",
    linksTo: [11],
    linksFrom: [6, 7],
  },
  {
    id: 11,
    label: "Testlabel 1",
    linksTo: [12, 13],
    linksFrom: [8, 9, 10],
  },
  {
    id: 12,
    label: "Testlabel 1",
    linksTo: [],
    linksFrom: [11],
  },
  {
    id: 13,
    label: "Testlabel 1",
    linksTo: [],
    linksFrom: [11],
  },
];

export const Primary: Story = {
  args: {
    nodes,
    type: "Line",
    width: 800,
  },
};
export const Curved: Story = {
  args: {
    nodes,
    type: "CurvedLine",
    width: 800,
  },
};
export const Area: Story = {
  args: {
    nodes,
    type: "Area",
    width: 800,
  },
};

export const Mobile: Story = {
  args: {
    nodes,
    width: 400,
  },
};
