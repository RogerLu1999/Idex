import { useMemo, useRef, useState } from "react";

const TOOL_ITEMS = [
  { id: "component", label: "Component Box" },
  { id: "arrow", label: "Arrow" },
  { id: "sequence", label: "Sequence Lifeline" },
  { id: "rect", label: "Rectangle" },
  { id: "rounded", label: "Rounded Rect" },
  { id: "circle", label: "Circle" },
  { id: "diamond", label: "Diamond" },
  { id: "hexagon", label: "Hexagon" },
  { id: "parallelogram", label: "Parallelogram" },
  { id: "right-triangle", label: "Right Triangle" },
  { id: "line", label: "Line" },
  { id: "perp-line", label: "Perpendicular" },
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
    strokeWidth: 2,
    dash: "solid",
    fillOpacity: 1,
    fontSize: 12,
    cornerRadius: 10,
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
    strokeWidth: 2,
    dash: "solid",
    fillOpacity: 1,
    fontSize: 12,
    cornerRadius: 10,
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
    strokeWidth: 2,
    dash: "solid",
    fillOpacity: 1,
    fontSize: 12,
    cornerRadius: 0,
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
    strokeWidth: 2,
    dash: "8 6",
    fillOpacity: 1,
    fontSize: 12,
    cornerRadius: 8,
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
    strokeWidth: 2,
    dash: "8 6",
    fillOpacity: 1,
    fontSize: 12,
    cornerRadius: 8,
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
    strokeWidth: 2,
    dash: "solid",
    fillOpacity: 1,
    fontSize: 12,
    cornerRadius: 0,
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
    strokeWidth: 2,
    dash: "solid",
    fillOpacity: 1,
    fontSize: 12,
    cornerRadius: 0,
    label: "圆",
  },
];

const DEFAULT_STYLE = {
  stroke: "#2563eb",
  fill: "#e0f2fe",
  strokeWidth: 2,
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
        strokeWidth: 2,
        dash: "solid",
        fillOpacity: 1,
        fontSize: 12,
        cornerRadius: 10,
        label: "New Component",
      };
    case "sequence":
      return {
        width: 120,
        height: 180,
        stroke: "#111827",
        fill: "#f8fafc",
        strokeWidth: 2,
        dash: "8 6",
        fillOpacity: 1,
        fontSize: 12,
        cornerRadius: 8,
        label: "Lifeline",
      };
    case "arrow":
      return {
        width: 120,
        height: 0,
        stroke: "#111827",
        fill: "transparent",
        strokeWidth: 2,
        dash: "solid",
        fillOpacity: 1,
        fontSize: 12,
        cornerRadius: 0,
        label: "call",
      };
    case "right-triangle":
      return {
        width: 120,
        height: 90,
        stroke: "#0f766e",
        fill: "#ccfbf1",
        strokeWidth: 2,
        dash: "solid",
        fillOpacity: 1,
        fontSize: 12,
        cornerRadius: 0,
        label: "直角三角形",
      };
    case "circle":
      return {
        width: 110,
        height: 110,
        stroke: "#7c2d12",
        fill: "#ffedd5",
        strokeWidth: 2,
        dash: "solid",
        fillOpacity: 1,
        fontSize: 12,
        cornerRadius: 0,
        label: "圆",
      };
    case "diamond":
      return {
        width: 130,
        height: 100,
        stroke: "#6d28d9",
        fill: "#ede9fe",
        strokeWidth: 2,
        dash: "solid",
        fillOpacity: 1,
        fontSize: 12,
        cornerRadius: 0,
        label: "Diamond",
      };
    case "hexagon":
      return {
        width: 150,
        height: 90,
        stroke: "#b45309",
        fill: "#fef3c7",
        strokeWidth: 2,
        dash: "solid",
        fillOpacity: 1,
        fontSize: 12,
        cornerRadius: 0,
        label: "Hexagon",
      };
    case "parallelogram":
      return {
        width: 150,
        height: 90,
        stroke: "#0f766e",
        fill: "#ccfbf1",
        strokeWidth: 2,
        dash: "solid",
        fillOpacity: 1,
        fontSize: 12,
        cornerRadius: 0,
        label: "Parallelogram",
      };
    case "line":
      return {
        width: 140,
        height: 0,
        stroke: "#1f2933",
        fill: "transparent",
        strokeWidth: 2,
        dash: "solid",
        fillOpacity: 1,
        fontSize: 12,
        cornerRadius: 0,
        label: "线段",
      };
    case "perp-line":
      return {
        width: 140,
        height: 90,
        stroke: "#1f2933",
        fill: "transparent",
        strokeWidth: 2,
        dash: "solid",
        fillOpacity: 1,
        fontSize: 12,
        cornerRadius: 0,
        label: "垂线",
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
        label: "Rounded",
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
        label: "Rectangle",
      };
  }
};

const renderShape = (shape, isSelected, isDragging, onSelect, onPointerDown) => {
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
        <g key={shape.id}>
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
        <g key={shape.id}>
          <circle
            {...commonProps}
            cx={shape.x + shape.width / 2}
            cy={shape.y + shape.height / 2}
            r={shape.width / 2}
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
    case "diamond": {
      const centerX = shape.x + shape.width / 2;
      const centerY = shape.y + shape.height / 2;
      return (
        <g key={shape.id}>
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
        <g key={shape.id}>
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
        <g key={shape.id}>
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
        <g key={shape.id}>
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
    case "arrow":
      return (
        <g key={shape.id}>
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
        <g key={shape.id}>
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
        <g key={shape.id}>
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
        <g key={shape.id}>
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
        <g key={shape.id}>
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

const DiagramCanvas = ({
  shapes,
  selectedId,
  dragId,
  snapGuides,
  onSelect,
  onPointerDown,
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
    <rect className="canvas-grid" x="0" y="0" width="1000" height="700" />
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
  const dragState = useRef(null);
  const selectedShape = useMemo(
    () => shapes.find((shape) => shape.id === selectedId),
    [shapes, selectedId]
  );

  const handleAddShape = (type) => {
    const nextIndex = shapes.length + 1;
    const defaults = getShapeDefaults(type);
    const newShape = {
      id: `shape-${nextIndex}`,
      type,
      x: 120 + (nextIndex % 5) * 160,
      y: 120 + Math.floor(nextIndex / 5) * 120,
      ...defaults,
    };
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
          ? {
              ...shape,
              [field]: value,
            }
          : shape
      )
    );
  };

  const updateNumericField = (field, value, min, max) => {
    updateShape(field, clampNumber(value, min, max));
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
      offsetX: x - shape.x,
      offsetY: y - shape.y,
    };
    setSelectedId(shape.id);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragState.current) {
      return;
    }
    const { x, y } = getPointerPosition(event);
    setShapes((prev) =>
      prev.map((shape) => {
        if (shape.id !== dragState.current?.id) {
          return shape;
        }
        const nextX = x - dragState.current.offsetX;
        const nextY = y - dragState.current.offsetY;
        const maxX = 1000 - shape.width;
        const maxY = 700 - shape.height;
        const { x: snappedX, y: snappedY, guides } = getSnapResult(
          shape,
          prev,
          clampNumber(nextX, 0, maxX),
          clampNumber(nextY, 0, maxY)
        );
        setSnapGuides(guides);
        return {
          ...shape,
          x: snappedX,
          y: snappedY,
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
            >
              {tool.label}
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
            <span className="status">Auto-save enabled</span>
          </div>
          <DiagramCanvas
            shapes={shapes}
            selectedId={selectedId}
            dragId={dragState.current?.id}
            snapGuides={snapGuides}
            onSelect={setSelectedId}
            onPointerDown={handlePointerDown}
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
