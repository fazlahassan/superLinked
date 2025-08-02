import React, { JSX, useEffect, useState } from 'react';
import { GraphData, LinkObject, NodeObject } from 'react-force-graph';
import ForceGraph2D from 'react-force-graph-2d';

interface SuperheroNode extends NodeObject {
  id: string | number;
  label: string;
  image?: string;
  x?: number;
  y?: number;
}

interface SuperheroLink extends LinkObject {
  source: string | number;
  target: string | number;
}

const imageMap: Record<string, string> = {
  "Spider-Man": "/assets/spider.png",
  "Iron Man": "/assets/iron.png",
  "Thor": "/assets/thor.png",
  "Hulk": "/assets/hulk.png",
  "Captain America": "/assets/captain.png",
  "Black Widow": "/assets/black.png",
  "Doctor Strange": "/assets/doctor.png",
  "Black Panther": "/assets/panther.png",
  "Scarlet Witch": "/assets/witch.png",
  "Ant-Man": "/assets/ant.png",
  "dataiskole": "/assets/DI.webp"
};

export default function GraphView(): JSX.Element {
  const [graphData, setGraphData] = useState<GraphData<SuperheroNode, SuperheroLink>>({
    nodes: [],
    links: [],
  });

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imageCache = React.useRef<Record<string | number, HTMLImageElement>>({});

  useEffect(() => {
    let isMounted = true; // to avoid state updates if component unmounts

    fetch('http://127.0.0.1:8000/graph-data')
      .then(res => {
        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        if (!isMounted) return;

        const nodes: SuperheroNode[] = data.nodes.map((node: any) => ({
          id: node.id,
          label: node.label,
          image: imageMap[node.label] || '/assets/no-image.png',
        }));

        const links: SuperheroLink[] = data.edges.map((edge: any) => ({
          source: edge.source,
          target: edge.target,
        }));

        setGraphData({ nodes, links });

        // Preload images with error handling
        const promises = nodes.map(node => new Promise<void>((resolve) => {
          const img = new Image();
          img.src = node.image!;
          img.onload = () => resolve();
          img.onerror = () => {
            console.error(`Failed to load image for ${node.label}: ${node.image}`);
            resolve(); // resolve anyway to avoid blocking
          };
          imageCache.current[node.id] = img;
        }));

        Promise.all(promises).then(() => {
          if (isMounted) setImagesLoaded(true);
        });
      })
      .catch(error => {
        if (isMounted) {
          console.error('Failed to fetch graph data:', error);
          // Optionally, set an error state here
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);


  if (!imagesLoaded) {
    return <div>Loading images...</div>;
  }

  return (
    <div style={{}}>
      <ForceGraph2D
        graphData={graphData}
        nodeLabel="label"
        nodeCanvasObject={(node: SuperheroNode, ctx, globalScale) => {
          const img = imageCache.current[node.id];
          const imgSize = 10;
          if (img) {
            const x = node.x! - imgSize / 2;
            const y = node.y! - imgSize / 2;

            ctx.save();
            ctx.beginPath();
            ctx.arc(node.x!, node.y!, imgSize / 2, 0, 2 * Math.PI, false);
            ctx.clip();
            ctx.drawImage(img, x, y, imgSize, imgSize);
            ctx.restore();
          } else {
            // Fallback circle if image missing
            ctx.beginPath();
            ctx.arc(node.x!, node.y!, imgSize / 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'gray';
            ctx.fill();
          }
        }}
        nodePointerAreaPaint={(node: SuperheroNode, color, ctx) => {
          const imgSize = 10;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x!, node.y!, imgSize / 2, 0, 2 * Math.PI, false);
          ctx.fill();
        }}
        linkDirectionalArrowLength={3}
        linkColor={() => ' #ff1a1a'}
        linkDirectionalArrowRelPos={1}

      />
    </div>
  );
}
