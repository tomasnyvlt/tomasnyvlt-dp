import{M as b,C as c,b as p,A as k}from"./index-0ca75fd1.js";import{D as t,M as u}from"./Provider-fb93ee48.js";import{S as d}from"./StorybookProviderDecorator-0645d475.js";import{g as l}from"./getFieldWrapper-8454fe45.js";import{j as e}from"./jsx-runtime-1a9d9a93.js";import{u as m}from"./index-4811e648.js";import"./iframe-b81364bc.js";import"../sb-preview/runtime.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";import"./index-c59ef0a1.js";import"./index-8c3ac41d.js";import"./index-f4441307.js";import"./index-356e4a49.js";import"./index-8d47fad6.js";function n(s){const o=Object.assign({h1:"h1",h2:"h2"},m(),s.components);return e.jsxs(e.Fragment,{children:[e.jsx(b,{title:"Fields / MaskedNumberField",component:t,decorators:[d],tags:["autodocs"],argTypes:{label:{control:"text"},mask:{control:"text"},isDisabled:{control:"boolean"},hideField:{control:"boolean"}}}),`
`,e.jsx(o.h1,{id:"maskednumberfield",children:"MaskedNumberField"}),`
`,e.jsx(c,{children:e.jsx(p,{name:"MaskedNumberField",args:{label:"Masked Number Field",mask:"9999",isDisabled:!1,hideField:!1},children:a=>e.jsx(t,{schema:l({title:"MaskedNumberField",sectionContent:[{component:"masked-number-field",name:"storybook.maskedNumberField",label:a.label,mask:a.mask,isDisabled:a.isDisabled,hideField:a.hideField}]})})})}),`
`,e.jsx(o.h2,{id:"component-props",children:"Component Props"}),`
`,e.jsx(k,{of:u})]})}function F(s={}){const{wrapper:o}=Object.assign({},m(),s.components);return o?e.jsx(o,{...s,children:e.jsx(n,{...s})}):n(s)}const i=s=>e.jsx(t,{schema:l({title:"MaskedNumberField",sectionContent:[{component:"masked-number-field",name:"storybook.maskedNumberField",label:s.label,mask:s.mask,isDisabled:s.isDisabled,hideField:s.hideField}]})});i.storyName="MaskedNumberField";i.args={label:"Masked Number Field",mask:"9999",isDisabled:!1,hideField:!1};i.parameters={storySource:{source:`args => <DataDrivenForm schema={getFieldWrapper({
  title: "MaskedNumberField",
  sectionContent: [{
    component: "masked-number-field",
    name: "storybook.maskedNumberField",
    label: args.label,
    mask: args.mask,
    isDisabled: args.isDisabled,
    hideField: args.hideField
  }]
})} />`}};const r={title:"Fields / MaskedNumberField",decorators:[d],component:t,argTypes:{label:{control:"text"},mask:{control:"text"},isDisabled:{control:"boolean"},hideField:{control:"boolean"}},tags:["stories-mdx"],includeStories:["maskedNumberField"]};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:F};const X=["maskedNumberField"];export{X as __namedExportsOrder,r as default,i as maskedNumberField};
