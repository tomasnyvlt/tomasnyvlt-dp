import{M as d,C as p,b as x,A as h}from"./index-0ca75fd1.js";import{D as c,e as r}from"./Provider-fb93ee48.js";import{S as i}from"./StorybookProviderDecorator-0645d475.js";import{g as l}from"./getFieldWrapper-8454fe45.js";import{j as t}from"./jsx-runtime-1a9d9a93.js";import{u as m}from"./index-4811e648.js";import"./iframe-b81364bc.js";import"../sb-preview/runtime.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";import"./index-c59ef0a1.js";import"./index-8c3ac41d.js";import"./index-f4441307.js";import"./index-356e4a49.js";import"./index-8d47fad6.js";function a(o){const e=Object.assign({h1:"h1",h2:"h2"},m(),o.components);return t.jsxs(t.Fragment,{children:[t.jsx(d,{title:"Fields / CheckboxButtonField",component:r,decorators:[i],tags:["autodocs"],argTypes:{label:{control:"text"}}}),`
`,t.jsx(e.h1,{id:"checkboxbuttonfield",children:"CheckboxButtonField"}),`
`,t.jsx(p,{children:t.jsx(x,{name:"CheckboxButtonField",args:{label:"CheckboxButton Field"},children:b=>t.jsx(c,{schema:l({title:"CheckboxButtonField",sectionContent:[{component:"checkbox-button",name:"storybook.CheckboxButtonField",label:b.label}]})})})}),`
`,t.jsx(e.h2,{id:"component-props",children:"Component Props"}),`
`,t.jsx(h,{of:r})]})}function u(o={}){const{wrapper:e}=Object.assign({},m(),o.components);return e?t.jsx(e,{...o,children:t.jsx(a,{...o})}):a(o)}const s=o=>t.jsx(c,{schema:l({title:"CheckboxButtonField",sectionContent:[{component:"checkbox-button",name:"storybook.CheckboxButtonField",label:o.label}]})});s.storyName="CheckboxButtonField";s.args={label:"CheckboxButton Field"};s.parameters={storySource:{source:`args => <DataDrivenForm schema={getFieldWrapper({
  title: "CheckboxButtonField",
  sectionContent: [{
    component: "checkbox-button",
    name: "storybook.CheckboxButtonField",
    label: args.label
  }]
})} />`}};const n={title:"Fields / CheckboxButtonField",decorators:[i],component:r,argTypes:{label:{control:"text"}},tags:["stories-mdx"],includeStories:["checkboxButtonField"]};n.parameters=n.parameters||{};n.parameters.docs={...n.parameters.docs||{},page:u};const X=["checkboxButtonField"];export{X as __namedExportsOrder,s as checkboxButtonField,n as default};
