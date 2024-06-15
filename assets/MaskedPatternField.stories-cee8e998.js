import{M as p,C as c,b,A as k}from"./index-0ca75fd1.js";import{D as n,g as F}from"./Provider-fb93ee48.js";import{S as l}from"./StorybookProviderDecorator-0645d475.js";import{g as d}from"./getFieldWrapper-8454fe45.js";import{j as e}from"./jsx-runtime-1a9d9a93.js";import{u as m}from"./index-4811e648.js";import"./iframe-b81364bc.js";import"../sb-preview/runtime.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";import"./index-c59ef0a1.js";import"./index-8c3ac41d.js";import"./index-f4441307.js";import"./index-356e4a49.js";import"./index-8d47fad6.js";function i(t){const a=Object.assign({h1:"h1",h2:"h2"},m(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Fields / MaskedPatternField",component:n,decorators:[l],tags:["autodocs"],argTypes:{label:{control:"text"},pattern:{control:"text"},isDisabled:{control:"boolean"}}}),`
`,e.jsx(a.h1,{id:"maskedpatternfield",children:"MaskedPatternField"}),`
`,e.jsx(c,{children:e.jsx(b,{name:"MaskedPatternField",args:{label:"Masked Pattern Field",pattern:"\\d*",isDisabled:!1},children:s=>e.jsx(n,{schema:d({title:"MaskedPatternField",sectionContent:[{component:"masked-pattern-field",name:"storybook.maskedPatternField",label:s.label,pattern:s.pattern,isDisabled:s.isDisabled}]})})})}),`
`,e.jsx(a.h2,{id:"component-props",children:"Component Props"}),`
`,e.jsx(k,{of:F})]})}function x(t={}){const{wrapper:a}=Object.assign({},m(),t.components);return a?e.jsx(a,{...t,children:e.jsx(i,{...t})}):i(t)}const o=t=>e.jsx(n,{schema:d({title:"MaskedPatternField",sectionContent:[{component:"masked-pattern-field",name:"storybook.maskedPatternField",label:t.label,pattern:t.pattern,isDisabled:t.isDisabled}]})});o.storyName="MaskedPatternField";o.args={label:"Masked Pattern Field",pattern:"\\d*",isDisabled:!1};o.parameters={storySource:{source:`args => <DataDrivenForm schema={getFieldWrapper({
  title: "MaskedPatternField",
  sectionContent: [{
    component: "masked-pattern-field",
    name: "storybook.maskedPatternField",
    label: args.label,
    pattern: args.pattern,
    isDisabled: args.isDisabled
  }]
})} />`}};const r={title:"Fields / MaskedPatternField",decorators:[l],component:n,argTypes:{label:{control:"text"},pattern:{control:"text"},isDisabled:{control:"boolean"}},tags:["stories-mdx"],includeStories:["maskedPatternField"]};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:x};const X=["maskedPatternField"];export{X as __namedExportsOrder,r as default,o as maskedPatternField};
