// import React, { useState, useEffect, useCallback, useRef } from 'react';
// // Optional: Import specific component files if you create them
// // import LeftSidebar from './components/LeftSidebar';
// // import MainContent from './components/MainContent';
// // import RightSidebar from './components/RightSidebar';
// // import Resizer from './components/Resizer';

// // --- Configuration Data (can be moved to a separate file) ---
// const MAX_SELECTED_PROMPTS = 6;
// const MIN_COLUMN_WIDTH = 150;
// const categorizedPrompts = {
//     "风格": ["设计一个扁平化风格的", "采用拟物化设计的", "应用Material Design规范的", "创建暗黑模式的", "需要有玻璃拟态效果的", "使用赛博朋克视觉元素的"],
//     "交互": ["实现拖拽排序功能的", "带有平滑过渡动画的", "需要点击反馈效果的", "支持手势滑动的", "包含实时搜索建议的", "提供撤销/重做操作的"],
//     "UI效果": ["加入视差滚动效果的", "拥有加载占位符（Skeleton）的", "背景是动态渐变的", "按钮带有悬浮特效的", "包含图表数据可视化的", "弹出模态框有动画的"],
//     "使用场景": ["用户登录界面", "产品展示列表", "设置页面布局", "带验证的表单", "包含导航菜单的", "个人信息中心"]
// };
// const allPrompts = Object.values(categorizedPrompts).flat();
// const categories = ['All', ...Object.keys(categorizedPrompts)]; // Include 'All'

// function App() {
//     // --- State ---
//     const [selectedCategory, setSelectedCategory] = useState('All');
//     const [availablePromptsInList, setAvailablePromptsInList] = useState(allPrompts);
//     const [selectedPrompts, setSelectedPrompts] = useState([]); // Array of { id, text, x, y }
//     const [connections, setConnections] = useState([]); // Array of { startId, endId }
//     const [combinedPromptText, setCombinedPromptText] = useState('');
//     const [generatedCode, setGeneratedCode] = useState('// 点击 PUSH 后代码将在此显示');
//     const [nextId, setNextId] = useState(0);

//     // State for Column Widths (using inline styles)
//     const [leftWidth, setLeftWidth] = useState(250);
//     const [rightWidth, setRightWidth] = useState(300);

//     // State for Interactions (more complex to manage in React)
//     const [isResizing, setIsResizing] = useState(false);
//     const [isDraggingPrompt, setIsDraggingPrompt] = useState(false);
//     const [connectingFromId, setConnectingFromId] = useState(null);
//     // Refs might be needed for drag/resize calculations or direct SVG manipulation
//     const mainContentRef = useRef(null);
//     const selectedAreaRef = useRef(null);
//     const selectedPromptRefs = useRef({}); // Store refs to selected prompts: { [id]: ref }

//     // --- Effects ---

//     // Update prompt list when category changes
//     useEffect(() => {
//         if (selectedCategory === 'All') {
//             setAvailablePromptsInList(allPrompts);
//         } else {
//             setAvailablePromptsInList(categorizedPrompts[selectedCategory] || []);
//         }
//     }, [selectedCategory]);

//     // Update combined prompt text when selections or connections change
//     useEffect(() => {
//         // *** Placeholder for the complex 'updateCombinedPrompt' logic ***
//         // This logic needs to be adapted to use the 'selectedPrompts' and 'connections' state arrays
//         let combined = "";
//         if (connections.length > 0) {
//             // Simplified: Just join connected nodes - needs full traversal logic from JS
//              combined = "Connected: " + connections.map(c => {
//                  const start = selectedPrompts.find(p => p.id === c.startId)?.text || '?';
//                  const end = selectedPrompts.find(p => p.id === c.endId)?.text || '?';
//                  return `${start.substring(0,10)}... -> ${end.substring(0,10)}...`; // Example display
//              }).join(' | ');
//              // Add logic here to traverse connections and build the text based on selectedPrompts state
//              console.log("需要实现完整的组合 Prompt 逻辑");
//         } else {
//              combined = selectedPrompts.map(p => p.text).join(' | ');
//         }
//         setCombinedPromptText(combined);
//     }, [selectedPrompts, connections]);


//     // --- Event Handlers (Callbacks) ---
//     const handleCategoryChange = useCallback((event) => {
//         setSelectedCategory(event.target.value);
//     }, []);

//     const handlePromptSelect = useCallback((text) => {
//         if (selectedPrompts.length >= MAX_SELECTED_PROMPTS) {
//             alert(`最多只能选择 ${MAX_SELECTED_PROMPTS} 个 Prompt。`);
//             return;
//         }
//         const id = nextId;
//         setNextId(prev => prev + 1);

//         // *** Placeholder for initial position calculation ***
//         const initialX = 50 + (selectedPrompts.length % 3) * 150;
//         const initialY = 50 + Math.floor(selectedPrompts.length / 3) * 100;
//         console.log("需要根据容器大小实现更好的初始定位逻辑");

//         setSelectedPrompts(prev => [...prev, { id, text, x: initialX, y: initialY }]);
//     }, [selectedPrompts.length, nextId]);

//     const handlePush = useCallback(() => {
//         if (!combinedPromptText.trim()) {
//             setGeneratedCode("// 没有提供有效的 Prompt.");
//             return;
//         }
//         // *** Placeholder for the 'handlePush' simulation logic ***
//         const simulation = `// 模拟为以下 Prompt 生成代码:\n// ${combinedPromptText}\n\nfunction simulated() { console.log("模拟执行"); }`;
//         setGeneratedCode(simulation);
//         console.log("需要实现完整的 PUSH 模拟逻辑");
//     }, [combinedPromptText]);

//     // --- Interaction Logic (Placeholders - Very Complex) ---

//     const handlePromptMouseDown = useCallback((id, event) => {
//         // *** Placeholder for Drag Start Logic ***
//         event.preventDefault();
//         if (isResizing) return; // Don't drag if resizing
//         setIsDraggingPrompt(true); // Simplified state setting
//         // Needs: Record dragged ID, start mouse pos, element offset, add global listeners
//         console.log("需要实现 Prompt 拖拽开始逻辑:", id);
//     }, [isResizing]);

//     const handleConnectorClick = useCallback((id, event) => {
//          // *** Placeholder for Connection Logic ***
//          event.stopPropagation();
//          if (isResizing) return; // Don't connect if resizing
//         if (connectingFromId === null) {
//             setConnectingFromId(id);
//             console.log("开始连接，起点:", id);
//              // Add visual indicator (e.g., change state/class)
//         } else {
//             if (connectingFromId !== id) {
//                 // Check for duplicates before adding
//                 const exists = connections.some(
//                     conn => (conn.startId === connectingFromId && conn.endId === id) ||
//                             (conn.startId === id && conn.endId === connectingFromId)
//                 );
//                 if (!exists) {
//                    setConnections(prev => [...prev, { startId: connectingFromId, endId: id }]);
//                    console.log("连接成功:", connectingFromId, "->", id);
//                 } else {
//                     console.log("连接已存在");
//                 }
//             } else {
//                  console.log("点击了同一个连接点，取消连接");
//             }
//             setConnectingFromId(null); // Reset state
//              // Remove visual indicator
//         }
//     }, [connectingFromId, connections, isResizing]); // Added dependencies

//     const handleResizeMouseDown = useCallback((resizerId, event) => {
//         // *** Placeholder for Resize Start Logic ***
//         event.preventDefault();
//         if (isDraggingPrompt) return; // Don't resize if dragging prompt
//         setIsResizing(true); // Simplified state setting
//         // Needs: Record active resizer, start mouse pos, initial widths, add global listeners
//         console.log("需要实现调整大小开始逻辑:", resizerId);
//     }, [isDraggingPrompt]);

//     // Effect for adding/removing global listeners for dragging/resizing
//     useEffect(() => {
//         const handleGlobalMouseMove = (event) => {
//             if (isResizing) {
//                  // *** Placeholder for handleResize logic ***
//                  // Calculate deltaX, update leftWidth/rightWidth state, respecting MIN_COLUMN_WIDTH
//                 console.log("需要实现调整大小移动逻辑");
//             } else if (isDraggingPrompt) {
//                  // *** Placeholder for handleDrag logic ***
//                  // Calculate new x, y for the dragged prompt based on mouse move
//                  // Update the specific prompt in the selectedPrompts state
//                 console.log("需要实现 Prompt 拖拽移动逻辑");
//             }
//         };

//         const handleGlobalMouseUp = () => {
//             if (isResizing) {
//                 setIsResizing(false);
//                 document.body.classList.remove('is-resizing');
//                 console.log("需要实现调整大小结束逻辑");
//             }
//             if (isDraggingPrompt) {
//                 setIsDraggingPrompt(false);
//                 // Logic to reset dragged item state
//                 console.log("需要实现 Prompt 拖拽结束逻辑");
//             }
//             // Optional: Reset connecting state on global mouse up if desired
//             // if (connectingFromId) {
//             //     setConnectingFromId(null);
//             // }
//         };

//         if (isResizing || isDraggingPrompt) {
//             document.addEventListener('mousemove', handleGlobalMouseMove);
//             document.addEventListener('mouseup', handleGlobalMouseUp);
//             // Apply global cursor only during resize
//             document.body.classList.toggle('is-resizing', isResizing);
//         }

//         // Cleanup function
//         return () => {
//             document.removeEventListener('mousemove', handleGlobalMouseMove);
//             document.removeEventListener('mouseup', handleGlobalMouseUp);
//             document.body.classList.remove('is-resizing');
//         };
//     }, [isResizing, isDraggingPrompt]); // Removed connectingFromId dependency here as it's handled differently


//      // --- Render Helper for Lines (Placeholder) ---
//      const renderSvgLines = () => {
//          // *** Placeholder for Line Rendering Logic ***
//          console.log("需要实现 SVG 线条渲染逻辑");
//          return connections.map((conn, index) => {
//              // Find prompts - VERY simplified, assumes they exist and have x/y
//              const startPrompt = selectedPrompts.find(p => p.id === conn.startId);
//              const endPrompt = selectedPrompts.find(p => p.id === conn.endId);
//              if (!startPrompt || !endPrompt) return null; // Skip if prompts not found

//              // Placeholder coordinates - NEED accurate calculation relative to SVG container
//              // Get element positions using refs or calculations based on state.
//              const x1 = (startPrompt.x || 0) + 50; // Default to 0 if undefined
//              const y1 = (startPrompt.y || 0) + 15;
//              const x2 = (endPrompt.x || 0) + 50;
//              const y2 = (endPrompt.y || 0) + 15;

//              // Add basic validation
//              if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) return null;

//              return <line key={`${conn.startId}-${conn.endId}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--line-color)" strokeWidth="2" />;
//          });
//      };


//     // --- JSX Structure ---
//     return (
//         <div className="container">
//             {/* Left Sidebar */}
//             <aside className="column sidebar left-sidebar" id="left-sidebar" style={{ flexBasis: `${leftWidth}px` }}>
//                 <h2>Prompt Library</h2>
//                 <div className="category-filter">
//                     <select id="prompt-category-filter" value={selectedCategory} onChange={handleCategoryChange}>
//                         {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
//                     </select>
//                 </div>
//                 <div className="sidebar-content-wrapper">
//                     <ul className="prompt-list" id="prompt-list">
//                         {availablePromptsInList.map((text, index) => (
//                             <li key={index}>
//                                 <button className="prompt-button" onClick={() => handlePromptSelect(text)}>
//                                     {text}
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </aside>

//             {/* Resizer 1 */}
//             <div
//                 className="resizer"
//                 id="resizer-left-main"
//                 onMouseDown={(e) => handleResizeMouseDown('left-main', e)}
//              />

//             {/* Main Content */}
//             <main className="column main-content" id="main-content" ref={mainContentRef}>
//                 <div className="selected-prompts-wrapper" ref={selectedAreaRef}>
//                      <svg id="prompt-lines" width="100%" height="100%">
//                         {renderSvgLines()}
//                      </svg>
//                      <div id="selected-prompts-area">
//                         {selectedPrompts.map(prompt => (
//                              <div
//                                 key={prompt.id}
//                                 id={`prompt-${prompt.id}`}
//                                 className={`selected-prompt ${isDraggingPrompt /* && draggedId === prompt.id */ ? 'dragging' : ''}`} // Add dragging class based on state
//                                 style={{ left: `${prompt.x}px`, top: `${prompt.y}px` }}
//                                 onMouseDown={(e) => handlePromptMouseDown(prompt.id, e)}
//                                 // Assign ref - complex for dynamic lists, simplified here
//                                 // ref={el => selectedPromptRefs.current[prompt.id] = el}
//                              >
//                                 {prompt.text}
//                                 <div
//                                     className={`connector ${connectingFromId === prompt.id ? 'active' : ''}`}
//                                     onClick={(e) => handleConnectorClick(prompt.id, e)}
//                                 />
//                              </div>
//                         ))}
//                      </div>
//                 </div>
//                 <div className="controls">
//                     <textarea id="combined-prompt" value={combinedPromptText} placeholder="连接后的 Prompt 将在此显示..." readOnly />
//                     <button id="push-button" onClick={handlePush}>PUSH</button>
//                 </div>
//             </main>

//             {/* Resizer 2 */}
//             <div
//                 className="resizer"
//                 id="resizer-main-right"
//                 onMouseDown={(e) => handleResizeMouseDown('main-right', e)}
//             />


//             {/* Right Sidebar */}
//             <aside className="column sidebar right-sidebar" id="right-sidebar" style={{ flexBasis: `${rightWidth}px` }}>
//                 <h2>Generated Code</h2>
//                 <div className="sidebar-content-wrapper">
//                      <div id="generated-code-wrapper">
//                          <pre><code id="generated-code">{generatedCode}</code></pre>
//                      </div>
//                 </div>
//             </aside>
//         </div>
//     );
// }

// export default App;

import React, { useState, useEffect, useCallback, useRef } from 'react';
// --- 导入 JSON 数据 ---
// 确保路径正确！指向 src 目录下的 promptData.json
import libraryData from './promptData.json';

// --- Configuration Data ---
const MAX_SELECTED_PROMPTS = 6;
const MIN_COLUMN_WIDTH = 150; // Corresponds to CSS --min-column-width

// --- 从导入的数据动态生成分类 ---
const initialCategories = ['All', ...new Set(libraryData.map(item => item.category || 'Uncategorized'))];

function App() {
    // --- State ---
    const [categories] = useState(initialCategories);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [availablePromptsInList, setAvailablePromptsInList] = useState(libraryData);
    const [selectedPrompts, setSelectedPrompts] = useState([]); // { id, text, x, y, fragment, originalId }
    const [connections, setConnections] = useState([]); // { startId, endId }
    const [combinedPromptText, setCombinedPromptText] = useState('');
    const [generatedCode, setGeneratedCode] = useState('// 点击 PUSH 后代码将在此显示');
    const [nextId, setNextId] = useState(0); // 用于生成拖拽元素的唯一 ID

    // Column Widths
    const [leftWidth, setLeftWidth] = useState(250);
    const [rightWidth, setRightWidth] = useState(300);

    // Interaction State
    const [interactionState, setInteractionState] = useState({
        isResizing: false,
        isDragging: false,
        type: null,
        id: null,
        startX: 0,
        startY: 0,
        initialLeftWidth: 0,
        initialRightWidth: 0,
        dragOffsetX: 0,
        dragOffsetY: 0,
    });
    const [connectingFromId, setConnectingFromId] = useState(null);

    // Refs
    const containerRef = useRef(null);
    const selectedAreaRef = useRef(null);
    const selectedPromptRefs = useRef({});

    // --- Effects ---

    // Update prompt list based on selected category
    useEffect(() => {
        if (selectedCategory === 'All') {
            setAvailablePromptsInList(libraryData);
        } else {
            setAvailablePromptsInList(libraryData.filter(item => item.category === selectedCategory));
        }
    }, [selectedCategory]);

    // Update combined prompt text - !! 使用 fragment !!
    useEffect(() => {
        let combined = "";
        const fragmentsToCombine = [];

        if (selectedPrompts.length === 0) {
             combined = "";
        } else if (connections.length > 0) {
             const visited = new Set();
             const promptMap = new Map(selectedPrompts.map(p => [p.id, p]));
             const outgoingConnections = new Map();
             connections.forEach(c => outgoingConnections.set(c.startId, c.endId));
             const incomingConnections = new Set(connections.map(c => c.endId));

             let startNodes = selectedPrompts.filter(p => !incomingConnections.has(p.id));
              if (startNodes.length === 0 && selectedPrompts.length > 0) {
                  // Fallback: if cycle or fully connected, just start from the first selected
                   startNodes = selectedPrompts.length > 0 ? [selectedPrompts[0]] : [];
                   console.warn("No clear start node found for prompt combination, starting from first selected.");
              }

             let processingQueue = [...startNodes];
             let safety = 0;

             while(processingQueue.length > 0 && safety < selectedPrompts.length * 2) {
                  const currentPrompt = processingQueue.shift();
                  if (currentPrompt && !visited.has(currentPrompt.id)) {
                      fragmentsToCombine.push(currentPrompt.fragment);
                      visited.add(currentPrompt.id);
                      const nextId = outgoingConnections.get(currentPrompt.id);
                      if (nextId !== undefined) {
                          const nextPrompt = promptMap.get(nextId);
                          // Only add to queue if it exists and hasn't been visited (prevents infinite loops)
                          if(nextPrompt && !visited.has(nextPrompt.id)) {
                              processingQueue.push(nextPrompt);
                          } else if (nextPrompt && visited.has(nextPrompt.id)) {
                              console.warn(`Loop detected or node ${nextPrompt.id} already processed.`);
                          }
                      }
                  }
                 safety++;
                 if (safety >= selectedPrompts.length * 2) {
                     console.error("Prompt combination safety break triggered. Check for complex loops.");
                 }
             }
             // Add orphan nodes (those selected but not part of any connection)
             selectedPrompts.forEach(p => {
                 if (!visited.has(p.id) && !connections.some(c => c.startId === p.id || c.endId === p.id)) {
                     fragmentsToCombine.push(p.fragment);
                     visited.add(p.id); // Mark as visited
                 }
             });
             combined = fragmentsToCombine.join("\n\n然后，");

        } else {
            // No connections, simple join
            combined = selectedPrompts.map(p => p.fragment).join("\n\n并且，");
        }

        // Add prefix only if there's content
        if (combined.trim()) {
             setCombinedPromptText("请使用 HTML, CSS, 和 JavaScript 生成一个包含以下效果的网页：\n\n" + combined);
        } else {
            setCombinedPromptText(""); // Reset if no fragments to combine
        }

    }, [selectedPrompts, connections]);


    // --- Event Handlers ---
    const handleCategoryChange = useCallback((event) => {
        setSelectedCategory(event.target.value);
    }, []);

    // Add new prompt
    const handlePromptSelect = useCallback((item) => {
        if (selectedPrompts.length >= MAX_SELECTED_PROMPTS) {
            alert(`最多只能选择 ${MAX_SELECTED_PROMPTS} 个 Prompt。`);
            return;
        }
        // Check if this original prompt is already selected
        if (selectedPrompts.some(p => p.originalId === item.id)) {
            alert(`"${item.name}" 效果已经被添加了。`);
            return;
        }

        const id = nextId;
        setNextId(prev => prev + 1);

        const areaRect = selectedAreaRef.current?.getBoundingClientRect();
        const areaWidth = areaRect?.width ?? 600;
        const areaHeight = areaRect?.height ?? 400;
        const promptWidthEstimate = 150; const promptHeightEstimate = 40; const padding = 20;
        const columns = Math.max(1, Math.floor((areaWidth - padding * 2) / (promptWidthEstimate + padding)));
        const colIndex = selectedPrompts.length % columns;
        const rowIndex = Math.floor(selectedPrompts.length / columns);
        const initialX = Math.max(padding, Math.min(padding + colIndex * (promptWidthEstimate + padding), areaWidth - promptWidthEstimate - padding * 2));
        const initialY = Math.max(padding, Math.min(padding + rowIndex * (promptHeightEstimate + padding), areaHeight - promptHeightEstimate - padding * 2));

        const newPrompt = {
            id: id,
            text: item.name,
            originalId: item.id, // Store the original ID from JSON
            fragment: item.promptFragment,
            x: initialX,
            y: initialY
        };
        setSelectedPrompts(prev => [...prev, newPrompt]);
    }, [selectedPrompts, nextId]); // Updated dependency

    // Push button handler
    const handlePush = useCallback(() => {
        if (!combinedPromptText.trim()) { // Check if truly empty or just the prefix
            setGeneratedCode("// 没有提供有效的 Prompt 或未选择任何效果.");
            return;
        }
         const simulation = `// 模拟为以下 Prompt 生成代码:\n// ${combinedPromptText.replace(/\n/g, "\n// ")}\n\n` +
                           `function generatedByPrompt() {\n` +
                           `  console.log("执行基于 Prompt 生成的代码...");\n` +
                           `  // 实际应用中这里会调用 API 或其他逻辑\n`+
                           `  const result = "模拟结果: 代码生成中...";\n`+
                           `  return result;\n`+
                           `}\n\n` +
                           `const output = generatedByPrompt();\n` +
                           `console.log(output);\n`;
        setGeneratedCode(simulation);
        console.log("准备发送给 API 的最终 Prompt:\n", combinedPromptText);
        // --- 实际调用 API 的地方 ---
        // callYourApiFunction(combinedPromptText) ...
    }, [combinedPromptText]);

    // --- Interaction Logic Implementation (Keep as is) ---
    const handlePromptMouseDown = useCallback((id, event) => {
        if (event.button !== 0) return;
        event.preventDefault();
        event.stopPropagation();
        if (interactionState.isResizing) return;
        const promptElement = selectedPromptRefs.current[id];
        const areaElement = selectedAreaRef.current;
        if (!promptElement || !areaElement) return;
        const promptRect = promptElement.getBoundingClientRect();
        const areaRect = areaElement.getBoundingClientRect();
        setInteractionState({
            isDragging: true, isResizing: false, type: 'drag', id: id,
            startX: event.clientX, startY: event.clientY,
            dragOffsetX: event.clientX - (promptRect.left - areaRect.left),
            dragOffsetY: event.clientY - (promptRect.top - areaRect.top),
            initialLeftWidth: 0, initialRightWidth: 0,
        });
    }, [interactionState.isResizing]);

    const handleResizeMouseDown = useCallback((resizerId, event) => {
        if (event.button !== 0) return;
        event.preventDefault();
        event.stopPropagation();
        if (interactionState.isDragging) return;
        setInteractionState({
            isDragging: false, isResizing: true, type: 'resize', id: resizerId,
            startX: event.clientX, startY: event.clientY,
            initialLeftWidth: leftWidth, initialRightWidth: rightWidth,
            dragOffsetX: 0, dragOffsetY: 0,
        });
    }, [interactionState.isDragging, leftWidth, rightWidth]);

    const handleConnectorClick = useCallback((id, event) => {
         event.stopPropagation();
         if (interactionState.isResizing || interactionState.isDragging) return;
        if (connectingFromId === null) {
            setConnectingFromId(id);
        } else {
            if (connectingFromId !== id) {
                const exists = connections.some(conn => (conn.startId === connectingFromId && conn.endId === id));
                const createsLoop = connections.some(c => c.startId === id && c.endId === connectingFromId);
                if (!exists && !createsLoop) {
                   setConnections(prev => [...prev, { startId: connectingFromId, endId: id }]);
                } else if (createsLoop) console.log("无法创建循环连接");
                else if (exists) console.log("连接已存在或反向存在");
            } else console.log("点击了同一个连接点，取消连接");
            setConnectingFromId(null); // Reset after second click regardless
        }
    }, [connectingFromId, connections, interactionState.isResizing, interactionState.isDragging]);

    // Global Mouse Move and Mouse Up Listeners (Effect - Keep as is)
    useEffect(() => {
        const handleGlobalMouseMove = (event) => {
            if (!interactionState.isResizing && !interactionState.isDragging) return;
            event.preventDefault();
            const { type, id, startX, dragOffsetX, dragOffsetY, initialLeftWidth, initialRightWidth } = interactionState;
            if (type === 'resize') {
                const currentX = event.clientX; const deltaX = currentX - startX;
                const containerWidth = containerRef.current?.offsetWidth ?? window.innerWidth;
                const mainContentMinWidth = 200; const resizerWidth = 5;
                let newLeftWidth = initialLeftWidth; let newRightWidth = initialRightWidth;
                if (id === 'left-main') {
                    newLeftWidth = Math.max(MIN_COLUMN_WIDTH, initialLeftWidth + deltaX);
                    if (containerWidth - newLeftWidth - mainContentMinWidth - 2 * resizerWidth < MIN_COLUMN_WIDTH) {
                        newLeftWidth = containerWidth - MIN_COLUMN_WIDTH - mainContentMinWidth - 2 * resizerWidth;
                        newLeftWidth = Math.max(MIN_COLUMN_WIDTH, newLeftWidth);
                    }
                } else if (id === 'main-right') {
                    newRightWidth = Math.max(MIN_COLUMN_WIDTH, initialRightWidth - deltaX);
                    if (containerWidth - newRightWidth - mainContentMinWidth - 2 * resizerWidth < MIN_COLUMN_WIDTH) {
                        newRightWidth = containerWidth - MIN_COLUMN_WIDTH - mainContentMinWidth - 2 * resizerWidth;
                        newRightWidth = Math.max(MIN_COLUMN_WIDTH, newRightWidth);
                    }
                }
                if (id === 'left-main' && newLeftWidth !== leftWidth) setLeftWidth(newLeftWidth);
                if (id === 'main-right' && newRightWidth !== rightWidth) setRightWidth(newRightWidth);
            } else if (type === 'drag') {
                const areaElement = selectedAreaRef.current; const promptElement = selectedPromptRefs.current[id];
                if (!areaElement || !promptElement) return;
                const areaRect = areaElement.getBoundingClientRect();
                let newX = event.clientX - areaRect.left - dragOffsetX; let newY = event.clientY - areaRect.top - dragOffsetY;
                const promptRect = promptElement.getBoundingClientRect();
                const promptWidth = promptRect.width; const promptHeight = promptRect.height;
                newX = Math.max(0, Math.min(newX, areaRect.width - promptWidth));
                newY = Math.max(0, Math.min(newY, areaRect.height - promptHeight));
                setSelectedPrompts(prevPrompts => prevPrompts.map(p => p.id === id ? { ...p, x: newX, y: newY } : p));
            }
        };
        const handleGlobalMouseUp = (event) => {
            if (event.button !== 0) return; // Only left button releases interaction
            if (interactionState.isResizing || interactionState.isDragging) {
                 setInteractionState({ isResizing: false, isDragging: false, type: null, id: null, startX: 0, startY: 0, initialLeftWidth: 0, initialRightWidth: 0, dragOffsetX: 0, dragOffsetY: 0 });
                 document.body.classList.remove('is-resizing');
            }
             // Cancel connection if clicking outside while connecting
             // Need to ensure the target is not the connector itself or part of the prompt being connected from
             if (connectingFromId !== null) {
                 // More robust check: is the click target outside of the selected prompts area or not a connector?
                 const target = event.target;
                 if (!target.closest('.selected-prompt') || !target.classList.contains('connector')) {
                    // If the click was not on a connector, cancel the connection attempt
                    if(!target.classList.contains('connector')) {
                       setConnectingFromId(null);
                       console.log("Connection cancelled (clicked outside)");
                    }
                 }
                 // If the click was on a connector, the handleConnectorClick logic should handle it.
             }
        };

        if (interactionState.isResizing || interactionState.isDragging) {
            document.addEventListener('mousemove', handleGlobalMouseMove);
            document.addEventListener('mouseup', handleGlobalMouseUp);
            document.body.classList.toggle('is-resizing', interactionState.isResizing);
        } else if (connectingFromId !== null) {
             // Add mouseup listener only when trying to connect
             document.addEventListener('mouseup', handleGlobalMouseUp);
        }

        // Cleanup function
        return () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove);
            document.removeEventListener('mouseup', handleGlobalMouseUp);
            document.body.classList.remove('is-resizing');
        };
    }, [interactionState, leftWidth, rightWidth, connectingFromId]); // Dependencies are correct

    // --- Render Helper for Lines (Keep as is) ---
    const renderSvgLines = () => {
         if (!selectedAreaRef.current) return null;
         const areaRect = selectedAreaRef.current.getBoundingClientRect();
         return connections.map((conn) => {
             const startPromptNode = selectedPromptRefs.current[conn.startId];
             const endPromptNode = selectedPromptRefs.current[conn.endId];
             if (!startPromptNode || !endPromptNode) return null;
             const startRect = startPromptNode.getBoundingClientRect();
             const endRect = endPromptNode.getBoundingClientRect();
             // Calculate center points for line
             const x1 = (startRect.left - areaRect.left) + startRect.width / 2;
             const y1 = (startRect.top - areaRect.top) + startRect.height / 2;
             const x2 = (endRect.left - areaRect.left) + endRect.width / 2;
             const y2 = (endRect.top - areaRect.top) + endRect.height / 2;
             if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) return null; // Check for NaN coordinates
             return <line key={`${conn.startId}-${conn.endId}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--line-color, #ccc)" strokeWidth="2" strokeLinecap="round" markerEnd="url(#arrowhead)" />; // Added arrow head (optional)
         });
     };


    // --- JSX Structure ---
    return (
        <div className="container" ref={containerRef}>
            {/* Left Sidebar */}
            <aside className="column sidebar left-sidebar" style={{ flexBasis: `${leftWidth}px`, flexGrow: 0, flexShrink: 0 }}>
                <h2>Prompt Library</h2>
                <div className="category-filter">
                    <select id="prompt-category-filter" value={selectedCategory} onChange={handleCategoryChange}>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <div className="sidebar-content-wrapper">
                    <ul className="prompt-list" id="prompt-list">
                        {availablePromptsInList.map((item) => (
                            <li key={item.id}> {/* Use original id from JSON as key */}
                                <button className="prompt-button" onClick={() => handlePromptSelect(item)}>
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            {/* Resizer 1 */}
            <div className="resizer" id="resizer-left-main" style={{ cursor: 'col-resize' }} onMouseDown={(e) => handleResizeMouseDown('left-main', e)} />

            {/* Main Content */}
            <main className="column main-content">
                <div className="selected-prompts-wrapper" ref={selectedAreaRef}>
                     <svg id="prompt-lines" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
                        {/* Optional: Add marker definition for arrow heads */}
                        <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="var(--line-color, #ccc)" />
                            </marker>
                        </defs>
                        {renderSvgLines()}
                     </svg>
                     <div id="selected-prompts-area" style={{ position: 'relative', width: '100%', height: '100%' }}>
                        {selectedPrompts.map(prompt => (
                             <div
                                key={prompt.id} // Use generated unique ID for key
                                id={`prompt-${prompt.id}`}
                                ref={el => selectedPromptRefs.current[prompt.id] = el}
                                className={`selected-prompt ${interactionState.isDragging && interactionState.id === prompt.id ? 'dragging' : ''}`}
                                style={{ left: `${prompt.x}px`, top: `${prompt.y}px`, position: 'absolute', cursor: interactionState.isDragging && interactionState.id === prompt.id ? 'grabbing' : 'grab', zIndex: interactionState.isDragging && interactionState.id === prompt.id ? 11 : 10 }}
                                onMouseDown={(e) => handlePromptMouseDown(prompt.id, e)}
                             >
                                {prompt.text} {/* Display name */}
                                {/* Connector Point - always visible for simplicity */}
                                <div
                                    className={`connector ${connectingFromId === prompt.id ? 'active' : ''}`}
                                    style={{ cursor: 'crosshair' }}
                                    onClick={(e) => handleConnectorClick(prompt.id, e)}
                                    title="点击连接到其他效果" // Tooltip
                                />
                             </div>
                        ))}
                     </div>
                </div>
                <div className="controls">
                    <textarea id="combined-prompt" value={combinedPromptText} placeholder="连接后的 Prompt 将在此显示..." readOnly />
                    <button id="push-button" onClick={handlePush} disabled={!combinedPromptText.trim()}>PUSH</button> {/* Disable if no prompt */}
                </div>
            </main>

            {/* Resizer 2 */}
            <div className="resizer" id="resizer-main-right" style={{ cursor: 'col-resize' }} onMouseDown={(e) => handleResizeMouseDown('main-right', e)} />

            {/* Right Sidebar */}
            <aside className="column sidebar right-sidebar" style={{ flexBasis: `${rightWidth}px`, flexGrow: 0, flexShrink: 0 }}>
                <h2>Generated Code</h2>
                <div className="sidebar-content-wrapper">
                     <div id="generated-code-wrapper">
                         {/* Use whiteSpace: pre-wrap to allow line breaks */}
                         <pre><code id="generated-code" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{generatedCode}</code></pre>
                     </div>
                </div>
            </aside>
        </div>
    );
}

// Make sure to export the component!
export default App;