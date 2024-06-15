import{M as h,C as b,b as x,A as p}from"./index-0ca75fd1.js";import{D as t,f as C}from"./Provider-fb93ee48.js";import{S as c}from"./StorybookProviderDecorator-0645d475.js";import{g as s}from"./getFieldWrapper-8454fe45.js";import{j as l}from"./jsx-runtime-1a9d9a93.js";import{u as d}from"./index-4811e648.js";import"./iframe-b81364bc.js";import"../sb-preview/runtime.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";import"./index-c59ef0a1.js";import"./index-8c3ac41d.js";import"./index-f4441307.js";import"./index-356e4a49.js";import"./index-8d47fad6.js";function a(e){const n=Object.assign({h1:"h1",h2:"h2"},d(),e.components);return l.jsxs(l.Fragment,{children:[l.jsx(h,{title:"Fields / CheckboxField",component:t,decorators:[c],tags:["autodocs"],argTypes:{label:{control:"text"},isDisabled:{control:"boolean"},textarea:{control:"boolean"},checkboxColor:{control:{type:"select",options:["green","white"]}},checkboxBorderColor:{control:{type:"select",options:["green","white","indigo2"]}},description:{control:"text"},labelCss:{control:"object"},onClick:{control:"object"},checkboxAlignTop:{control:"boolean"},withArrowDownIcon:{control:"boolean"},hiddenLabel:{control:"text"},hideField:{control:"boolean"},hideInRadioBoxContainer:{control:"boolean"},helper:{control:"text"},helperCss:{control:"object"},variant:{control:{type:"select",options:["sm","md","cart"]}},initialValue:{control:"boolean"},defaultValue:{control:"text"}}}),`
`,l.jsx(n.h1,{id:"checkboxfield",children:"CheckboxField"}),`
`,l.jsx(b,{children:l.jsx(x,{name:"CheckboxField",args:{label:"Checkbox Field",isDisabled:!1,textarea:!1,checkboxColor:"green",checkboxBorderColor:"green",description:"",labelCss:{},onClick:()=>{},checkboxAlignTop:!1,withArrowDownIcon:!1,hiddenLabel:"",hideField:!1,hideInRadioBoxContainer:!1,helper:"",helperCss:{},variant:"md",initialValue:!1,defaultValue:""},children:o=>l.jsx(t,{schema:s({title:"CheckboxField",sectionContent:[{component:"checkbox-field",name:"storybook.CheckboxField",label:o.label,isDisabled:o.isDisabled,textarea:o.textarea,checkboxColor:o.checkboxColor,checkboxBorderColor:o.checkboxBorderColor,description:o.description,labelCss:o.labelCss,onClick:o.onClick,checkboxAlignTop:o.checkboxAlignTop,withArrowDownIcon:o.withArrowDownIcon,hiddenLabel:o.hiddenLabel,hideField:o.hideField,hideInRadioBoxContainer:o.hideInRadioBoxContainer,helper:o.helper,helperCss:o.helperCss,variant:o.variant,initialValue:o.initialValue,defaultValue:o.defaultValue}]})})})}),`
`,l.jsx(n.h2,{id:"component-props",children:"Component Props"}),`
`,l.jsx(p,{of:C})]})}function k(e={}){const{wrapper:n}=Object.assign({},d(),e.components);return n?l.jsx(n,{...e,children:l.jsx(a,{...e})}):a(e)}const r=e=>l.jsx(t,{schema:s({title:"CheckboxField",sectionContent:[{component:"checkbox-field",name:"storybook.CheckboxField",label:e.label,isDisabled:e.isDisabled,textarea:e.textarea,checkboxColor:e.checkboxColor,checkboxBorderColor:e.checkboxBorderColor,description:e.description,labelCss:e.labelCss,onClick:e.onClick,checkboxAlignTop:e.checkboxAlignTop,withArrowDownIcon:e.withArrowDownIcon,hiddenLabel:e.hiddenLabel,hideField:e.hideField,hideInRadioBoxContainer:e.hideInRadioBoxContainer,helper:e.helper,helperCss:e.helperCss,variant:e.variant,initialValue:e.initialValue,defaultValue:e.defaultValue}]})});r.storyName="CheckboxField";r.args={label:"Checkbox Field",isDisabled:!1,textarea:!1,checkboxColor:"green",checkboxBorderColor:"green",description:"",labelCss:{},onClick:()=>{},checkboxAlignTop:!1,withArrowDownIcon:!1,hiddenLabel:"",hideField:!1,hideInRadioBoxContainer:!1,helper:"",helperCss:{},variant:"md",initialValue:!1,defaultValue:""};r.parameters={storySource:{source:`args => <DataDrivenForm schema={getFieldWrapper({
  title: "CheckboxField",
  sectionContent: [{
    component: "checkbox-field",
    name: "storybook.CheckboxField",
    label: args.label,
    isDisabled: args.isDisabled,
    textarea: args.textarea,
    checkboxColor: args.checkboxColor,
    checkboxBorderColor: args.checkboxBorderColor,
    description: args.description,
    labelCss: args.labelCss,
    onClick: args.onClick,
    checkboxAlignTop: args.checkboxAlignTop,
    withArrowDownIcon: args.withArrowDownIcon,
    hiddenLabel: args.hiddenLabel,
    hideField: args.hideField,
    hideInRadioBoxContainer: args.hideInRadioBoxContainer,
    helper: args.helper,
    helperCss: args.helperCss,
    variant: args.variant,
    initialValue: args.initialValue,
    defaultValue: args.defaultValue
  }]
})} />`}};const i={title:"Fields / CheckboxField",decorators:[c],component:t,argTypes:{label:{control:"text"},isDisabled:{control:"boolean"},textarea:{control:"boolean"},checkboxColor:{control:{type:"select",options:["green","white"]}},checkboxBorderColor:{control:{type:"select",options:["green","white","indigo2"]}},description:{control:"text"},labelCss:{control:"object"},onClick:{control:"object"},checkboxAlignTop:{control:"boolean"},withArrowDownIcon:{control:"boolean"},hiddenLabel:{control:"text"},hideField:{control:"boolean"},hideInRadioBoxContainer:{control:"boolean"},helper:{control:"text"},helperCss:{control:"object"},variant:{control:{type:"select",options:["sm","md","cart"]}},initialValue:{control:"boolean"},defaultValue:{control:"text"}},tags:["stories-mdx"],includeStories:["checkboxField"]};i.parameters=i.parameters||{};i.parameters.docs={...i.parameters.docs||{},page:k};const L=["checkboxField"];export{L as __namedExportsOrder,r as checkboxField,i as default};
