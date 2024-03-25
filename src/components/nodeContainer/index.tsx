import { CSSProperties } from "react";
import "./index.sass";
import { TreeNode } from "../../type/const";

interface NodeContainerProps {
  node: TreeNode;
}
function NodeContainer(props: NodeContainerProps) {
  const { contentWidth, contentHeight, top, left, text, nodeId, summary } =
    props.node;
  // const ref = useRef<HTMLDivElement>(null)
  // useEffect(()=>{
  //   const resizeObserver = new ResizeObserver(() => {
  //     console.log(`🚀 ~ resizeObserver ~ sizeChange:` )
  //   });
  //   resizeObserver.observe(ref!.current as Element)
  //   return ()=>{
  //     resizeObserver.unobserve(ref!.current as Element)
  //   }
  // }, [])
  const style: CSSProperties = {
    position: "absolute",
    width: contentWidth,
    height: contentHeight,
    left: left,
    top: top,
  };

  return (
    <>
      <div className="node-container" id={nodeId} style={style}>
        {/* <div contentEditable={true}>textEditor</div> */}
        {text}
      </div>
      {summary.map((item) => {
        const { contentWidth, contentHeight, left, top, text } = item;
        const style: CSSProperties = {
          position: "absolute",
          width: contentWidth,
          height: contentHeight,
          left: left,
          top: top,
        };

        return (
          <div className="node-container-summary" id={nodeId} style={style}>
            {text}
          </div>
        );
      })}
    </>
  );
}

export default NodeContainer;
