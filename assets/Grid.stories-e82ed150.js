import{M as p,C as d,b as x,A as b}from"./index-30d71fcd.js";import{D as t,G as g}from"./Provider-91182804.js";import{S as m}from"./StorybookProviderDecorator-04a7f29a.js";import{g as i}from"./getFieldWrapper-4b80d26d.js";import{j as n}from"./jsx-runtime-1a9d9a93.js";import{u as c}from"./index-4811e648.js";import"./iframe-5fb6c84a.js";import"../sb-preview/runtime.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";import"./index-c59ef0a1.js";import"./index-8c3ac41d.js";import"./index-f4441307.js";import"./index-356e4a49.js";import"./index-8d47fad6.js";function s(o){const e=Object.assign({h1:"h1",h2:"h2"},c(),o.components);return n.jsxs(n.Fragment,{children:[n.jsx(p,{title:"Contents / Grid",component:t,decorators:[m],tags:["autodocs"]}),`
`,n.jsx(e.h1,{id:"grid",children:"Grid"}),`
`,n.jsx(d,{children:n.jsx(x,{name:"Grid",children:()=>n.jsx(t,{schema:i({title:"Grid",sectionContent:[{component:"section",name:"storybook.Grid",css:{mt:"3rem"},fields:[{component:"grid",name:"Grid",fields:[{component:"box",name:"Box1",css:{w:"100%",h:"100px",bg:"red"}},{component:"box",name:"Box2",css:{w:"100%",h:"100px",bg:"red"}},{component:"box",name:"Box3",css:{w:"100%",h:"100px",bg:"blue",gridColumn:{sm:"1 / -1"}}}]}]}]})})})}),`
`,n.jsx(e.h2,{id:"component-props",children:"Component Props"}),`
`,n.jsx(b,{of:g})]})}function l(o={}){const{wrapper:e}=Object.assign({},c(),o.components);return e?n.jsx(e,{...o,children:n.jsx(s,{...o})}):s(o)}const a=()=>n.jsx(t,{schema:i({title:"Grid",sectionContent:[{component:"section",name:"storybook.Grid",css:{mt:"3rem"},fields:[{component:"grid",name:"Grid",fields:[{component:"box",name:"Box1",css:{w:"100%",h:"100px",bg:"red"}},{component:"box",name:"Box2",css:{w:"100%",h:"100px",bg:"red"}},{component:"box",name:"Box3",css:{w:"100%",h:"100px",bg:"blue",gridColumn:{sm:"1 / -1"}}}]}]}]})});a.storyName="Grid";a.parameters={storySource:{source:`() => <DataDrivenForm schema={getFieldWrapper({
  title: "Grid",
  sectionContent: [{
    component: "section",
    name: "storybook.Grid",
    css: {
      mt: "3rem"
    },
    fields: [{
      component: "grid",
      name: "Grid",
      fields: [{
        component: "box",
        name: "Box1",
        css: {
          w: "100%",
          h: "100px",
          bg: "red"
        }
      }, {
        component: "box",
        name: "Box2",
        css: {
          w: "100%",
          h: "100px",
          bg: "red"
        }
      }, {
        component: "box",
        name: "Box3",
        css: {
          w: "100%",
          h: "100px",
          bg: "blue",
          gridColumn: {
            sm: "1 / -1"
          }
        }
      }]
    }]
  }]
})} />`}};const r={title:"Contents / Grid",decorators:[m],component:t,tags:["stories-mdx"],includeStories:["grid"]};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:l};const _=["grid"];export{_ as __namedExportsOrder,r as default,a as grid};
