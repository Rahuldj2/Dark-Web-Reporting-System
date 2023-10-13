// components/Flowchart.js
import React from 'react';
import ReactFlow,{ Elements } from 'react-flow-renderer';
import styles from '../../styles/Flowchart.module.css';

import 'reactflow/dist/style.css';


const Flowchart = () => {

    const nodes = [
        { id: '1',type: 'input',data: { label: 'User discovers illegal activities' },position: { x: 200,y: 20 } },
        { id: '2',data: { label: 'User reports anonymous tip with cryptocurrency proof of stake' },position: { x: 200,y: 100 } },
        { id: '3',data: { label: 'Govt Anti-Cyber Crime officer reviews tip' },position: { x: 200,y: 190 } },
        { id: '4a',data: { label: 'Tip is valid' },position: { x: 100,y: 300 } },
        { id: '4b',data: { label: 'Tip is false or spam' },position: { x: 300,y: 300 } },
        { id: '5a',type: 'output',data: { label: 'Reward generated' },position: { x: 100,y: 370 } },
        { id: '5b',type: 'output',data: { label: 'Stake amount seized' },position: { x: 300,y: 370 } },
    ];

    const edges = [
        { id: 'e1-2',source: '1',target: '2',animated: true },
        { id: 'e2-3',source: '2',target: '3',animated: true },
        { id: 'e3-4a',source: '3',target: '4a',animated: true,label: 'Valid' },
        { id: 'e3-4b',source: '3',target: '4b',animated: true,label: 'False or Spam' },
        { id: 'e4a-5a',source: '4a',target: '5a',animated: true },
        { id: 'e4b-5b',source: '4b',target: '5b',animated: true },
    ];

    return (
        <div className={styles.pageContainer}>
            <div className={styles.flowchartContainer}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    style={{ width: '100%',height: '100%' }}
                    minZoom={1.3}
                    maxZoom={1.3}
                    fitView
                    nodesDraggable={false} // Disable dragging nodes
                    elementsSelectable={false} // Disable selecting elements
                    panOnScroll={false} // Disable panning on scroll
                />
            </div>
        </div>
    );
};

export default Flowchart;
