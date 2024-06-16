import{M as b,C as u,b as c,A as p}from"./index-6402fa06.js";import{D as t,N as x}from"./Provider-1bf3d21c.js";import{S as d}from"./StorybookProviderDecorator-36d121cb.js";import{g as s}from"./getFieldWrapper-6d01b857.js";import{j as i}from"./jsx-runtime-1a9d9a93.js";import{u as m}from"./index-4811e648.js";import"./iframe-b49e8494.js";import"../sb-preview/runtime.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";import"./index-c59ef0a1.js";import"./index-8c3ac41d.js";import"./index-f4441307.js";import"./index-356e4a49.js";import"./index-8d47fad6.js";function r(e){const n=Object.assign({h1:"h1",h2:"h2"},m(),e.components);return i.jsxs(i.Fragment,{children:[i.jsx(b,{title:"Fields / NumberField",component:t,decorators:[d],tags:["autodocs"],argTypes:{labelText:{control:"text"},isDisabled:{control:"boolean"},textarea:{control:"boolean"},hideField:{control:"boolean"},initialValue:{control:"number"},disabledAdding:{control:"boolean"},disabledSubtracting:{control:"boolean"},changeBy:{control:"number"},isMonetaryValue:{control:"boolean"},minimumValue:{control:"number"}}}),`
`,i.jsx(n.h1,{id:"numberfield",children:"NumberField"}),`
`,i.jsx(u,{children:i.jsx(c,{name:"NumberField",args:{labelText:"Number Field",isDisabled:!1,textarea:!1,hideField:!1,initialValue:1,disabledAdding:!1,disabledSubtracting:!1,changeBy:1,isMonetaryValue:!1,minimumValue:0},children:a=>i.jsx(t,{schema:s({title:"NumberField",sectionContent:[{component:"number-field",name:"storybook.numberField",labelText:a.labelText,isDisabled:a.isDisabled,textarea:a.textarea,hideField:a.hideField,initialValue:a.initialValue,disabledAdding:a.disabledAdding,disabledSubtracting:a.disabledSubtracting,changeBy:a.changeBy,isMonetaryValue:a.isMonetaryValue,minimumValue:a.minimumValue}]})})})}),`
`,i.jsx(n.h2,{id:"component-props",children:"Component Props"}),`
`,i.jsx(p,{of:x})]})}function g(e={}){const{wrapper:n}=Object.assign({},m(),e.components);return n?i.jsx(n,{...e,children:i.jsx(r,{...e})}):r(e)}const o=e=>i.jsx(t,{schema:s({title:"NumberField",sectionContent:[{component:"number-field",name:"storybook.numberField",labelText:e.labelText,isDisabled:e.isDisabled,textarea:e.textarea,hideField:e.hideField,initialValue:e.initialValue,disabledAdding:e.disabledAdding,disabledSubtracting:e.disabledSubtracting,changeBy:e.changeBy,isMonetaryValue:e.isMonetaryValue,minimumValue:e.minimumValue}]})});o.storyName="NumberField";o.args={labelText:"Number Field",isDisabled:!1,textarea:!1,hideField:!1,initialValue:1,disabledAdding:!1,disabledSubtracting:!1,changeBy:1,isMonetaryValue:!1,minimumValue:0};o.parameters={storySource:{source:`args => <DataDrivenForm schema={getFieldWrapper({
  title: "NumberField",
  sectionContent: [{
    component: "number-field",
    name: "storybook.numberField",
    labelText: args.labelText,
    isDisabled: args.isDisabled,
    textarea: args.textarea,
    hideField: args.hideField,
    initialValue: args.initialValue,
    disabledAdding: args.disabledAdding,
    disabledSubtracting: args.disabledSubtracting,
    changeBy: args.changeBy,
    isMonetaryValue: args.isMonetaryValue,
    minimumValue: args.minimumValue
  }]
})} />`}};const l={title:"Fields / NumberField",decorators:[d],component:t,argTypes:{labelText:{control:"text"},isDisabled:{control:"boolean"},textarea:{control:"boolean"},hideField:{control:"boolean"},initialValue:{control:"number"},disabledAdding:{control:"boolean"},disabledSubtracting:{control:"boolean"},changeBy:{control:"number"},isMonetaryValue:{control:"boolean"},minimumValue:{control:"number"}},tags:["stories-mdx"],includeStories:["numberField"]};l.parameters=l.parameters||{};l.parameters.docs={...l.parameters.docs||{},page:g};const v=["numberField"];export{v as __namedExportsOrder,l as default,o as numberField};
