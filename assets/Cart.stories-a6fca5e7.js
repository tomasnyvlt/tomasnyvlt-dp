import{M as y,C as u,b as g,A as f}from"./index-ea69ee8d.js";import{n as b,P as h,v as x,o as j,V as D,p as S,q as k}from"./Provider-1d5cef62.js";import{f as l,D as _,G as v,F,a as E,b as O,c as C,S as m}from"./StorybookProviderDecorator-3a27c430.js";import{j as n}from"./jsx-runtime-1a9d9a93.js";import{u as d}from"./index-4811e648.js";import"./iframe-9e1c0901.js";import"../sb-preview/runtime.js";import"./index-8b3efc3f.js";import"./_commonjsHelpers-de833af9.js";import"./index-c59ef0a1.js";import"./index-8c3ac41d.js";import"./index-f4441307.js";import"./index-356e4a49.js";import"./index-8d47fad6.js";const M=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"})),R={address:"Začněte psát adresu a my jí zkusíme dohledat",phone:"Telefonní číslo s předvolbou +420 nebo +421"},T=Object.freeze(Object.defineProperty({__proto__:null,HELPER:R},Symbol.toStringTag,{value:"Module"})),z=e=>{const t=l.get(e);if(!t)throw new Error(`Form instance for form type "${e}" not found.`);const{fetcherData:c,isFetchLoading:r,isFetchLoadingDebounce:p}=t.getState()||{};return{data:c,isFetchLoading:r,isFetchLoadingDebounce:p}},q=Object.freeze(Object.defineProperty({__proto__:null,getFetcherDataExtended:z},Symbol.toStringTag,{value:"Module"})),A=e=>{const t=l.get(e);if(!t)throw new Error(`Form instance for form type "${e}" not found.`);return t.getState().fetcherReqBody},P=Object.freeze(Object.defineProperty({__proto__:null,getFetcherReqBody:A},Symbol.toStringTag,{value:"Module"})),B=Object.freeze(Object.defineProperty({__proto__:null,DirectButton:_},Symbol.toStringTag,{value:"Module"})),a={DataDrivenForm:b,Provider:h,GlobalStyles:v,types:M,FormStoreContext:F,formStoreInstance:E,fields:O,helper:T,validation:x,getFetcherData:C,getFetcherDataExtended:q,getFetcherReqBody:P,getFormattedPrice:j,ValidationInfoConstants:D,getCartDataFromFetcher:S,components:B};function i(e){const t=Object.assign({h2:"h2"},d(),e.components);return n.jsxs(n.Fragment,{children:[n.jsx(y,{title:"Contents / Cart",component:a,decorators:[m],tags:["autodocs"],argTypes:{label:{control:"text"}}}),`
`,n.jsx(u,{children:n.jsx(g,{name:"Cart",args:{label:"Obchodní sleva na povinné ručení"},children:c=>{const r={fields:[{component:"wizard",name:"customWizard",formType:"autosjednavac",cart:{activeOnSteps:[0],name:"a",cartFields:[{component:"checkbox-field",name:"storybook.cark",label:JSON.stringify({blocks:[{key:"bqubj",text:"Garance ceny pojištění na 3 roky",type:"unstyled",depth:0,inlineStyleRanges:[],entityRanges:[],data:{}}],entityMap:{}}),variant:"cart",priceFetcherDataAttr:"additionals.premiumWarranty.price",initialValue:!1,helper:'{"blocks":[{"key":"bqubj","text":"Co myslíme garancí ceny?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":24,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"#modal=garance-ceny","targetOption":"_self"}}}}',helperCss:{color:"grayscale.gray1",border:0,textDecoration:"underline",fontWeight:"400"}}]},fields:[{component:"step",name:"step-1",title:"Košík",fields:[{component:"section",name:"ASD",css:{mt:"3rem",h:"20rem"},fields:[]}]}]}]};return n.jsx(a,{schema:r})}})}),`
`,n.jsx(t.h2,{id:"component-props",children:"Component Props"}),`
`,n.jsx(f,{of:k})]})}function L(e={}){const{wrapper:t}=Object.assign({},d(),e.components);return t?n.jsx(t,{...e,children:n.jsx(i,{...e})}):i(e)}const s=e=>{const t={fields:[{component:"wizard",name:"customWizard",formType:"autosjednavac",cart:{activeOnSteps:[0],name:"a",cartFields:[{component:"checkbox-field",name:"storybook.cark",label:JSON.stringify({blocks:[{key:"bqubj",text:"Garance ceny pojištění na 3 roky",type:"unstyled",depth:0,inlineStyleRanges:[],entityRanges:[],data:{}}],entityMap:{}}),variant:"cart",priceFetcherDataAttr:"additionals.premiumWarranty.price",initialValue:!1,helper:'{"blocks":[{"key":"bqubj","text":"Co myslíme garancí ceny?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":24,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"#modal=garance-ceny","targetOption":"_self"}}}}',helperCss:{color:"grayscale.gray1",border:0,textDecoration:"underline",fontWeight:"400"}}]},fields:[{component:"step",name:"step-1",title:"Košík",fields:[{component:"section",name:"ASD",css:{mt:"3rem",h:"20rem"},fields:[]}]}]}]};return n.jsx(a,{schema:t})};s.storyName="Cart";s.args={label:"Obchodní sleva na povinné ručení"};s.parameters={storySource:{source:`args => {
  const schema = {
    fields: [{
      component: "wizard",
      name: "customWizard",
      formType: "autosjednavac",
      cart: {
        activeOnSteps: [0],
        name: "a",
        cartFields: [{
          component: "checkbox-field",
          name: "storybook.cark",
          label: JSON.stringify({
            blocks: [{
              key: "bqubj",
              text: "Garance ceny poji\\u0161t\\u011Bn\\xED na 3 roky",
              type: "unstyled",
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {}
            }],
            entityMap: {}
          }),
          variant: "cart",
          priceFetcherDataAttr: "additionals.premiumWarranty.price",
          initialValue: false,
          helper: "{\\"blocks\\":[{\\"key\\":\\"bqubj\\",\\"text\\":\\"Co mysl\\xEDme garanc\\xED ceny?\\",\\"type\\":\\"unstyled\\",\\"depth\\":0,\\"inlineStyleRanges\\":[],\\"entityRanges\\":[{\\"offset\\":0,\\"length\\":24,\\"key\\":0}],\\"data\\":{}}],\\"entityMap\\":{\\"0\\":{\\"type\\":\\"LINK\\",\\"mutability\\":\\"MUTABLE\\",\\"data\\":{\\"url\\":\\"#modal=garance-ceny\\",\\"targetOption\\":\\"_self\\"}}}}",
          helperCss: {
            color: "grayscale.gray1",
            border: 0,
            textDecoration: "underline",
            fontWeight: "400"
          }
        }]
      },
      fields: [{
        component: "step",
        name: "step-1",
        title: "Ko\\u0161\\xEDk",
        fields: [{
          component: "section",
          name: "ASD",
          css: {
            mt: "3rem",
            h: "20rem"
          },
          fields: []
        }]
      }]
    }]
  };
  return <DataDrivenForm schema={schema} />;
}`}};const o={title:"Contents / Cart",decorators:[m],component:a,argTypes:{label:{control:"text"}},tags:["stories-mdx"],includeStories:["cart"]};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:L};const Y=["cart"];export{Y as __namedExportsOrder,s as cart,o as default};
