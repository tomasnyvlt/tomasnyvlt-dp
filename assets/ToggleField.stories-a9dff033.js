import{M as p,C as c,b as d,A as u}from"./index-0ca75fd1.js";import{D as i,l as F}from"./Provider-fb93ee48.js";import{S as s}from"./StorybookProviderDecorator-0645d475.js";import{g}from"./getFieldWrapper-8454fe45.js";import{j as e}from"./jsx-runtime-1a9d9a93.js";import{u as m}from"./index-4811e648.js";import"./iframe-b81364bc.js";import"../sb-preview/runtime.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";import"./index-c59ef0a1.js";import"./index-8c3ac41d.js";import"./index-f4441307.js";import"./index-356e4a49.js";import"./index-8d47fad6.js";function r(o){const t=Object.assign({h1:"h1",h2:"h2"},m(),o.components);return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Fields / ToggleField",component:i,decorators:[s],tags:["autodocs"],argTypes:{label:{control:"text"},options:{control:""},initialValue:{control:"text"}}}),`
`,e.jsx(t.h1,{id:"togglefield",children:"ToggleField"}),`
`,e.jsx(c,{children:e.jsx(d,{name:"ToggleField",args:{label:"Toggle Field",options:[{value:1,label:"VIN"},{value:0,label:"Evid. číslo"}],initialValue:"1"},children:a=>e.jsx(i,{schema:g({title:"ToggleField",sectionContent:[{component:"toggle-field",name:"storybook.toggleField",options:a.options,initialValue:a.initialValue}]})})})}),`
`,e.jsx(t.h2,{id:"component-props",children:"Component Props"}),`
`,e.jsx(u,{of:F})]})}function x(o={}){const{wrapper:t}=Object.assign({},m(),o.components);return t?e.jsx(t,{...o,children:e.jsx(r,{...o})}):r(o)}const n=o=>e.jsx(i,{schema:g({title:"ToggleField",sectionContent:[{component:"toggle-field",name:"storybook.toggleField",options:o.options,initialValue:o.initialValue}]})});n.storyName="ToggleField";n.args={label:"Toggle Field",options:[{value:1,label:"VIN"},{value:0,label:"Evid. číslo"}],initialValue:"1"};n.parameters={storySource:{source:`args => <DataDrivenForm schema={getFieldWrapper({
  title: "ToggleField",
  sectionContent: [{
    component: "toggle-field",
    name: "storybook.toggleField",
    options: args.options,
    initialValue: args.initialValue
  }]
})} />`}};const l={title:"Fields / ToggleField",decorators:[s],component:i,argTypes:{label:{control:"text"},options:{control:""},initialValue:{control:"text"}},tags:["stories-mdx"],includeStories:["toggleField"]};l.parameters=l.parameters||{};l.parameters.docs={...l.parameters.docs||{},page:x};const N=["toggleField"];export{N as __namedExportsOrder,l as default,n as toggleField};
