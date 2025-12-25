import { useEffect, useMemo, useRef, useState } from "react";

const TOOL_ITEMS = [
  { id: "component", label: "Component Box", icon: "🧩" },
  { id: "arrow", label: "Arrow", icon: "➡️" },
  { id: "sequence", label: "Sequence Lifeline", icon: "📍" },
  { id: "rect", label: "Rectangle", icon: "▭" },
  { id: "rounded", label: "Rounded Rect", icon: "▢" },
  { id: "circle", label: "Circle", icon: "⚪" },
  { id: "sphere", label: "Sphere", icon: "◎" },
  { id: "cylinder", label: "Cylinder", icon: "⬭" },
  { id: "diamond", label: "Diamond", icon: "🔷" },
  { id: "hexagon", label: "Hexagon", icon: "⬡" },
  { id: "parallelogram", label: "Parallelogram", icon: "▱" },
  { id: "trapezoid", label: "Trapezoid", icon: "⏢" },
  { id: "isosceles-trapezoid", label: "Isosceles Trapezoid", icon: "⏥" },
  { id: "right-trapezoid", label: "Right Trapezoid", icon: "⏢" },
  { id: "right-triangle", label: "Right Triangle", icon: "◿" },
  { id: "triangle", label: "Triangle", icon: "▲" },
  { id: "line", label: "Line", icon: "➖" },
  { id: "perp-line", label: "Perpendicular", icon: "⟂" },
];

const INITIAL_SHAPES = [
  {
    id: "shape-1",
    type: "component",
    x: 120,
    y: 80,
    width: 180,
    height: 90,
    stroke: "#2f5bea",
    fill: "#e8efff",
    strokeWidth: 1,
    dash: "solid",
    fillOpacity: 1,
    fontSize: 12,
    cornerRadius: 10,
    rotation: 0,
    label: "Service A",
  },
  {
    id: "shape-2",
    type: "component",
    x: 380,
    y: 80,
    width: 180,
    height: 90,
    stroke: "#2f5bea",
    fill: "#e8efff",
    strokeWidth: 1,
    dash: "solid",
    fillOpacity: 1,
    fontSize: 12,
    cornerRadius: 10,
    rotation: 0,
    label: "Service B",
  },
  {
    id: "shape-3",
    type: "arrow",
    x: 300,
    y: 125,
    width: 90,
    height: 0,
    stroke: "#1f2933",
    fill: "transparent",
    strokeWidth: 1,
    dash: "solid",
    fillOpacity: 1,
    fontSize: 12,
    cornerRadius: 0,
    rotation: 0,
    label: "gRPC",
  },
  {
    id: "shape-4",
    type: "sequence",
    x: 140,
    y: 240,
    width: 120,
    height: 180,
    stroke: "#111827",
    fill: "#f8fafc",
    strokeWidth: 1,
    dash: "8 6",
    fillOpacity: 1,
    fontSize: 12,
    cornerRadius: 8,
    rotation: 0,
    label: "Caller",
  },
  {
    id: "shape-5",
    type: "sequence",
    x: 340,
    y: 240,
    width: 120,
    height: 180,
    stroke: "#111827",
    fill: "#f8fafc",
    strokeWidth: 1,
    dash: "8 6",
    fillOpacity: 1,
    fontSize: 12,
    cornerRadius: 8,
    rotation: 0,
    label: "Receiver",
  },
  {
    id: "shape-6",
    type: "right-triangle",
    x: 560,
    y: 260,
    width: 120,
    height: 90,
    stroke: "#0f766e",
    fill: "#ccfbf1",
    strokeWidth: 1,
    dash: "solid",
    fillOpacity: 1,
    fontSize: 12,
    cornerRadius: 0,
    rotation: 0,
    label: "直角三角形",
  },
  {
    id: "shape-7",
    type: "circle",
    x: 580,
    y: 80,
    width: 100,
    height: 100,
    stroke: "#7c2d12",
    fill: "#ffedd5",
    strokeWidth: 1,
    dash: "solid",
    fillOpacity: 1,
    fontSize: 12,
    cornerRadius: 0,
    rotation: 0,
    label: "圆",
  },
];

const DEFAULT_STYLE = {
  stroke: "#2563eb",
  fill: "#e0f2fe",
  strokeWidth: 1,
  dash: "solid",
  fillOpacity: 1,
  fontSize: 12,
  cornerRadius: 12,
};

const NAV_SECTIONS = [
  {
    title: "Diagram Sets",
    items: ["Component Interaction", "Calling Sequence", "Geometry"],
  },
  { title: "Workspace", items: ["Default Canvas", "Templates", "Exports"] },
];

const CREATE_LINKS = [
  { id: "create-component", label: "Create component diagram" },
  { id: "create-sequence", label: "Create sequence diagram" },
  { id: "create-geometry", label: "Create geometry diagram" },
];

const getShapeDefaults = (type) => {
  switch (type) {
    case "component":
      return {
        width: 180,
        height: 90,
        stroke: "#2f5bea",
        fill: "#e8efff",
        strokeWidth: 1,
        dash: "solid",
        fillOpacity: 1,
        fontSize: 12,
        cornerRadius: 10,
        rotation: 0,
        label: "",
      };
    case "sequence":
      return {
        width: 120,
        height: 180,
        stroke: "#111827",
        fill: "#f8fafc",
        strokeWidth: 1,
        dash: "8 6",
        fillOpacity: 1,
        fontSize: 12,
        cornerRadius: 8,
        rotation: 0,
        label: "",
      };
    case "arrow":
      return {
        width: 120,
        height: 0,
        stroke: "#111827",
        fill: "transparent",
        strokeWidth: 1,
        dash: "solid",
        fillOpacity: 1,
        fontSize: 12,
        cornerRadius: 0,
        rotation: 0,
        label: "",
      };
    case "right-triangle":
      return {
        width: 120,
        height: 90,
        stroke: "#0f766e",
        fill: "#ccfbf1",
        strokeWidth: 1,
        dash: "solid",
        fillOpacity: 1,
        fontSize: 12,
        cornerRadius: 0,
        rotation: 0,
        label: "",
      };
    case "triangle":
      return {
        width: 140,
        height: 110,
        stroke: "#0f766e",
        fill: "#ccfbf1",
        strokeWidth: 1,
        dash: "solid",
        fillOpacity: 1,
        fontSize: 12,
        cornerRadius: 0,
        rotation: 0,
        label: "",
      };
    case "circle":
      return {
        width: 110,
        height: 110,
        stroke: "#7c2d12",
        fill: "#ffedd5",
        strokeWidth: 1,
        dash: "solid",
        fillOpacity: 1,
        fontSize: 12,
        cornerRadius: 0,
        rotation: 0,
        label: "",
      };
    case "sphere":
      return {
        width: 120,
        height: 120,
        stroke: "#1d4ed8",
        fill: "#dbeafe",
        strokeWidth: 1,
        dash: "solid",
        fillOpacity: 1,
        fontSize: 12,
        cornerRadius: 0,
        rotation: 0,
        label: "",
      };
    case "cylinder":
      return {
        width: 140,
        height: 120,
        stroke: "#0f766e",
        fill: "#ccfbf1",
        strokeWidth: 1,
        dash: "solid",
        fillOpacity: 1,
        fontSize: 12,
        cornerRadius: 0,
        rotation: 0,
        label: "",
      };
    case "diamond":
      return {
        width: 130,
        height: 100,
        stroke: "#6d28d9",
        fill: "#ede9fe",
        strokeWidth: 1,
        dash: "solid",
        fillOpacity: 1,
        fontSize: 12,
        cornerRadius: 0,
        rotation: 0,
        label: "",
      };
    case "hexagon":
      return {
        width: 150,
        height: 90,
        stroke: "#b45309",
        fill: "#fef3c7",
        strokeWidth: 1,
        dash: "solid",
        fillOpacity: 1,
        fontSize: 12,
        cornerRadius: 0,
        rotation: 0,
        label: "",
      };
    case "parallelogram":
      return {
        width: 150,
        height: 90,
        stroke: "#0f766e",
        fill: "#ccfbf1",
        strokeWidth: 1,
        dash: "solid",
        fillOpacity: 1,
        fontSize: 12,
        cornerRadius: 0,
        rotation: 0,
        label: "",
      };
    case "trapezoid":
      return {
        width: 150,
        height: 90,
        stroke: "#b91c1c",
        fill: "#fee2e2",
        strokeWidth: 1,
        dash: "solid",
        fillOpacity: 1,
        fontSize: 12,
        cornerRadius: 0,
        rotation: 0,
        label: "",
      };
    case "isosceles-trapezoid":
      return {
        width: 150,
        height: 90,
        stroke: "#7c3aed",
        fill: "#ede9fe",
        strokeWidth: 1,
        dash: "solid",
        fillOpacity: 1,
        fontSize: 12,
        cornerRadius: 0,
        rotation: 0,
        label: "",
      };
    case "right-trapezoid":
      return {
        width: 150,
        height: 90,
        stroke: "#0f766e",
        fill: "#ccfbf1",
        strokeWidth: 1,
        dash: "solid",
        fillOpacity: 1,
        fontSize: 12,
        cornerRadius: 0,
        rotation: 0,
        label: "",
      };
    case "line":
      return {
        width: 140,
        height: 0,
        stroke: "#1f2933",
        fill: "transparent",
        strokeWidth: 1,
        dash: "solid",
        fillOpacity: 1,
        fontSize: 12,
        cornerRadius: 0,
        rotation: 0,
        label: "",
      };
    case "perp-line":
      return {
        width: 140,
        height: 90,
        stroke: "#1f2933",
        fill: "transparent",
        strokeWidth: 1,
        dash: "solid",
        fillOpacity: 1,
        fontSize: 12,
        cornerRadius: 0,
        rotation: 0,
        label: "",
      };
    case "rounded":
      return {
        width: 150,
        height: 90,
        stroke: DEFAULT_STYLE.stroke,
        fill: DEFAULT_STYLE.fill,
        strokeWidth: DEFAULT_STYLE.strokeWidth,
        dash: DEFAULT_STYLE.dash,
        fillOpacity: DEFAULT_STYLE.fillOpacity,
        fontSize: DEFAULT_STYLE.fontSize,
        cornerRadius: DEFAULT_STYLE.cornerRadius,
        rotation: 0,
        label: "",
      };
    case "rect":
    default:
      return {
        width: 150,
        height: 90,
        stroke: DEFAULT_STYLE.stroke,
        fill: DEFAULT_STYLE.fill,
        strokeWidth: DEFAULT_STYLE.strokeWidth,
        dash: DEFAULT_STYLE.dash,
        fillOpacity: DEFAULT_STYLE.fillOpacity,
        fontSize: DEFAULT_STYLE.fontSize,
        cornerRadius: DEFAULT_STYLE.cornerRadius,
        rotation: 0,
        label: "",
      };
  }
};

const renderShape = (shape, isSelected, isDragging, onSelect, onPointerDown) => {
  const rotation = shape.rotation ?? 0;
  const centerX = shape.x + shape.width / 2;
  const centerY = shape.y + shape.height / 2;
  const groupProps = rotation
    ? { transform: `rotate(${rotation} ${centerX} ${centerY})` }
    : {};
  const commonProps = {
    stroke: shape.stroke,
    fill: shape.fill,
    strokeWidth: isSelected ? shape.strokeWidth + 1 : shape.strokeWidth,
    strokeDasharray: shape.dash === "solid" ? "none" : shape.dash,
    fillOpacity: shape.fillOpacity,
    onClick: (event) => {
      event.stopPropagation();
      onSelect(shape.id);
    },
    onPointerDown: (event) => {
      event.stopPropagation();
      onPointerDown(event, shape);
    },
    className: ["shape", isSelected ? "selected" : null, isDragging ? "dragging" : null]
      .filter(Boolean)
      .join(" "),
  };

  switch (shape.type) {
    case "rounded":
      return (
        <g key={shape.id} {...groupProps}>
          <rect
            {...commonProps}
            x={shape.x}
            y={shape.y}
            width={shape.width}
            height={shape.height}
            rx={shape.cornerRadius}
          />
          <text
            x={shape.x + shape.width / 2}
            y={shape.y + shape.height / 2}
            style={{ fontSize: shape.fontSize }}
          >
            {shape.label}
          </text>
        </g>
      );
    case "circle":
      return (
        <g key={shape.id} {...groupProps}>
          <ellipse
            {...commonProps}
            cx={shape.x + shape.width / 2}
            cy={shape.y + shape.height / 2}
            rx={shape.width / 2}
            ry={shape.height / 2}
          />
          <text
            x={shape.x + shape.width / 2}
            y={shape.y + shape.height / 2}
            style={{ fontSize: shape.fontSize }}
          >
            {shape.label}
          </text>
        </g>
      );
    case "sphere":
      return (
        <g key={shape.id} {...groupProps}>
          <ellipse
            {...commonProps}
            cx={shape.x + shape.width / 2}
            cy={shape.y + shape.height / 2}
            rx={shape.width / 2}
            ry={shape.height / 2}
          />
          <ellipse
            cx={shape.x + shape.width * 0.35}
            cy={shape.y + shape.height * 0.35}
            rx={shape.width * 0.18}
            ry={shape.height * 0.12}
            fill="rgba(255,255,255,0.6)"
            stroke="none"
            pointerEvents="none"
          />
          <text
            x={shape.x + shape.width / 2}
            y={shape.y + shape.height / 2}
            style={{ fontSize: shape.fontSize }}
          >
            {shape.label}
          </text>
        </g>
      );
    case "cylinder": {
      const capHeight = Math.min(24, shape.height * 0.25);
      const bodyHeight = Math.max(0, shape.height - capHeight);
      const cx = shape.x + shape.width / 2;
      const topY = shape.y + capHeight / 2;
      const bottomY = shape.y + capHeight / 2 + bodyHeight;
      return (
        <g key={shape.id} {...groupProps}>
          <rect
            {...commonProps}
            x={shape.x}
            y={shape.y + capHeight / 2}
            width={shape.width}
            height={bodyHeight}
          />
          <ellipse
            {...commonProps}
            cx={cx}
            cy={topY}
            rx={shape.width / 2}
            ry={capHeight / 2}
          />
          <ellipse
            {...commonProps}
            cx={cx}
            cy={bottomY}
            rx={shape.width / 2}
            ry={capHeight / 2}
          />
          <text x={cx} y={shape.y + shape.height / 2} style={{ fontSize: shape.fontSize }}>
            {shape.label}
          </text>
        </g>
      );
    }
    case "diamond": {
      const centerX = shape.x + shape.width / 2;
      const centerY = shape.y + shape.height / 2;
      return (
        <g key={shape.id} {...groupProps}>
          <polygon
            {...commonProps}
            points={`${centerX},${shape.y} ${shape.x + shape.width},${centerY} ${centerX},${
              shape.y + shape.height
            } ${shape.x},${centerY}`}
          />
          <text x={centerX} y={centerY} style={{ fontSize: shape.fontSize }}>
            {shape.label}
          </text>
        </g>
      );
    }
    case "hexagon": {
      const inset = shape.width * 0.25;
      const rightInset = shape.width - inset;
      const midY = shape.y + shape.height / 2;
      return (
        <g key={shape.id} {...groupProps}>
          <polygon
            {...commonProps}
            points={`${shape.x + inset},${shape.y} ${shape.x + rightInset},${shape.y} ${
              shape.x + shape.width
            },${midY} ${shape.x + rightInset},${shape.y + shape.height} ${shape.x + inset},${
              shape.y + shape.height
            } ${shape.x},${midY}`}
          />
          <text
            x={shape.x + shape.width / 2}
            y={shape.y + shape.height / 2}
            style={{ fontSize: shape.fontSize }}
          >
            {shape.label}
          </text>
        </g>
      );
    }
    case "parallelogram": {
      const skew = Math.min(32, shape.width * 0.2);
      return (
        <g key={shape.id} {...groupProps}>
          <polygon
            {...commonProps}
            points={`${shape.x + skew},${shape.y} ${shape.x + shape.width},${shape.y} ${
              shape.x + shape.width - skew
            },${shape.y + shape.height} ${shape.x},${shape.y + shape.height}`}
          />
          <text
            x={shape.x + shape.width / 2}
            y={shape.y + shape.height / 2}
            style={{ fontSize: shape.fontSize }}
          >
            {shape.label}
          </text>
        </g>
      );
    }
    case "right-triangle":
      return (
        <g key={shape.id} {...groupProps}>
          <polygon
            {...commonProps}
            points={`${shape.x},${shape.y + shape.height} ${
              shape.x + shape.width
            },${shape.y + shape.height} ${shape.x},${shape.y}`}
          />
          <text
            x={shape.x + shape.width / 2}
            y={shape.y + shape.height / 2}
            style={{ fontSize: shape.fontSize }}
          >
            {shape.label}
          </text>
        </g>
      );
    case "triangle": {
      const points = (shape.points ?? [])
        .map((point) => `${point.x},${point.y}`)
        .join(" ");
      return (
        <g key={shape.id} {...groupProps}>
          <polygon {...commonProps} points={points} />
          <text
            x={shape.x + shape.width / 2}
            y={shape.y + shape.height / 2}
            style={{ fontSize: shape.fontSize }}
          >
            {shape.label}
          </text>
        </g>
      );
    }
    case "trapezoid": {
      const leftInset = Math.min(40, shape.width * 0.35);
      const rightInset = Math.min(20, shape.width * 0.15);
      return (
        <g key={shape.id} {...groupProps}>
          <polygon
            {...commonProps}
            points={`${shape.x + leftInset},${shape.y} ${shape.x + shape.width - rightInset},${
              shape.y
            } ${shape.x + shape.width},${shape.y + shape.height} ${shape.x},${
              shape.y + shape.height
            }`}
          />
          <text
            x={shape.x + shape.width / 2}
            y={shape.y + shape.height / 2}
            style={{ fontSize: shape.fontSize }}
          >
            {shape.label}
          </text>
        </g>
      );
    }
    case "isosceles-trapezoid": {
      const inset = Math.min(36, shape.width * 0.25);
      return (
        <g key={shape.id} {...groupProps}>
          <polygon
            {...commonProps}
            points={`${shape.x + inset},${shape.y} ${shape.x + shape.width - inset},${
              shape.y
            } ${shape.x + shape.width},${shape.y + shape.height} ${shape.x},${
              shape.y + shape.height
            }`}
          />
          <text
            x={shape.x + shape.width / 2}
            y={shape.y + shape.height / 2}
            style={{ fontSize: shape.fontSize }}
          >
            {shape.label}
          </text>
        </g>
      );
    }
    case "right-trapezoid": {
      const inset = Math.min(36, shape.width * 0.25);
      return (
        <g key={shape.id} {...groupProps}>
          <polygon
            {...commonProps}
            points={`${shape.x},${shape.y} ${shape.x + shape.width - inset},${shape.y} ${
              shape.x + shape.width
            },${shape.y + shape.height} ${shape.x},${shape.y + shape.height}`}
          />
          <text
            x={shape.x + shape.width / 2}
            y={shape.y + shape.height / 2}
            style={{ fontSize: shape.fontSize }}
          >
            {shape.label}
          </text>
        </g>
      );
    }
    case "arrow":
      return (
        <g key={shape.id} {...groupProps}>
          <line
            {...commonProps}
            x1={shape.x}
            y1={shape.y}
            x2={shape.x + shape.width}
            y2={shape.y}
            markerEnd="url(#arrow)"
          />
          <text
            x={shape.x + shape.width / 2}
            y={shape.y - 8}
            style={{ fontSize: shape.fontSize }}
          >
            {shape.label}
          </text>
        </g>
      );
    case "line":
      return (
        <g key={shape.id} {...groupProps}>
          <line
            {...commonProps}
            x1={shape.x}
            y1={shape.y}
            x2={shape.x + shape.width}
            y2={shape.y}
          />
          <text
            x={shape.x + shape.width / 2}
            y={shape.y - 8}
            style={{ fontSize: shape.fontSize }}
          >
            {shape.label}
          </text>
        </g>
      );
    case "perp-line":
      return (
        <g key={shape.id} {...groupProps}>
          <line
            {...commonProps}
            x1={shape.x}
            y1={shape.y + shape.height}
            x2={shape.x + shape.width}
            y2={shape.y + shape.height}
          />
          <line
            {...commonProps}
            x1={shape.x + shape.width / 2}
            y1={shape.y + shape.height}
            x2={shape.x + shape.width / 2}
            y2={shape.y}
          />
          <text
            x={shape.x + shape.width / 2}
            y={shape.y - 8}
            style={{ fontSize: shape.fontSize }}
          >
            {shape.label}
          </text>
        </g>
      );
    case "sequence":
      return (
        <g key={shape.id} {...groupProps}>
          <rect
            {...commonProps}
            x={shape.x}
            y={shape.y}
            width={shape.width}
            height={36}
            rx={shape.cornerRadius}
          />
          <line
            {...commonProps}
            x1={shape.x + shape.width / 2}
            y1={shape.y + 36}
            x2={shape.x + shape.width / 2}
            y2={shape.y + shape.height}
            strokeDasharray="6 6"
          />
          <text
            x={shape.x + shape.width / 2}
            y={shape.y + 24}
            style={{ fontSize: shape.fontSize }}
          >
            {shape.label}
          </text>
        </g>
      );
    case "component":
    case "rect":
    default:
      return (
        <g key={shape.id} {...groupProps}>
          <rect
            {...commonProps}
            x={shape.x}
            y={shape.y}
            width={shape.width}
            height={shape.height}
            rx={shape.cornerRadius}
          />
          <text
            x={shape.x + shape.width / 2}
            y={shape.y + shape.height / 2}
            style={{ fontSize: shape.fontSize }}
          >
            {shape.label}
          </text>
        </g>
      );
  }
};

const clampNumber = (value, min, max) => {
  const numberValue = Number(value);
  if (Number.isNaN(numberValue)) {
    return min;
  }
  return Math.min(Math.max(numberValue, min), max);
};

const TRIANGLE_MIN_ANGLE = 10;
const TRIANGLE_MAX_ANGLE = 170;
const TRIANGLE_ANGLE_SUM = 180;
const VERTEX_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const clampAngle = (value) =>
  clampNumber(value, TRIANGLE_MIN_ANGLE, TRIANGLE_MAX_ANGLE);

const normalizeTriangleAngles = (angles, changedIndex, lockedIndex) => {
  const safeAngles = [...angles].map(clampAngle);
  const lockIndex = lockedIndex ?? (changedIndex === 0 ? 1 : 0);
  const thirdIndex = [0, 1, 2].find(
    (index) => index !== changedIndex && index !== lockIndex
  );
  const lockedAngle = clampAngle(safeAngles[lockIndex]);
  let changedAngle = clampAngle(safeAngles[changedIndex]);
  let remaining = TRIANGLE_ANGLE_SUM - lockedAngle - changedAngle;
  if (remaining < TRIANGLE_MIN_ANGLE) {
    changedAngle = TRIANGLE_ANGLE_SUM - lockedAngle - TRIANGLE_MIN_ANGLE;
  } else if (remaining > TRIANGLE_MAX_ANGLE) {
    changedAngle = TRIANGLE_ANGLE_SUM - lockedAngle - TRIANGLE_MAX_ANGLE;
  }
  changedAngle = clampAngle(changedAngle);
  remaining = TRIANGLE_ANGLE_SUM - lockedAngle - changedAngle;
  return safeAngles.map((_, index) => {
    if (index === lockIndex) {
      return lockedAngle;
    }
    if (index === changedIndex) {
      return changedAngle;
    }
    return clampAngle(remaining);
  });
};

const getTriangleMetricsFromAngles = (baseLength, angles) => {
  const [angleA, angleB] = angles;
  const tanA = Math.tan((angleA * Math.PI) / 180);
  const tanB = Math.tan((angleB * Math.PI) / 180);
  const safeSum = tanA + tanB || 0.001;
  const apexX = (baseLength * tanB) / safeSum;
  const height = apexX * tanA;
  return {
    apexX,
    height: Math.max(height, 20),
  };
};

const buildTrianglePoints = ({ x, y, width }, angles) => {
  const normalizedAngles = normalizeTriangleAngles(angles, 0, 1);
  const { apexX, height } = getTriangleMetricsFromAngles(width, normalizedAngles);
  const baseY = y + height;
  return {
    points: [
      { x, y: baseY },
      { x: x + width, y: baseY },
      { x: x + apexX, y: baseY - height },
    ],
    height,
    angles: normalizedAngles,
  };
};

const getTriangleBounds = (points) => {
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
};

const getTriangleAnglesFromPoints = (points) => {
  if (points.length !== 3) {
    return [60, 60, 60];
  }
  const distance = (p1, p2) => Math.hypot(p1.x - p2.x, p1.y - p2.y);
  const [a, b, c] = points;
  const sideA = distance(b, c);
  const sideB = distance(a, c);
  const sideC = distance(a, b);
  const angleFromSides = (side1, side2, opposite) => {
    const cosValue = (side1 ** 2 + side2 ** 2 - opposite ** 2) / (2 * side1 * side2);
    const safeCos = clampNumber(cosValue, -1, 1);
    return (Math.acos(safeCos) * 180) / Math.PI;
  };
  const angleA = angleFromSides(sideB, sideC, sideA);
  const angleB = angleFromSides(sideA, sideC, sideB);
  const angleC = TRIANGLE_ANGLE_SUM - angleA - angleB;
  return [angleA, angleB, angleC];
};

const getShapeVertices = (shape) => {
  switch (shape.type) {
    case "triangle":
      return shape.points ?? [];
    case "right-triangle":
      return [
        { x: shape.x, y: shape.y + shape.height },
        { x: shape.x + shape.width, y: shape.y + shape.height },
        { x: shape.x, y: shape.y },
      ];
    case "diamond": {
      const centerX = shape.x + shape.width / 2;
      const centerY = shape.y + shape.height / 2;
      return [
        { x: centerX, y: shape.y },
        { x: shape.x + shape.width, y: centerY },
        { x: centerX, y: shape.y + shape.height },
        { x: shape.x, y: centerY },
      ];
    }
    case "hexagon": {
      const inset = shape.width * 0.25;
      const rightInset = shape.width - inset;
      const midY = shape.y + shape.height / 2;
      return [
        { x: shape.x + inset, y: shape.y },
        { x: shape.x + rightInset, y: shape.y },
        { x: shape.x + shape.width, y: midY },
        { x: shape.x + rightInset, y: shape.y + shape.height },
        { x: shape.x + inset, y: shape.y + shape.height },
        { x: shape.x, y: midY },
      ];
    }
    case "parallelogram": {
      const skew = Math.min(32, shape.width * 0.2);
      return [
        { x: shape.x + skew, y: shape.y },
        { x: shape.x + shape.width, y: shape.y },
        { x: shape.x + shape.width - skew, y: shape.y + shape.height },
        { x: shape.x, y: shape.y + shape.height },
      ];
    }
    case "trapezoid": {
      const leftInset = Math.min(40, shape.width * 0.35);
      const rightInset = Math.min(20, shape.width * 0.15);
      return [
        { x: shape.x + leftInset, y: shape.y },
        { x: shape.x + shape.width - rightInset, y: shape.y },
        { x: shape.x + shape.width, y: shape.y + shape.height },
        { x: shape.x, y: shape.y + shape.height },
      ];
    }
    case "isosceles-trapezoid": {
      const inset = Math.min(36, shape.width * 0.25);
      return [
        { x: shape.x + inset, y: shape.y },
        { x: shape.x + shape.width - inset, y: shape.y },
        { x: shape.x + shape.width, y: shape.y + shape.height },
        { x: shape.x, y: shape.y + shape.height },
      ];
    }
    case "right-trapezoid": {
      const inset = Math.min(36, shape.width * 0.25);
      return [
        { x: shape.x, y: shape.y },
        { x: shape.x + shape.width - inset, y: shape.y },
        { x: shape.x + shape.width, y: shape.y + shape.height },
        { x: shape.x, y: shape.y + shape.height },
      ];
    }
    case "line":
    case "arrow":
      return [
        { x: shape.x, y: shape.y },
        { x: shape.x + shape.width, y: shape.y },
      ];
    case "circle":
    case "sphere":
    case "cylinder":
      return [];
    default:
      return [
        { x: shape.x, y: shape.y },
        { x: shape.x + shape.width, y: shape.y },
        { x: shape.x + shape.width, y: shape.y + shape.height },
        { x: shape.x, y: shape.y + shape.height },
      ];
  }
};

const createVertexLabels = (shape) =>
  getShapeVertices(shape).map((vertex, index) => ({
    id: `${shape.id}-label-${index}`,
    text: VERTEX_LETTERS[index] ?? `P${index + 1}`,
    x: vertex.x + 10,
    y: vertex.y - 12,
  }));

const DiagramCanvas = ({
  shapes,
  selectedId,
  dragId,
  snapGuides,
  selectedShape,
  showGrid,
  onSelect,
  onPointerDown,
  onResizePointerDown,
  onRotatePointerDown,
  onVertexPointerDown,
  onLabelPointerDown,
  onPointerMove,
  onPointerUp,
}) => (
  <svg
    className="canvas"
    viewBox="0 0 1000 700"
    onClick={() => onSelect(null)}
    onPointerMove={onPointerMove}
    onPointerUp={onPointerUp}
    onPointerLeave={onPointerUp}
  >
    <defs>
      <pattern
        id="grid"
        width="32"
        height="32"
        patternUnits="userSpaceOnUse"
      >
        <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#e2e8f0" />
      </pattern>
      <marker
        id="arrow"
        markerWidth="12"
        markerHeight="12"
        refX="10"
        refY="6"
        orient="auto"
      >
        <path d="M0,0 L12,6 L0,12 z" fill="context-stroke" />
      </marker>
    </defs>
    <rect
      className="canvas-grid"
      x="0"
      y="0"
      width="1000"
      height="700"
      fill={showGrid ? "url(#grid)" : "#ffffff"}
      stroke={showGrid ? "#e2e8f0" : "none"}
    />
    {snapGuides.map((guide) =>
      guide.axis === "x" ? (
        <line
          key={`guide-x-${guide.value}`}
          className="snap-guide"
          x1={guide.value}
          y1="0"
          x2={guide.value}
          y2="700"
        />
      ) : (
        <line
          key={`guide-y-${guide.value}`}
          className="snap-guide"
          x1="0"
          y1={guide.value}
          x2="1000"
          y2={guide.value}
        />
      )
    )}
    {shapes.map((shape) =>
      renderShape(
        shape,
        shape.id === selectedId,
        shape.id === dragId,
        onSelect,
        onPointerDown
      )
    )}
    {shapes.flatMap((shape) =>
      (shape.vertexLabels ?? []).map((label) => (
        <g
          key={label.id}
          className="vertex-label"
          onPointerDown={(event) => onLabelPointerDown(event, shape, label.id)}
        >
          <rect
            className={`vertex-label-box${
              /[A-Za-z]/.test(label.text) ? " vertex-label-box--transparent" : ""
            }`}
            x={label.x - 12}
            y={label.y - 12}
            width="24"
            height="20"
            rx="6"
          />
          <text x={label.x} y={label.y - 2}>
            {label.text}
          </text>
        </g>
      ))
    )}
    {selectedShape ? (
      <g className="selection-layer">
        <rect
          className="selection-outline"
          x={selectedShape.x}
          y={selectedShape.y}
          width={selectedShape.width}
          height={selectedShape.height}
        />
        <line
          className="rotation-guide"
          x1={selectedShape.x + selectedShape.width / 2}
          y1={selectedShape.y}
          x2={selectedShape.x + selectedShape.width / 2}
          y2={selectedShape.y - 28}
        />
        <circle
          className="rotation-handle"
          cx={selectedShape.x + selectedShape.width / 2}
          cy={selectedShape.y - 28}
          r="6"
          onPointerDown={(event) => onRotatePointerDown(event, selectedShape)}
        />
        {[
          {
            id: "nw",
            x: selectedShape.x,
            y: selectedShape.y,
            cursor: "nwse-resize",
          },
          {
            id: "n",
            x: selectedShape.x + selectedShape.width / 2,
            y: selectedShape.y,
            cursor: "ns-resize",
          },
          {
            id: "ne",
            x: selectedShape.x + selectedShape.width,
            y: selectedShape.y,
            cursor: "nesw-resize",
          },
          {
            id: "e",
            x: selectedShape.x + selectedShape.width,
            y: selectedShape.y + selectedShape.height / 2,
            cursor: "ew-resize",
          },
          {
            id: "se",
            x: selectedShape.x + selectedShape.width,
            y: selectedShape.y + selectedShape.height,
            cursor: "nwse-resize",
          },
          {
            id: "s",
            x: selectedShape.x + selectedShape.width / 2,
            y: selectedShape.y + selectedShape.height,
            cursor: "ns-resize",
          },
          {
            id: "sw",
            x: selectedShape.x,
            y: selectedShape.y + selectedShape.height,
            cursor: "nesw-resize",
          },
          {
            id: "w",
            x: selectedShape.x,
            y: selectedShape.y + selectedShape.height / 2,
            cursor: "ew-resize",
          },
        ].map((handle) => (
          <rect
            key={handle.id}
            className="selection-handle"
            x={handle.x - 5}
            y={handle.y - 5}
            width="10"
            height="10"
            style={{ cursor: handle.cursor }}
            onPointerDown={(event) =>
              onResizePointerDown(event, selectedShape, handle.id)
            }
          />
        ))}
        {selectedShape.type === "triangle"
          ? (selectedShape.points ?? []).map((point, index) => (
              <circle
                key={`vertex-${index}`}
                className="vertex-handle"
                cx={point.x}
                cy={point.y}
                r="6"
                onPointerDown={(event) =>
                  onVertexPointerDown(event, selectedShape, index)
                }
              />
            ))
          : null}
      </g>
    ) : null}
  </svg>
);

const SNAP_DISTANCE = 12;
const SNAP_AXES = ["x", "y"];

const getShapeAnchors = (shape) => {
  const left = shape.x;
  const top = shape.y;
  const right = shape.x + shape.width;
  const bottom = shape.y + shape.height;
  const centerX = shape.x + shape.width / 2;
  const centerY = shape.y + shape.height / 2;
  const isLine = shape.type === "line" || shape.type === "arrow";

  return {
    x: isLine ? [left, right] : [left, centerX, right],
    y: isLine ? [top] : [top, centerY, bottom],
  };
};

const getSnapResult = (movingShape, shapes, nextX, nextY) => {
  const movingAnchors = getShapeAnchors({ ...movingShape, x: nextX, y: nextY });
  const bestMatch = {
    x: { delta: 0, distance: Infinity, guide: null },
    y: { delta: 0, distance: Infinity, guide: null },
  };

  shapes.forEach((shape) => {
    if (shape.id === movingShape.id) {
      return;
    }
    const targetAnchors = getShapeAnchors(shape);
    SNAP_AXES.forEach((axis) => {
      targetAnchors[axis].forEach((targetValue) => {
        movingAnchors[axis].forEach((anchorValue) => {
          const delta = targetValue - anchorValue;
          const distance = Math.abs(delta);
          if (distance <= SNAP_DISTANCE && distance < bestMatch[axis].distance) {
            bestMatch[axis] = {
              delta,
              distance,
              guide: { axis, value: targetValue },
            };
          }
        });
      });
    });
  });

  return {
    x: nextX + bestMatch.x.delta,
    y: nextY + bestMatch.y.delta,
    guides: [bestMatch.x.guide, bestMatch.y.guide].filter(Boolean),
  };
};

export default function App() {
  const [shapes, setShapes] = useState(INITIAL_SHAPES);
  const [selectedId, setSelectedId] = useState(shapes[0]?.id ?? null);
  const [snapGuides, setSnapGuides] = useState([]);
  const [showGrid, setShowGrid] = useState(true);
  const [triangleAngleDrafts, setTriangleAngleDrafts] = useState({});
  const dragState = useRef(null);
  const selectedShape = useMemo(
    () => shapes.find((shape) => shape.id === selectedId),
    [shapes, selectedId]
  );

  useEffect(() => {
    setTriangleAngleDrafts({});
  }, [selectedId]);

  const handleAddShape = (type) => {
    const nextIndex = shapes.length + 1;
    const defaults = getShapeDefaults(type);
    const baseX = 120 + (nextIndex % 5) * 160;
    const baseY = 120 + Math.floor(nextIndex / 5) * 120;
    let newShape = {
      id: `shape-${nextIndex}`,
      type,
      x: baseX,
      y: baseY,
      ...defaults,
    };
    if (type === "triangle") {
      const initialAngles = [50, 60, 70];
      const { points, height, angles } = buildTrianglePoints(
        { x: baseX, y: baseY, width: defaults.width },
        initialAngles
      );
      newShape = {
        ...newShape,
        height,
        points,
        angles,
      };
    }
    setShapes((prev) => [...prev, newShape]);
    setSelectedId(newShape.id);
  };

  const updateShape = (field, value) => {
    if (!selectedShape) {
      return;
    }
    setShapes((prev) =>
      prev.map((shape) =>
        shape.id === selectedShape.id
          ? (() => {
              if (shape.type === "triangle" && shape.points) {
                if (field === "x" || field === "y") {
                  const delta = value - shape[field];
                  const movedPoints = shape.points.map((point) => ({
                    x: field === "x" ? point.x + delta : point.x,
                    y: field === "y" ? point.y + delta : point.y,
                  }));
                  const movedLabels = shape.vertexLabels
                    ? shape.vertexLabels.map((label) => ({
                        ...label,
                        x: field === "x" ? label.x + delta : label.x,
                        y: field === "y" ? label.y + delta : label.y,
                      }))
                    : shape.vertexLabels;
                  return {
                    ...shape,
                    [field]: value,
                    points: movedPoints,
                    vertexLabels: movedLabels,
                  };
                }
                if (field === "width" || field === "height") {
                  const nextWidth = field === "width" ? value : shape.width;
                  const nextHeight = field === "height" ? value : shape.height;
                  const scaleX = shape.width ? nextWidth / shape.width : 1;
                  const scaleY = shape.height ? nextHeight / shape.height : 1;
                  const nextPoints = shape.points.map((point) => ({
                    x: shape.x + (point.x - shape.x) * scaleX,
                    y: shape.y + (point.y - shape.y) * scaleY,
                  }));
                  const nextLabels = shape.vertexLabels
                    ? shape.vertexLabels.map((label) => ({
                        ...label,
                        x: shape.x + (label.x - shape.x) * scaleX,
                        y: shape.y + (label.y - shape.y) * scaleY,
                      }))
                    : shape.vertexLabels;
                  return {
                    ...shape,
                    width: nextWidth,
                    height: nextHeight,
                    points: nextPoints,
                    angles: getTriangleAnglesFromPoints(nextPoints),
                    vertexLabels: nextLabels,
                  };
                }
              }
              return {
                ...shape,
                [field]: value,
              };
            })()
          : shape
      )
    );
  };

  const updateNumericField = (field, value, min, max) => {
    updateShape(field, clampNumber(value, min, max));
  };

  const updateTriangleAngle = (index, value) => {
    if (!selectedShape || selectedShape.type !== "triangle") {
      return;
    }
    const currentAngles = selectedShape.angles ?? [60, 60, 60];
    const nextAngles = [...currentAngles];
    nextAngles[index] = clampAngle(value);
    const normalizedAngles = normalizeTriangleAngles(nextAngles, index);
    const baseWidth = selectedShape.width;
    const baseY = selectedShape.y + selectedShape.height;
    const { apexX, height } = getTriangleMetricsFromAngles(baseWidth, normalizedAngles);
    const nextPoints = [
      { x: selectedShape.x, y: baseY },
      { x: selectedShape.x + baseWidth, y: baseY },
      { x: selectedShape.x + apexX, y: baseY - height },
    ];
    setShapes((prev) =>
      prev.map((shape) =>
        shape.id === selectedShape.id
          ? {
              ...shape,
              points: nextPoints,
              angles: normalizedAngles,
              height,
              y: baseY - height,
            }
          : shape
      )
    );
  };

  const handleAddVertexLabels = () => {
    if (!selectedShape) {
      return;
    }
    const labels = createVertexLabels(selectedShape);
    setShapes((prev) =>
      prev.map((shape) =>
        shape.id === selectedShape.id
          ? {
              ...shape,
              vertexLabels: labels,
            }
          : shape
      )
    );
  };

  const updateVertexLabel = (labelId, text) => {
    if (!selectedShape) {
      return;
    }
    setShapes((prev) =>
      prev.map((shape) =>
        shape.id === selectedShape.id
          ? {
              ...shape,
              vertexLabels: (shape.vertexLabels ?? []).map((label) =>
                label.id === labelId ? { ...label, text } : label
              ),
            }
          : shape
      )
    );
  };

  const getPointerPosition = (event) => {
    const svg = event.currentTarget.ownerSVGElement ?? event.currentTarget;
    if (!svg) {
      return { x: 0, y: 0 };
    }
    const rect = svg.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const handlePointerDown = (event, shape) => {
    const { x, y } = getPointerPosition(event);
    dragState.current = {
      id: shape.id,
      mode: "move",
      offsetX: x - shape.x,
      offsetY: y - shape.y,
    };
    setSelectedId(shape.id);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handleResizePointerDown = (event, shape, handle) => {
    const { x, y } = getPointerPosition(event);
    dragState.current = {
      id: shape.id,
      mode: "resize",
      handle,
      originX: x,
      originY: y,
      startX: shape.x,
      startY: shape.y,
      startWidth: shape.width,
      startHeight: shape.height,
      startPoints: shape.points ? [...shape.points] : null,
      startLabels: shape.vertexLabels ? [...shape.vertexLabels] : null,
    };
    setSelectedId(shape.id);
    event.stopPropagation();
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handleRotatePointerDown = (event, shape) => {
    const { x, y } = getPointerPosition(event);
    const centerX = shape.x + shape.width / 2;
    const centerY = shape.y + shape.height / 2;
    const startPointerAngle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
    dragState.current = {
      id: shape.id,
      mode: "rotate",
      centerX,
      centerY,
      startPointerAngle,
      startAngle: shape.rotation ?? 0,
    };
    setSelectedId(shape.id);
    event.stopPropagation();
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handleVertexPointerDown = (event, shape, vertexIndex) => {
    dragState.current = {
      id: shape.id,
      mode: "vertex",
      vertexIndex,
    };
    setSelectedId(shape.id);
    event.stopPropagation();
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handleLabelPointerDown = (event, shape, labelId) => {
    const { x, y } = getPointerPosition(event);
    const label = (shape.vertexLabels ?? []).find((item) => item.id === labelId);
    if (!label) {
      return;
    }
    dragState.current = {
      id: shape.id,
      mode: "label",
      labelId,
      offsetX: x - label.x,
      offsetY: y - label.y,
    };
    setSelectedId(shape.id);
    event.stopPropagation();
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragState.current) {
      return;
    }
    const drag = dragState.current;
    const { x, y } = getPointerPosition(event);
    setShapes((prev) =>
      prev.map((shape) => {
        if (shape.id !== drag.id) {
          return shape;
        }
        if (drag.mode === "vertex" && shape.type === "triangle") {
          const nextPoints = (shape.points ?? []).map((point, index) =>
            index === drag.vertexIndex
              ? {
                  x: clampNumber(x, 0, 1000),
                  y: clampNumber(y, 0, 700),
                }
              : point
          );
          const bounds = getTriangleBounds(nextPoints);
          return {
            ...shape,
            ...bounds,
            points: nextPoints,
            angles: getTriangleAnglesFromPoints(nextPoints),
          };
        }
        if (drag.mode === "label") {
          return {
            ...shape,
            vertexLabels: (shape.vertexLabels ?? []).map((label) =>
              label.id === drag.labelId
                ? {
                    ...label,
                    x: clampNumber(x - drag.offsetX, 0, 1000),
                    y: clampNumber(y - drag.offsetY, 0, 700),
                  }
                : label
            ),
          };
        }
        if (drag.mode === "resize") {
          const dx = x - drag.originX;
          const dy = y - drag.originY;
          const minWidth = 20;
          const minHeight = ["line", "arrow"].includes(shape.type) ? 0 : 20;
          const maxWidth = 400;
          const maxHeight = 300;
          let nextWidth = drag.startWidth;
          let nextHeight = drag.startHeight;
          let nextX = drag.startX;
          let nextY = drag.startY;
          if (drag.handle.includes("e")) {
            nextWidth = clampNumber(drag.startWidth + dx, minWidth, maxWidth);
          }
          if (drag.handle.includes("s")) {
            nextHeight = clampNumber(drag.startHeight + dy, minHeight, maxHeight);
          }
          if (drag.handle.includes("w")) {
            nextWidth = clampNumber(drag.startWidth - dx, minWidth, maxWidth);
            nextX = drag.startX + (drag.startWidth - nextWidth);
          }
          if (drag.handle.includes("n")) {
            nextHeight = clampNumber(drag.startHeight - dy, minHeight, maxHeight);
            nextY = drag.startY + (drag.startHeight - nextHeight);
          }
          setSnapGuides([]);
          const clampedX = clampNumber(nextX, 0, 1000 - nextWidth);
          const clampedY = clampNumber(nextY, 0, 700 - nextHeight);
          const scaleX = drag.startWidth ? nextWidth / drag.startWidth : 1;
          const scaleY = drag.startHeight ? nextHeight / drag.startHeight : 1;
          const nextLabels = drag.startLabels
            ? drag.startLabels.map((label) => ({
                ...label,
                x: clampedX + (label.x - drag.startX) * scaleX,
                y: clampedY + (label.y - drag.startY) * scaleY,
              }))
            : shape.vertexLabels;
          if (shape.type === "triangle" && drag.startPoints) {
            const nextPoints = drag.startPoints.map((point) => ({
              x: clampedX + (point.x - drag.startX) * scaleX,
              y: clampedY + (point.y - drag.startY) * scaleY,
            }));
            return {
              ...shape,
              x: clampedX,
              y: clampedY,
              width: nextWidth,
              height: nextHeight,
              points: nextPoints,
              angles: getTriangleAnglesFromPoints(nextPoints),
              vertexLabels: nextLabels,
            };
          }
          return {
            ...shape,
            x: clampedX,
            y: clampedY,
            width: nextWidth,
            height: nextHeight,
            vertexLabels: nextLabels,
          };
        }
        if (drag.mode === "rotate") {
          const angle = Math.atan2(y - drag.centerY, x - drag.centerX) * (180 / Math.PI);
          const nextRotation = drag.startAngle + (angle - drag.startPointerAngle);
          const normalizedRotation =
            ((((nextRotation + 180) % 360) + 360) % 360) - 180;
          setSnapGuides([]);
          return {
            ...shape,
            rotation: Math.round(normalizedRotation),
          };
        }
        const nextX = x - drag.offsetX;
        const nextY = y - drag.offsetY;
        const maxX = 1000 - shape.width;
        const maxY = 700 - shape.height;
        const { x: snappedX, y: snappedY, guides } = getSnapResult(
          shape,
          prev,
          clampNumber(nextX, 0, maxX),
          clampNumber(nextY, 0, maxY)
        );
        setSnapGuides(guides);
        const deltaX = snappedX - shape.x;
        const deltaY = snappedY - shape.y;
        const movedLabels = shape.vertexLabels
          ? shape.vertexLabels.map((label) => ({
              ...label,
              x: label.x + deltaX,
              y: label.y + deltaY,
            }))
          : shape.vertexLabels;
        if (shape.type === "triangle" && shape.points) {
          const movedPoints = shape.points.map((point) => ({
            x: point.x + deltaX,
            y: point.y + deltaY,
          }));
          return {
            ...shape,
            x: snappedX,
            y: snappedY,
            points: movedPoints,
            vertexLabels: movedLabels,
          };
        }
        return {
          ...shape,
          x: snappedX,
          y: snappedY,
          vertexLabels: movedLabels,
        };
      })
    );
  };

  const handlePointerUp = () => {
    dragState.current = null;
    setSnapGuides([]);
  };

  const dashedOptions = [
    { id: "solid", label: "Solid", value: "solid" },
    { id: "dashed", label: "Dashed", value: "8 6" },
    { id: "dotted", label: "Dotted", value: "2 6" },
  ];

  const supportsCornerRadius = ["component", "rect", "rounded", "sequence"].includes(selectedShape?.type);
  const supportsFill = selectedShape?.fill !== "transparent";
  const vertexCandidates = selectedShape ? getShapeVertices(selectedShape) : [];
  const hasVertices = vertexCandidates.length >= 2;
  const triangleAngles =
    selectedShape?.type === "triangle"
      ? selectedShape.angles ?? getTriangleAnglesFromPoints(selectedShape.points ?? [])
      : null;

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <h1>Idex Diagram Studio</h1>
          <p>Quickly sketch component interaction, sequence, and geometry diagrams.</p>
        </div>
        <div className="toolbar">
          {TOOL_ITEMS.map((tool) => (
            <button
              type="button"
              key={tool.id}
              onClick={() => handleAddShape(tool.id)}
              aria-label={tool.label}
              title={tool.label}
            >
              <span className="tool-icon" aria-hidden="true">
                {tool.icon}
              </span>
              <span className="sr-only">{tool.label}</span>
            </button>
          ))}
        </div>
      </header>

      <div className="workspace">
        <aside className="panel nav">
          <h2>Navigation</h2>
          <div className="nav-group">
            <h3>Create diagram</h3>
            <ul className="nav-links">
              {CREATE_LINKS.map((link) => (
                <li key={link.id}>
                  <a href="#" onClick={(event) => event.preventDefault()}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {NAV_SECTIONS.map((section) => (
            <div className="nav-group" key={section.title}>
              <h3>{section.title}</h3>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        <main className="canvas-wrapper">
          <div className="canvas-header">
            <span>Default Workspace</span>
            <div className="canvas-controls">
              <label className="grid-toggle">
                <input
                  type="checkbox"
                  checked={showGrid}
                  onChange={(event) => setShowGrid(event.target.checked)}
                />
                <span>Grid</span>
              </label>
              <span className="status">Auto-save enabled</span>
            </div>
          </div>
          <DiagramCanvas
            shapes={shapes}
            selectedId={selectedId}
            dragId={dragState.current?.id}
            snapGuides={snapGuides}
            selectedShape={selectedShape}
            showGrid={showGrid}
            onSelect={setSelectedId}
            onPointerDown={handlePointerDown}
            onResizePointerDown={handleResizePointerDown}
            onRotatePointerDown={handleRotatePointerDown}
            onVertexPointerDown={handleVertexPointerDown}
            onLabelPointerDown={handleLabelPointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          />
        </main>

        <aside className="panel inspector">
          <h2>Properties</h2>
          {selectedShape ? (
            <div className="properties">
              <div className="property-row">
                <label htmlFor="shape-label">Label</label>
                <input
                  id="shape-label"
                  value={selectedShape.label}
                  onChange={(event) => updateShape("label", event.target.value)}
                />
              </div>
              <div className="property-row">
                <label htmlFor="shape-stroke">Stroke</label>
                <input
                  id="shape-stroke"
                  type="color"
                  value={selectedShape.stroke}
                  onChange={(event) => updateShape("stroke", event.target.value)}
                />
              </div>
              <div className="property-row">
                <label htmlFor="shape-fill">Fill</label>
                <input
                  id="shape-fill"
                  type="color"
                  value={selectedShape.fill}
                  onChange={(event) => updateShape("fill", event.target.value)}
                />
              </div>
              <div className="property-row split">
                <div>
                  <label htmlFor="shape-width">Width</label>
                  <input
                    id="shape-width"
                    type="number"
                    min="20"
                    max="400"
                    value={selectedShape.width}
                    onChange={(event) =>
                      updateNumericField("width", event.target.value, 20, 400)
                    }
                  />
                </div>
                <div>
                  <label htmlFor="shape-height">Height</label>
                  <input
                    id="shape-height"
                    type="number"
                    min="0"
                    max="300"
                    value={selectedShape.height}
                    onChange={(event) =>
                      updateNumericField("height", event.target.value, 0, 300)
                    }
                  />
                </div>
              </div>
              <div className="property-row split">
                <div>
                  <label htmlFor="shape-stroke-width">Stroke width</label>
                  <input
                    id="shape-stroke-width"
                    type="number"
                    min="1"
                    max="8"
                    value={selectedShape.strokeWidth}
                    onChange={(event) =>
                      updateNumericField("strokeWidth", event.target.value, 1, 8)
                    }
                  />
                </div>
                <div>
                  <label htmlFor="shape-font-size">Font size</label>
                  <input
                    id="shape-font-size"
                    type="number"
                    min="10"
                    max="24"
                    value={selectedShape.fontSize}
                    onChange={(event) =>
                      updateNumericField("fontSize", event.target.value, 10, 24)
                    }
                  />
                </div>
              </div>
              <div className="property-row split">
                <div>
                  <label htmlFor="shape-dash">Stroke style</label>
                  <select
                    id="shape-dash"
                    value={selectedShape.dash}
                    onChange={(event) => updateShape("dash", event.target.value)}
                  >
                    {dashedOptions.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="shape-opacity">Fill opacity</label>
                  <input
                    id="shape-opacity"
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={selectedShape.fillOpacity}
                    onChange={(event) =>
                      updateNumericField("fillOpacity", event.target.value, 0.1, 1)
                    }
                    disabled={!supportsFill}
                  />
                </div>
              </div>
              {supportsCornerRadius ? (
                <div className="property-row">
                  <label htmlFor="shape-radius">Corner radius</label>
                  <input
                    id="shape-radius"
                    type="number"
                    min="0"
                    max="40"
                    value={selectedShape.cornerRadius}
                    onChange={(event) =>
                      updateNumericField("cornerRadius", event.target.value, 0, 40)
                    }
                  />
                </div>
              ) : null}
              <div className="property-row split">
                <div>
                  <label htmlFor="shape-x">X</label>
                  <input
                    id="shape-x"
                    type="number"
                    min="0"
                    max="900"
                    value={selectedShape.x}
                    onChange={(event) =>
                      updateNumericField("x", event.target.value, 0, 900)
                    }
                  />
                </div>
                <div>
                  <label htmlFor="shape-y">Y</label>
                  <input
                    id="shape-y"
                    type="number"
                    min="0"
                    max="600"
                    value={selectedShape.y}
                    onChange={(event) =>
                      updateNumericField("y", event.target.value, 0, 600)
                    }
                  />
                </div>
              </div>
              <div className="property-row">
                <label htmlFor="shape-rotation">Rotation</label>
                <input
                  id="shape-rotation"
                  type="number"
                  min="-180"
                  max="180"
                  value={selectedShape.rotation ?? 0}
                  onChange={(event) =>
                    updateNumericField("rotation", event.target.value, -180, 180)
                  }
                />
              </div>
              {selectedShape.type === "triangle" && triangleAngles ? (
                <div className="property-row">
                  <span className="property-label">Triangle angles</span>
                  <div className="angle-grid">
                    {triangleAngles.map((angle, index) => {
                      const draftValue = triangleAngleDrafts[index];
                      return (
                        <div key={`angle-${index}`}>
                          <label htmlFor={`triangle-angle-${index}`}>
                            {`Angle ${VERTEX_LETTERS[index]}`}
                          </label>
                          <input
                            id={`triangle-angle-${index}`}
                            type="number"
                            min={TRIANGLE_MIN_ANGLE}
                            max={TRIANGLE_MAX_ANGLE}
                            value={draftValue ?? Math.round(angle)}
                            onChange={(event) => {
                              const nextValue = event.target.value;
                              setTriangleAngleDrafts((prev) => ({
                                ...prev,
                                [index]: nextValue,
                              }));
                              if (nextValue === "") {
                                return;
                              }
                              const numericValue = Number(nextValue);
                              if (!Number.isNaN(numericValue)) {
                                updateTriangleAngle(index, numericValue);
                              }
                            }}
                            onBlur={() => {
                              const draft = triangleAngleDrafts[index];
                              if (draft === undefined) {
                                return;
                              }
                              if (draft !== "") {
                                updateTriangleAngle(index, draft);
                              }
                              setTriangleAngleDrafts((prev) => {
                                const nextDrafts = { ...prev };
                                delete nextDrafts[index];
                                return nextDrafts;
                              });
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
              {hasVertices ? (
                <div className="property-row">
                  <div className="vertex-label-row">
                    <span>Vertex labels</span>
                    <button type="button" onClick={handleAddVertexLabels}>
                      Auto label
                    </button>
                  </div>
                  {(selectedShape.vertexLabels ?? []).length > 0 ? (
                    <div className="vertex-label-inputs">
                      {(selectedShape.vertexLabels ?? []).map((label, index) => (
                        <div key={label.id}>
                          <label htmlFor={`vertex-label-${label.id}`}>
                            {`Label ${index + 1}`}
                          </label>
                          <input
                            id={`vertex-label-${label.id}`}
                            value={label.text}
                            onChange={(event) =>
                              updateVertexLabel(label.id, event.target.value)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="helper-text">Create draggable labels for each vertex.</p>
                  )}
                </div>
              ) : null}
            </div>
          ) : (
            <p>Select a shape to customize it.</p>
          )}
          <div className="inspector-footer">
            <h3>Tips</h3>
            <ul>
              <li>Use the toolbar to add components, sequence lifelines, and geometry.</li>
              <li>Click any shape on the canvas to edit its colors and sizing.</li>
              <li>Drag shapes close to each other to snap edges or line endpoints.</li>
              <li>Layer diagrams to express system interaction clearly.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
