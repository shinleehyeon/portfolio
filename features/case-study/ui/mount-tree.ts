// @ts-nocheck — d3 hierarchy mutates children/_children in ways TS cannot express.
import * as d3 from "d3";
import type { TreeNode } from "@/features/case-study/model/types";

const COLORS = ["#B43145", "#2D80FD", "#388E3C", "#E65100", "#7B1FA2", "#6B6666", "#6B6666", "#00838F", "#F9A825"];
const FILLS = ["#FFE6E8", "#D1E3FF", "#D4EDDA", "#FFE0B2", "#E1D5E7", "#E8E3E3", "#E8E3E3", "#B2EBF2", "#FFF9C4"];

type Pal = {
  rootBg: string;
  rootText: string;
  nodeBg: string;
  nodeText: string;
  muted: string;
  mutedText: string;
  stroke: string;
};

type BranchNode = TreeNode & { _branchIdx?: number };

type Hier = d3.HierarchyNode<BranchNode> & {
  x0: number;
  y0: number;
  id?: number;
  _children?: Hier[] | null;
};

function themePalette(): Pal {
  return document.documentElement.dataset.theme === "dark"
    ? { rootBg: "#F5F0F0", rootText: "#181212", nodeBg: "#2B2525", nodeText: "#F5F0F0", muted: "rgba(24,18,18,0.7)", mutedText: "#9B9596", stroke: "#554F4F" }
    : { rootBg: "#181212", rootText: "#F5F0F0", nodeBg: "#F5F0F0", nodeText: "#181212", muted: "rgba(245,240,240,0.7)", mutedText: "#837D7D", stroke: "#CDC8C8" };
}

function assignColors(d: BranchNode, idx: number) {
  d._branchIdx = idx;
  d.children?.forEach((child) => assignColors(child, idx));
}

function cloneTree(node: TreeNode): BranchNode {
  return {
    label: node.label,
    children: node.children?.map(cloneTree),
  };
}

function estimateWidth(d: Hier) {
  const len = d.data.label.length;
  const base = d.depth === 0 ? 8 : 6.8;
  let w = len * base + 20;
  if (d._children) w += 20;
  return Math.min(w, 340);
}

export function mountTree(
  el: HTMLElement,
  data: TreeNode,
  opts?: { nodeH?: number; depthGap?: number; sibGap?: number; collapseAt?: number },
) {
  el.replaceChildren();

  const nodeH = opts?.nodeH ?? 28;
  const depthGap = opts?.depthGap ?? 240;
  const sibGap = opts?.sibGap ?? 10;
  const collapseAt = opts?.collapseAt ?? 3;
  const PAL = themePalette();
  const tree = cloneTree(data);
  tree.children?.forEach((child, i) => assignColors(child, i));
  tree._branchIdx = -1;

  const root = d3.hierarchy(tree) as Hier;
  root.x0 = 0;
  root.y0 = 0;

  function collapseDeep(d: Hier, depth: number) {
    d.children?.forEach((child) => collapseDeep(child, depth + 1));
    if (d.children && depth >= collapseAt) {
      d._children = d.children as Hier[];
      (d as Hier & { children: Hier[] | null }).children = null;
    }
  }
  collapseDeep(root, 0);

  const svg = d3
    .select(el)
    .append("svg")
    .attr("width", "100%")
    .style("overflow", "visible")
    .style("font-family", "'UCity Pro', system-ui, sans-serif");

  const g = svg.append("g").attr("transform", "translate(40, 20)");
  const treeLayout = d3
    .tree<BranchNode>()
    .nodeSize([nodeH + sibGap, depthGap])
    .separation((a, b) => (a.parent === b.parent ? 1 : 1.2));

  const duration = 400;
  let i = 0;

  function diagonal(s: { x: number; y: number; data?: BranchNode; depth?: number; _children?: Hier[] | null; children?: Hier[] | null }, t: { x: number; y: number }) {
    const source = s as Hier;
    const sy = s.y + (source.data ? estimateWidth(source) : 100);
    return `M ${sy} ${s.x} C ${(sy + t.y) / 2} ${s.x}, ${(sy + t.y) / 2} ${t.x}, ${t.y} ${t.x}`;
  }

  function update(source: Hier) {
    treeLayout(root);
    const nodes = root.descendants() as Hier[];
    const links = root.links();

    let minY = Infinity;
    let maxY = -Infinity;
    nodes.forEach((d) => {
      const x = d.x ?? 0;
      if (x < minY) minY = x;
      if (x > maxY) maxY = x;
    });
    const h = maxY - minY + nodeH * 2 + 40;
    svg.transition().duration(duration).attr("height", h);
    g.transition().duration(duration).attr("transform", `translate(40,${-minY + nodeH + 10})`);

    const node = g.selectAll<SVGGElement, Hier>("g.ct-node").data(nodes, (d) => {
      if (d.id == null) d.id = ++i;
      return d.id;
    });

    const nodeEnter = node
      .enter()
      .append("g")
      .attr("class", "ct-node")
      .attr("transform", () => `translate(${source.y0 ?? 0},${source.x0 ?? 0})`)
      .style("opacity", 0)
      .style("cursor", (d) => (d.children || d._children ? "pointer" : "default"))
      .on("click", (_event, d) => {
        const node = d as Hier & { children: Hier[] | null };
        if (node.children) {
          node._children = node.children;
          node.children = null;
        } else if (node._children) {
          node.children = node._children;
          node._children = null;
        }
        update(d);
      });

    nodeEnter.append("rect").attr("x", 0).attr("y", -nodeH / 2).attr("height", nodeH).attr("rx", 6).attr("ry", 6);

    nodeEnter
      .append("text")
      .attr("dy", "0.35em")
      .attr("x", 10)
      .attr("font-size", (d) => (d.depth === 0 ? "14px" : "12.5px"))
      .attr("font-weight", (d) => (d.depth <= 1 || d.children || d._children ? "600" : "400"))
      .attr("fill", (d) => {
        if (d.depth === 0) return PAL.rootText;
        return (d.data._branchIdx ?? -1) >= 0 ? "#181212" : PAL.nodeText;
      })
      .text((d) => d.data.label);

    nodeEnter
      .append("text")
      .attr("class", "ct-indicator")
      .attr("dy", "0.35em")
      .attr("font-size", "10px")
      .attr("fill", (d) => (d.depth === 0 ? PAL.muted : PAL.mutedText));

    const nodeUpdate = nodeEnter.merge(node);

    nodeUpdate
      .transition()
      .duration(duration)
      .attr("transform", (d) => `translate(${d.y},${d.x})`)
      .style("opacity", 1);

    nodeUpdate
      .select("rect")
      .attr("width", (d) => estimateWidth(d))
      .attr("fill", (d) => {
        if (d.depth === 0) return PAL.rootBg;
        const idx = d.data._branchIdx ?? -1;
        return idx >= 0 ? FILLS[idx % FILLS.length] : PAL.nodeBg;
      })
      .attr("stroke", (d) => {
        if (d.depth === 0) return PAL.rootBg;
        const idx = d.data._branchIdx ?? -1;
        return idx >= 0 ? COLORS[idx % COLORS.length] : PAL.stroke;
      })
      .attr("stroke-width", 1.2)
      .attr("stroke-dasharray", (d) => (!(d.children || d._children) && d.depth > 1 ? "3,2" : "none"));

    nodeUpdate.selectAll<SVGTextElement, Hier>("text:not(.ct-indicator)").attr("fill", (d) => {
      if (d.depth === 0) return PAL.rootText;
      return (d.data._branchIdx ?? -1) >= 0 ? "#181212" : PAL.nodeText;
    });

    nodeUpdate
      .select(".ct-indicator")
      .attr("x", (d) => estimateWidth(d) - 16)
      .attr("fill", (d) => (d.depth === 0 ? PAL.muted : PAL.mutedText))
      .text((d) => {
        if (d._children) return `+${d._children.length}`;
        if (d.children && d.depth > 0) return "−";
        return "";
      });

    nodeUpdate
      .on("mouseenter", function () {
        d3.select(this).select("rect").transition().duration(150).attr("y", -nodeH / 2 - 1).attr("height", nodeH + 2);
      })
      .on("mouseleave", function () {
        d3.select(this).select("rect").transition().duration(150).attr("y", -nodeH / 2).attr("height", nodeH);
      });

    node
      .exit()
      .transition()
      .duration(duration)
      .attr("transform", () => `translate(${source.y},${source.x})`)
      .style("opacity", 0)
      .remove();

    const link = g.selectAll<SVGPathElement, d3.HierarchyLink<BranchNode>>("path.ct-link").data(links, (d) => (d.target as Hier).id ?? 0);

    link
      .enter()
      .insert("path", "g")
      .attr("class", "ct-link")
      .attr("fill", "none")
      .attr("stroke-width", 1.2)
      .attr("d", () => {
        const o = { x: source.x0 ?? 0, y: source.y0 ?? 0 };
        return diagonal(o, o);
      })
      .style("opacity", 0)
      .merge(link)
      .transition()
      .duration(duration)
      .attr("d", (d) => diagonal({ x: d.source.x ?? 0, y: d.source.y ?? 0, data: d.source.data }, { x: d.target.x ?? 0, y: d.target.y ?? 0 }))
      .attr("stroke", (d) => {
        const idx = (d.target.data as BranchNode)._branchIdx ?? -1;
        return idx >= 0 ? COLORS[idx % COLORS.length] : "#CDC8C8";
      })
      .style("opacity", 0.5);

    link
      .exit()
      .transition()
      .duration(duration)
      .attr("d", () => {
        const o = { x: source.x ?? 0, y: source.y ?? 0 };
        return diagonal(o, o);
      })
      .style("opacity", 0)
      .remove();

    nodes.forEach((d) => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  update(root);

  if (window.innerWidth <= 900) {
    el.style.overflowX = "auto";
    el.style.maxWidth = "100%";
    requestAnimationFrame(() => {
      const svgEl = el.querySelector("svg");
      const group = svgEl?.querySelector("g");
      if (!svgEl || !group) return;
      const bbox = (group as SVGGElement).getBBox();
      const w = bbox.x + bbox.width + 40;
      if (w > el.clientWidth) {
        svgEl.style.minWidth = `${w}px`;
        svgEl.style.width = `${w}px`;
      }
    });
  }

  return () => {
    el.replaceChildren();
  };
}
