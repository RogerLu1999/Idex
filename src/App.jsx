import { useMemo, useState } from "react";

const TOOL_ITEMS = [
  { id: "component", label: "Component Box" },
  { id: "arrow", label: "Arrow" },
  { id: "sequence", label: "Sequence Lifeline" },
  { id: "rect", label: "Rectangle" },
  { id: "rounded", label: "Rounded Rect" },
  { id: "circle", label: "Circle" },
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
    label: "圆",
  },
];

const DEFAULT_STYLE = {
  stroke: "#2563eb",
  fill: "#e0f2fe",
};

const NAV_SECTIONS = [
  {
    title: "Diagram Sets",
    items: ["Component Interaction", "Calling Sequence", "Geometry"],
  },
  { title: "Workspace", items: ["Default Canvas", "Templates", "Exports"] },
];

const getShapeDefaults = (type) => {
  switch (type) {
    case "component":
      return {
        width: 180,
        height: 90,
        stroke: "#2f5bea",
        fill: "#e8efff",
        label: "New Component",
      };
    case "sequence":
      return {
        width: 120,
        height: 180,
        stroke: "#111827",
        fill: "#f8fafc",
        label: "Lifeline",
      };
    case "arrow":
      return {
        width: 120,
        height: 0,
        stroke: "#111827",
        fill: "transparent",
        label: "call",
      };
    case "right-triangle":
      return {
        width: 120,
        height: 90,
        stroke: "#0f766e",
        fill: "#ccfbf1",
        label: "直角三角形",
      };
    case "circle":
      return {
        width: 110,
        height: 110,
        stroke: "#7c2d12",
        fill: "#ffedd5",
        label: "圆",
      };
    case "line":
      return {
        width: 140,
        height: 0,
        stroke: "#1f2933",
        fill: "transparent",
        label: "线段",
      };
    case "perp-line":
      return {
        width: 140,
        height: 90,
        stroke: "#1f2933",
        fill: "transparent",
        label: "垂线",
      };
    case "rounded":
      return {
        width: 150,
        height: 90,
        stroke: DEFAULT_STYLE.stroke,
        fill: DEFAULT_STYLE.fill,
        label: "Rounded",
      };
    case "rect":
    default:
      return {
        width: 150,
        height: 90,
        stroke: DEFAULT_STYLE.stroke,
        fill: DEFAULT_STYLE.fill,
        label: "Rectangle",
      };
  }
};

const renderShape = (shape, isSelected, onSelect) => {
  const commonProps = {
    stroke: shape.stroke,
    fill: shape.fill,
    strokeWidth: isSelected ? 3 : 2,
    onClick: (event) => {
      event.stopPropagation();
      onSelect(shape.id);
    },
    className: isSelected ? "shape selected" : "shape",
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
            rx={18}
          />
          <text x={shape.x + shape.width / 2} y={shape.y + shape.height / 2}>
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
          <text x={shape.x + shape.width / 2} y={shape.y + shape.height / 2}>
            {shape.label}
          </text>
        </g>
      );
    case "right-triangle":
      return (
        <g key={shape.id}>
          <polygon
            {...commonProps}
            points={`${shape.x},${shape.y + shape.height} ${
              shape.x + shape.width
            },${shape.y + shape.height} ${shape.x},${shape.y}`}
          />
          <text x={shape.x + shape.width / 2} y={shape.y + shape.height / 2}>
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
          <text x={shape.x + shape.width / 2} y={shape.y - 8}>
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
          <text x={shape.x + shape.width / 2} y={shape.y - 8}>
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
          <text x={shape.x + shape.width / 2} y={shape.y - 8}>
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
            rx={8}
          />
          <line
            {...commonProps}
            x1={shape.x + shape.width / 2}
            y1={shape.y + 36}
            x2={shape.x + shape.width / 2}
            y2={shape.y + shape.height}
            strokeDasharray="6 6"
          />
          <text x={shape.x + shape.width / 2} y={shape.y + 24}>
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
          />
          <text x={shape.x + shape.width / 2} y={shape.y + shape.height / 2}>
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

const DiagramCanvas = ({ shapes, selectedId, onSelect }) => (
  <svg className="canvas" viewBox="0 0 1000 700" onClick={() => onSelect(null)}>
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
        <path d="M0,0 L12,6 L0,12 z" fill="#111827" />
      </marker>
    </defs>
    <rect className="canvas-grid" x="0" y="0" width="1000" height="700" />
    {shapes.map((shape) =>
      renderShape(shape, shape.id === selectedId, onSelect)
    )}
  </svg>
);

export default function App() {
  const [shapes, setShapes] = useState(INITIAL_SHAPES);
  const [selectedId, setSelectedId] = useState(shapes[0]?.id ?? null);
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
            onSelect={setSelectedId}
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
              <li>Layer diagrams to express system interaction clearly.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
