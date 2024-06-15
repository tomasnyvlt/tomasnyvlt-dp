import{M as p,C as x,b as d,A as b}from"./index-0ca75fd1.js";import{D as e,B as l}from"./Provider-fb93ee48.js";import{S as m}from"./StorybookProviderDecorator-0645d475.js";import{g as a}from"./getFieldWrapper-8454fe45.js";import{j as o}from"./jsx-runtime-1a9d9a93.js";import{u as c}from"./index-4811e648.js";import"./iframe-b81364bc.js";import"../sb-preview/runtime.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";import"./index-c59ef0a1.js";import"./index-8c3ac41d.js";import"./index-f4441307.js";import"./index-356e4a49.js";import"./index-8d47fad6.js";function r(t){const n=Object.assign({h1:"h1",h2:"h2"},c(),t.components);return o.jsxs(o.Fragment,{children:[o.jsx(p,{title:"Contents / Box",component:e,decorators:[m],tags:["autodocs"]}),`
`,o.jsx(n.h1,{id:"box",children:"Box"}),`
`,o.jsx(x,{children:o.jsx(d,{name:"Box",children:()=>o.jsx(e,{schema:a({title:"Box",sectionContent:[{component:"section",name:"storybook.box",css:{mt:"3rem"},fields:[{component:"box",name:"Box",css:{w:"100px",h:"100px",bg:"red"}}]}]})})})}),`
`,o.jsx(n.h2,{id:"component-props",children:"Component Props"}),`
`,o.jsx(b,{of:l})]})}function h(t={}){const{wrapper:n}=Object.assign({},c(),t.components);return n?o.jsx(n,{...t,children:o.jsx(r,{...t})}):r(t)}const i=()=>o.jsx(e,{schema:a({title:"Box",sectionContent:[{component:"section",name:"storybook.box",css:{mt:"3rem"},fields:[{component:"box",name:"Box",css:{w:"100px",h:"100px",bg:"red"}}]}]})});i.storyName="Box";i.parameters={storySource:{source:`() => <DataDrivenForm schema={getFieldWrapper({
  title: "Box",
  sectionContent: [{
    component: "section",
    name: "storybook.box",
    css: {
      mt: "3rem"
    },
    fields: [{
      component: "box",
      name: "Box",
      css: {
        w: "100px",
        h: "100px",
        bg: "red"
      }
    }]
  }]
})} />`}};const s={title:"Contents / Box",decorators:[m],component:e,tags:["stories-mdx"],includeStories:["box"]};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:h};const O=["box"];export{O as __namedExportsOrder,i as box,s as default};
