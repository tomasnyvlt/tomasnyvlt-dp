import{M as x,C as c,b as p,A as b}from"./index-30d71fcd.js";import{D as i,k as F}from"./Provider-91182804.js";import{S as n}from"./StorybookProviderDecorator-04a7f29a.js";import{g as d}from"./getFieldWrapper-4b80d26d.js";import{j as e}from"./jsx-runtime-1a9d9a93.js";import{u as m}from"./index-4811e648.js";import"./iframe-5fb6c84a.js";import"../sb-preview/runtime.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";import"./index-c59ef0a1.js";import"./index-8c3ac41d.js";import"./index-f4441307.js";import"./index-356e4a49.js";import"./index-8d47fad6.js";function r(t){const o=Object.assign({h1:"h1",h2:"h2"},m(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(x,{title:"Fields / TextField",component:i,decorators:[n],tags:["autodocs"],argTypes:{label:{control:"text"},isDisabled:{control:"boolean"},textarea:{control:"boolean"},hideField:{control:"boolean"}}}),`
`,e.jsx(o.h1,{id:"textfield",children:"TextField"}),`
`,e.jsx(c,{children:e.jsx(p,{name:"TextField",args:{label:"Text Field",isDisabled:!1,textarea:!1,hideField:!1},children:a=>e.jsx(i,{schema:d({title:"TextField",sectionContent:[{component:"text-field",name:"storybook.textfield",label:a.label,isDisabled:a.isDisabled,textarea:a.textarea,hideField:a.hideField}]})})})}),`
`,e.jsx(o.h2,{id:"component-props",children:"Component Props"}),`
`,e.jsx(b,{of:F})]})}function h(t={}){const{wrapper:o}=Object.assign({},m(),t.components);return o?e.jsx(o,{...t,children:e.jsx(r,{...t})}):r(t)}const s=t=>e.jsx(i,{schema:d({title:"TextField",sectionContent:[{component:"text-field",name:"storybook.textfield",label:t.label,isDisabled:t.isDisabled,textarea:t.textarea,hideField:t.hideField}]})});s.storyName="TextField";s.args={label:"Text Field",isDisabled:!1,textarea:!1,hideField:!1};s.parameters={storySource:{source:`args => <DataDrivenForm schema={getFieldWrapper({
  title: "TextField",
  sectionContent: [{
    component: "text-field",
    name: "storybook.textfield",
    label: args.label,
    isDisabled: args.isDisabled,
    textarea: args.textarea,
    hideField: args.hideField
  }]
})} />`}};const l={title:"Fields / TextField",decorators:[n],component:i,argTypes:{label:{control:"text"},isDisabled:{control:"boolean"},textarea:{control:"boolean"},hideField:{control:"boolean"}},tags:["stories-mdx"],includeStories:["textField"]};l.parameters=l.parameters||{};l.parameters.docs={...l.parameters.docs||{},page:h};const A=["textField"];export{A as __namedExportsOrder,l as default,s as textField};
