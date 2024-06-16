import{M as c,C as p,b as u,A as b}from"./index-30d71fcd.js";import{D as n,d as F}from"./Provider-91182804.js";import{S as l}from"./StorybookProviderDecorator-04a7f29a.js";import{g as d}from"./getFieldWrapper-4b80d26d.js";import{j as t}from"./jsx-runtime-1a9d9a93.js";import{u as m}from"./index-4811e648.js";import"./iframe-5fb6c84a.js";import"../sb-preview/runtime.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";import"./index-c59ef0a1.js";import"./index-8c3ac41d.js";import"./index-f4441307.js";import"./index-356e4a49.js";import"./index-8d47fad6.js";function s(e){const o=Object.assign({h1:"h1",h2:"h2"},m(),e.components);return t.jsxs(t.Fragment,{children:[t.jsx(c,{title:"Fields / ButtonField",component:n,decorators:[l],tags:["autodocs"],argTypes:{label:{control:"text"},variant:{control:{type:"select",options:["solid","outline","clear","gradient"]}}}}),`
`,t.jsx(o.h1,{id:"buttonfield",children:"ButtonField"}),`
`,t.jsx(p,{children:t.jsx(u,{name:"ButtonField",args:{label:"Button Field",variant:"gradient"},children:i=>t.jsx(n,{schema:d({title:"ButtonField",sectionContent:[{component:"button-field",name:"storybook.ButtonField",label:i.label,variant:i.variant}]})})})}),`
`,t.jsx(o.h2,{id:"component-props",children:"Component Props"}),`
`,t.jsx(b,{of:F})]})}function g(e={}){const{wrapper:o}=Object.assign({},m(),e.components);return o?t.jsx(o,{...e,children:t.jsx(s,{...e})}):s(e)}const a=e=>t.jsx(n,{schema:d({title:"ButtonField",sectionContent:[{component:"button-field",name:"storybook.ButtonField",label:e.label,variant:e.variant}]})});a.storyName="ButtonField";a.args={label:"Button Field",variant:"gradient"};a.parameters={storySource:{source:`args => <DataDrivenForm schema={getFieldWrapper({
  title: "ButtonField",
  sectionContent: [{
    component: "button-field",
    name: "storybook.ButtonField",
    label: args.label,
    variant: args.variant
  }]
})} />`}};const r={title:"Fields / ButtonField",decorators:[l],component:n,argTypes:{label:{control:"text"},variant:{control:{type:"select",options:["solid","outline","clear","gradient"]}}},tags:["stories-mdx"],includeStories:["buttonField"]};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:g};const X=["buttonField"];export{X as __namedExportsOrder,a as buttonField,r as default};
