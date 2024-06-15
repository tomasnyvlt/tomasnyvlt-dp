import{M as p,C as m,b,A as F}from"./index-ea69ee8d.js";import{D as s,i as x}from"./Provider-1d5cef62.js";import{S as r}from"./StorybookProviderDecorator-3a27c430.js";import{g as c}from"./getFieldWrapper-afc70f33.js";import{j as e}from"./jsx-runtime-1a9d9a93.js";import{u as d}from"./index-4811e648.js";import"./iframe-9e1c0901.js";import"../sb-preview/runtime.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";import"./index-c59ef0a1.js";import"./index-8c3ac41d.js";import"./index-f4441307.js";import"./index-356e4a49.js";import"./index-8d47fad6.js";function a(t){const o=Object.assign({h1:"h1",h2:"h2"},d(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Fields / SelectField",component:s,decorators:[r],tags:["autodocs"],argTypes:{label:{control:"text"},options:{control:"object"},isDisabled:{control:"boolean"}}}),`
`,e.jsx(o.h1,{id:"selectfield",children:"SelectField"}),`
`,e.jsx(m,{children:e.jsx(b,{name:"SelectField",args:{label:"Select Field",options:[{label:"Option 1",value:"1"},{label:"Option 2",value:"2"}],isDisabled:!1},children:i=>e.jsx(s,{schema:c({title:"SelectField",sectionContent:[{component:"select-field",name:"storybook.selectField",label:i.label,options:i.options,isDisabled:i.isDisabled}]})})})}),`
`,e.jsx(o.h2,{id:"component-props",children:"Component Props"}),`
`,e.jsx(F,{of:x})]})}function D(t={}){const{wrapper:o}=Object.assign({},d(),t.components);return o?e.jsx(o,{...t,children:e.jsx(a,{...t})}):a(t)}const n=t=>e.jsx(s,{schema:c({title:"SelectField",sectionContent:[{component:"select-field",name:"storybook.selectField",label:t.label,options:t.options,isDisabled:t.isDisabled}]})});n.storyName="SelectField";n.args={label:"Select Field",options:[{label:"Option 1",value:"1"},{label:"Option 2",value:"2"}],isDisabled:!1};n.parameters={storySource:{source:`args => <DataDrivenForm schema={getFieldWrapper({
  title: "SelectField",
  sectionContent: [{
    component: "select-field",
    name: "storybook.selectField",
    label: args.label,
    options: args.options,
    isDisabled: args.isDisabled
  }]
})} />`}};const l={title:"Fields / SelectField",decorators:[r],component:s,argTypes:{label:{control:"text"},options:{control:"object"},isDisabled:{control:"boolean"}},tags:["stories-mdx"],includeStories:["selectField"]};l.parameters=l.parameters||{};l.parameters.docs={...l.parameters.docs||{},page:D};const A=["selectField"];export{A as __namedExportsOrder,l as default,n as selectField};
