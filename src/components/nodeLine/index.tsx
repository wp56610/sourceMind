import './index.sass'

interface NodeContainerProps {
  linePath: string 
}
function NodeLine(props: NodeContainerProps) {
  const { linePath } = props
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


  return <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="node-line">
    <path
    d={linePath} stroke='red' />
  </svg>
}

export default NodeLine;