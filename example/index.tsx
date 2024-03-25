import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import MindMap from '../src/main'
import {nodeCreator, relationCreator} from '../src/tools/nodeCreator'
const root = nodeCreator({text: '根节点', isRoot: true})
const children1 = [
  nodeCreator({text: '分支主题', }),
  nodeCreator({text: '分支主题', }),
  nodeCreator({text: '分支主题', }),
  nodeCreator({text: '分支主题', }),
]
root.children.push(...children1)
const relationInfo = relationCreator({text: 'summary', ids:[children1[1].nodeId], contentWidth: 200})
root.summary = [relationInfo]
root.children[2].children.push(
  nodeCreator({text: 'test',  }),
  nodeCreator({text: 'test',  }),
)

root.children[2].children[1].children.push(
  nodeCreator({text: 'test',  }),
  nodeCreator({text: 'test',  }),
)


function Map(){
  const ref =  useRef()
  useEffect(()=>{
    console.log(`🚀 ~ Map ~ ref:`, ref)
  }, [])
  return <MindMap root={root} ref={ref}></MindMap>
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Map></Map>
  </React.StrictMode>,
)
